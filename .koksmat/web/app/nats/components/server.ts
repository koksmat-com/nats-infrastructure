"use server";

export async function logEntry(id: string) {
  return `Hello ${id}!`;
}

import { connect, NatsConnection, StringCodec } from "nats.ws";

import { Subscription } from "nats";

export async function NatsReceiver(subject: string, servers: string) {
  let nc: NatsConnection;

  let sub: Subscription;
  const subscribe = async () => {
    if (!nc) return;
    if (!subject) return;
    const sub = nc.subscribe(subject);

    sub.callback = (err, msg) => {
      if (err) {
        console.error(err);
        return;
      }
      const sc = StringCodec();
      const data = sc.decode(msg.data);
      console.log(data);
    };
  };

  const setup = async () => {
    const sc = StringCodec();
    nc = await connect({
      servers, //: "wss://0.0.0.0:433",
    });

    console.log("connected");
  };
  connect();

  await setup();
  await subscribe();

  while (true) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("tick");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("tock");
  }
}

NatsReceiver("echo", process.env.NATS ?? "nats://0.0.0.0:4222");
