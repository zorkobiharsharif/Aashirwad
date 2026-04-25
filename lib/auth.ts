import crypto from "node:crypto";

import { cookies } from "next/headers";

const COOKIE_NAME = "aashirwad_admin_session";

function getSecret() {
  return process.env.ADMIN_SESSION_SECRET || "temporary-dev-secret";
}

function encode(value: string) {
  return Buffer.from(value).toString("base64url");
}

function decode(value: string) {
  return Buffer.from(value, "base64url").toString("utf8");
}

function signPayload(payload: string) {
  return crypto.createHmac("sha256", getSecret()).update(payload).digest("hex");
}

export function buildSessionToken(username: string) {
  const expires = Date.now() + 1000 * 60 * 60 * 12;
  const payload = `${username}.${expires}`;
  return `${encode(payload)}.${signPayload(payload)}`;
}

export function verifySessionToken(token?: string | null) {
  if (!token) return false;
  const [encoded, signature] = token.split(".");
  if (!encoded || !signature) return false;

  const payload = decode(encoded);
  if (signPayload(payload) !== signature) return false;

  const [username, expires] = payload.split(".");
  if (!username || !expires) return false;

  return Number(expires) > Date.now();
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  return verifySessionToken(cookieStore.get(COOKIE_NAME)?.value);
}

export const adminCookieName = COOKIE_NAME;
