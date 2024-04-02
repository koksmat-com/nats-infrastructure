"use client";

import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const load = async () => {
      router.push("/nats");
    };
    load();
  }, []);

  return <div></div>;
}
