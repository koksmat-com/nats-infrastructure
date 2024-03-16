// -------------------------------------------------------------------
// Generated by 365admin-publish/api/20 makeschema.ps1
// -------------------------------------------------------------------
/*
---
title: Ping
---
*/
package endpoints

import (
	"context"

	"github.com/swaggest/usecase"

	"github.com/365admin/nats-infrastructure/execution"
)

func HealthPingPost() usecase.Interactor {
	type Request struct {
		Pong string `query:"pong" binding:"required"`
	}
	u := usecase.NewInteractor(func(ctx context.Context, input Request, output *string) error {

		_, err := execution.ExecutePowerShell("john", "*", "nats-infrastructure", "00-health", "10-ping.ps1", "", "-pong", input.Pong)
		if err != nil {
			return err
		}

		return err

	})
	u.SetTitle("Ping")
	// u.SetExpectedErrors(status.InvalidArgument)
	u.SetTags("Health")
	return u
}
