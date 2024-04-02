"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { connect, NatsConnection, StringCodec } from "nats.ws";
import { sub } from "date-fns";
import { Subscription } from "nats";

export default function ShowNatsLog(props: { subject: string }) {
  const { subject } = props;
  const [logEntries2, setlogEntries2] = useState<string[]>([]);
  const [nc, setnc] = useState<NatsConnection>();

  useEffect(() => {
    let sub: Subscription;
    const load = async () => {
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
        setlogEntries2([...logEntries2, data]);
      };
    };

    load();

    return () => {
      if (sub) sub.unsubscribe();
    };
  }, [nc, subject]);

  useEffect(() => {
    let nc: NatsConnection;
    const load = async () => {
      const sc = StringCodec();
      nc = await connect({
        servers: "wss://0.0.0.0:433",
      });
      setnc(nc);
      console.log("connected");
    };
    load();
    return () => {
      if (nc) nc.close();
    };
  }, []);

  return (
    <div className="border">
      {logEntries2.map((entry, i) => (
        <div key={i}>{entry}</div>
      ))}
    </div>
  );
}
