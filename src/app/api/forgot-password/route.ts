import { NextRequest, NextResponse } from "next/server";
import db from "@/app/lib/database/db";
import { getClientIP } from "@/app/lib/reset-password/get-client-ip";
import { passwordResetLimiter } from "@/app/lib/reset-password/reset-password-limiter/reset";
import {
  generateToken,
  getTokenExpiration,
} from "@/app/lib/reset-password/crypto/crypto-utils";

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIP(req);
    const rateLimitResult = await passwordResetLimiter.check(ip);
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: "Zbyt wiele prób", message: "Spróbuj ponownie za godzinę" },
        { status: 429 },
      );
    }

    const { email } = await req.json();
    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Nieprawidłowy email" },
        { status: 400 },
      );
    }
    const [users] = await db.query(
      "SELECT id, email, name FROM users WHERE email = ?",
      [email],
    );
    if (!users) {
      return NextResponse.json({
        success: true,
        message:
          "Jeśli podany email istnieje w systemie, wysłaliśmy link do resetowania hasła",
      });
    }
    await db.execute("DELETE FROM password_reset_tokens WHERE user_email = ?", [
      email,
    ]);

    const token = generateToken();
    const expiredAt = getTokenExpiration(1);
    await db.execute(
      "INSERT INTO password_reset_tokens (token, user_email, expires_at) VALUES (?, ?, ?)",
      [token, email, expiredAt],
    );
    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;
    await sendPasswordResetEmail({
      to: email,
      name: users.name,
      resetLink: resetLink,
      expiresInMinutes: 60,
    });
    return NextResponse.json({
      success: true,
      message:
        "Jeśli podany email istnieje w systemie, wysłaliśmy link do resetowania hasła",
    });
  } catch (err) {
    return NextResponse.json(
      {
        error: "Wystąpił błąd serwera",
        message: "Spróbuj ponownie później",
      },
      { status: 500 },
    );
  }
}

async function sendPasswordResetEmail({
  to,
  name,
  resetLink,
  expiresInMinutes,
}: {
  to: string;
  name: string;
  resetLink: string;
  expiresInMinutes: number;
}) {}
