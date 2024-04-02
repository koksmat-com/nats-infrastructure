"use server";

import { randomBytes } from "crypto";
import path from "path";
import * as fs from "fs";
import { cookies } from "next/headers";
export async function getTransactionId() {
  return randomBytes(16).toString("hex");
}

export interface Security {
  passwords: string;
}

export async function isValidPassword(password: string): Promise<boolean> {
  const filePath = path.join(process.env.DATAPATH ?? "", "passwords.json");
  const passwordText = fs.readFileSync(filePath, "utf-8");
  const security: Security = JSON.parse(passwordText);

  const validPassword = security.passwords.split("|").find((p) => {
    const pair = p.split("=");
    if (pair.length !== 2) return false;
    const now = Date.now();
    const date = Date.parse(pair[0]);
    if (now > date) return false;
    return pair[1] === password;
  });

  return validPassword !== undefined;
}

export async function validatePasswordAndStoreInCookie(password: string) {
  const cookieStore = cookies();
  const isValid = await isValidPassword(password);
  if (isValid) {
    cookieStore.set("password", password);
  }
  return isValid;
}

export async function hasValidPasswordInCookieStore() {
  const cookieStore = cookies();
  const password = cookieStore.get("password");
  const isValid = await isValidPassword(password?.value ?? "");

  return isValid;
}

export async function validatePassword(password: string) {
  const cookieStore = cookies();

  const filePath = path.join(process.env.DATAPATH ?? "", "passwords.json");
  const passwordText = fs.readFileSync(filePath, "utf-8");
  const security: Security = JSON.parse(passwordText);

  const validPassword = security.passwords.split("|").find((p) => {
    const pair = p.split("=");
    if (pair.length !== 2) return false;
    const now = Date.now();
    const date = Date.parse(pair[0]);
    if (now > date) return false;
    return pair[1] === password;
  });

  const isValid = validPassword !== undefined;
  if (isValid) {
    cookieStore.set("password", password);
  }
  return isValid;
}
