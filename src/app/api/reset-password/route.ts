import { NextRequest, NextResponse } from "next/server";
import db from "@/app/lib/database/db";
import * as argon2 from "argon2";
import { isTokenExpired } from "@/app/lib/reset-password/crypto/crypto-utils";

export async function POST(req: NextRequest) {
  try {
    const { token, newPassword } = await req.json();
    if (!token || !newPassword) {
      return NextResponse.json(
        { error: "Token i nowe hasło są wymagane" },
        { status: 400 },
      );
    }
    if (newPassword.length < 8) {
      return NextResponse.json(
        { error: "Hasło musi mieć minimum 8 znaków" },
        { status: 400 },
      );
    }
    const [tokens] = await db.query(
      "SELECT token, user_email, expiredAt, used FROM password_reset_tokens WHERE token = ?",
      [token],
    );
    const resetToken = (tokens as any[])[0];
    if (!resetToken) {
      return NextResponse.json(
        { error: "Token został już użyty" },
        { status: 400 },
      );
    }
    if (isTokenExpired(resetToken.expires_at)) {
      return NextResponse.json({ error: "Token wygasł" }, { status: 400 });
    }

    const passwordHash = await argon2.hash(newPassword, {
      type: argon2.argon2id,
      memoryCost: 65536,
      timeCost: 3,
      parallelism: 4,
    });
    await db.query(
      "UPDATE password_reset_tokens SET used = TRUE WHERE token = ?",
      [token],
    );
    return NextResponse.json({
      success: true,
      message: "Hasło zostało zmienione pomyślnie",
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Wystąpił błąd serwera" },
      { status: 500 },
    );
  }
}
