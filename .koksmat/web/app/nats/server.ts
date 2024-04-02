import { Result } from "@/koksmat/httphelper";
import { NatsConnection, connect, StringCodec } from "nats";

export interface MagicRequest {
  args: any[];
  body: string;
  channel: string;
  timeout: number;
}

export async function messageServer(subject: string) {
  let errorMessage = "";
  let hasError = false;
  let nc: NatsConnection | null = null;

  try {
    nc = await connect({
      servers: [process.env.NATS ?? "nats://127.0.0.1:4222"],
      name: "magicbutton-sharepoint-serverside",
      debug: true,
    });

    
    
  } catch (error) {
    hasError = true;
    errorMessage = (error as any).message;
  }
}
