import { NextResponse, NextRequest } from "next/server";
import db from "@/app/lib/database/db";
import { isTokenExpired } from "@/app/lib/reset-password/crypto/crypto-utils";

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();
    if (!token) {
      return NextResponse.json(
        { error: "Brak token", valid: false },
        { status: 400 },
      );
    }
    const [tokens] = await db.execute(
      `SELECT token, user_email, expires_at, used FROM password_reset_tokens WHERE token = ?`,
      [token],
    );
    const resetToken = (tokens as any[])[0];
    if (!resetToken) {
      return NextResponse.json({
        valid: false,
        error: "Nieprawidłowy link resetujący",
      });
    }
    if (resetToken.used) {
      return NextResponse.json({
        valid: false,
        error: "Ten link został już użyty",
      });
    }
    if (isTokenExpired(resetToken.expires_at)) {
      return NextResponse.json({
        valid: false,
        error: "Link wygasł. Wygeneruj nowy link.",
      });
    }
    return NextResponse.json({
      valid: true,
      email: resetToken.user_email,
    });
  } catch (err) {
    return NextResponse.json(
      { valid: false, error: "Błąd serwera" },
      { status: 500 },
    );
  }
}
