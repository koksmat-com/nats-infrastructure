package magicapp

import (
	"context"
	"fmt"
	"log"
	"runtime/debug"
	"strings"
	"time"

	"net/http"

	"github.com/nats-io/nats.go"
	"github.com/nats-io/nats.go/jetstream"
	"github.com/spf13/viper"
	swgui "github.com/swaggest/swgui/v4emb"

	chi "github.com/go-chi/chi/v5"
	"github.com/swaggest/rest/nethttp"
	"github.com/swaggest/rest/web"
	"github.com/swaggest/usecase"
)

var msgsMeta []*jetstream.MsgMetadata

func Subscribe() usecase.Interactor {
	type Request struct {
		Pong string `query:"pong" binding:"required"`
	}
	u := usecase.NewInteractor(func(ctx context.Context, input Request, output *string) error {

		number := fmt.Sprintf("%d", len(msgsMeta))
		output = &number
		return nil

	})
	u.SetTitle("Ping")
	// u.SetExpectedErrors(status.InvalidArgument)
	u.SetTags("Health")
	return u
}

func AddEndpoints(s *web.Service, jwtAuth func(http.Handler) http.Handler) {
	s.Route("/v1", func(r chi.Router) {
		r.Group(func(r chi.Router) {
			//r.Use(adminAuth, nethttp.HTTPBasicSecurityMiddleware(s.OpenAPICollector, "User", "User access"))
			r.Use(jwtAuth, nethttp.HTTPBearerSecurityMiddleware(s.OpenAPICollector, "Bearer", "", ""))
			//	r.Use(rateLimitByAppId(50))
			//r.Method(http.MethodPost, "/", nethttp.NewHandler(ExchangeCreateRoomsPost()))
			r.Method(http.MethodPost, "/snif/subscribe", nethttp.NewHandler(Subscribe()))

		})
	})

}
func StartSnifferAPIServer(title string, version string, description string, port int) {
	info, _ := debug.ReadBuildInfo()

	// split info.Main.Path by / and get the last element
	s1 := strings.Split(info.Main.Path, "/")
	name := s1[len(s1)-1]
	root := fmt.Sprintf("/v1/%s", name)
	docs := fmt.Sprintf("%s/docs", root)
	s := web.DefaultService()

	// Init API documentation schema.
	s.OpenAPI.Info.Title = title
	s.OpenAPI.Info.WithDescription(description)
	s.OpenAPI.Info.Version = version

	// sharedSettings(s)
	AddEndpoints(s, Authenticator)
	// addAdminEndpoints(s, Authenticator)
	// addExchangeEndpoints(s, Authenticator)
	// addCoreEndpoints(s, Authenticator)
	s.Docs(docs, swgui.New)
	log.Printf("Server started, read documentation at http://localhost:%d%s", port, docs)
	if err := http.ListenAndServe(fmt.Sprintf(":%d", port), s); err != nil {
		log.Fatal(err)
	}
}
func StartSnifferService() {
	// Parent context cancels connecting/reconnecting altogether.
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	var err error
	var nc *nats.Conn
	opts := []nats.Option{

		nats.ReconnectWait(2 * time.Second),
		nats.ReconnectHandler(func(c *nats.Conn) {
			log.Println("Reconnected to", c.ConnectedUrl())
		}),
		nats.DisconnectHandler(func(c *nats.Conn) {
			log.Println("Disconnected from NATS")
		}),
		nats.ClosedHandler(func(c *nats.Conn) {
			log.Println("NATS connection is closed.")
		}),
	}

	go func() {
		natsServer := viper.GetString("NATS")
		if natsServer == "" {
			natsServer = "nats://127.0.0.1:4222"
		}
		log.Println("Connecting to", natsServer)
		nc, err = nats.Connect(natsServer, opts...)
	}()
	retryCount := 0
WaitForEstablishedConnection:
	for {
		if err != nil {
			log.Fatal(err)
		}
		ctx, cancel := context.WithCancel(context.Background())
		defer cancel()
		// Wait for context to be canceled either by timeout
		// or because of establishing a connection...
		select {
		case <-ctx.Done():
			break WaitForEstablishedConnection
		default:
		}

		if nc == nil || !nc.IsConnected() {
			if retryCount != 0 {
				log.Println("Connection not ready")
			}
			retryCount++
			time.Sleep(200 * time.Millisecond)
			continue
		}
		break WaitForEstablishedConnection
	}
	if ctx.Err() != nil {
		log.Fatal(ctx.Err())
	}
	log.Println("Connected")
	js, _ := jetstream.New(nc)
	cfg := jetstream.StreamConfig{
		Name:      "EVENTS",
		Retention: jetstream.InterestPolicy,
		Subjects:  []string{"events.>"},
	}
	ctx2, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	stream, _ := js.CreateStream(ctx2, cfg)
	log.Println("created the stream")
	cons, _ := stream.CreateOrUpdateConsumer(ctx, jetstream.ConsumerConfig{
		Durable:   "processor-1",
		AckPolicy: jetstream.AckExplicitPolicy,
	})
	for {
		if nc.IsClosed() {
			break
		}
		msgs, _ := cons.Fetch(2)

		for msg := range msgs.Messages() {
			log.Println("Received message", string(msg.Data()))
			msg.DoubleAck(ctx)
			meta, _ := msg.Metadata()
			msgsMeta = append(msgsMeta, meta)
		}
		//time.Sleep(1 * time.Second)
	}

	// Disconnect and flush pending messages
	if err := nc.Drain(); err != nil {
		log.Println(err)
	}
	log.Println("Disconnected")

}

func WhatsCooking() string {
	go StartSnifferAPIServer("Sniffer", "0.0.1", "Describe the main purpose of this kitchen", 8334)
	StartSnifferService()
	return "Pancakes"
}
