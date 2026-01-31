import { randomBytes } from "crypto";

export function generateToken(): string {
  return randomBytes(32).toString("hex");
}

export function getTokenExpiration(hours: number = 1): Date {
  const now = new Date();
  now.setHours(now.getHours() + hours);
  return now;
}

export function isTokenExpired(expiredAt: Date): boolean {
  return new Date() > new Date(expiredAt);
}
