import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import db from "@/app/lib/database/db";
import { getClientIP } from "@/app/lib/reset-password/get-client-ip";
import { passwordResetLimiter } from "@/app/lib/reset-password/reset-password-limiter/reset";
import {
  generateToken,
  getTokenExpiration,
} from "@/app/lib/reset-password/crypto/crypto-utils";

const resend = new Resend(process.env.RESEND_API_KEY);

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
      "SELECT id, email, name FROM admins WHERE email = ?",
      [email],
    );

    if (!users || users.length === 0) {
      return NextResponse.json({
        success: true,
        message:
          "Jeśli podany email istnieje w systemie, wysłaliśmy link do resetowania hasła",
      });
    }

    const user = users[0];

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

    const { data, error } = await resend.emails.send({
      from: "noreply@resend.dev",
      to: [email],
      subject: "Reset hasła",
      html: generateResetEmailHTML({
        name: user.name,
        resetLink,
        expiresInMinutes: 60,
      }),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Błąd wysyłania emaila. Spróbuj ponownie." },
        { status: 500 },
      );
    }

    console.log("Email wysłany, id:", data?.id);

    return NextResponse.json({
      success: true,
      message:
        "Jeśli podany email istnieje w systemie, wysłaliśmy link do resetowania hasła",
    });
  } catch (err) {
    console.error("Błąd w forgot-password:", err);
    return NextResponse.json(
      {
        error: "Wystąpił błąd serwera",
        message: "Spróbuj ponownie później",
      },
      { status: 500 },
    );
  }
}

function generateResetEmailHTML({
  name,
  resetLink,
  expiresInMinutes,
}: {
  name: string;
  resetLink: string;
  expiresInMinutes: number;
}) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <style>
          .container {
            max-width: 560px;
            margin: 0 auto;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            color: #333;
            padding: 40px 20px;
          }
          .card {
            background: #ffffff;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            padding: 40px;
          }
          h1 {
            font-size: 24px;
            margin-top: 0;
            margin-bottom: 16px;
          }
          p {
            font-size: 16px;
            line-height: 1.5;
            color: #555;
            margin-bottom: 16px;
          }
          .button {
            display: inline-block;
            background-color: #3b82f6;
            color: #ffffff;
            text-decoration: none;
            padding: 12px 24px;
            border-radius: 6px;
            font-size: 16px;
            font-weight: 600;
            margin: 8px 0 16px;
          }
          .button:hover {
            background-color: #2563eb;
          }
          .link-text {
            font-size: 14px;
            color: #888;
            word-break: break-all;
          }
          .divider {
            border: none;
            border-top: 1px solid #e5e7eb;
            margin: 24px 0;
          }
          .footer {
            font-size: 13px;
            color: #999;
            line-height: 1.5;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="card">
            <h1>Reset hasła</h1>
            <p>Witaj, ${name}!</p>
            <p>Otrzymaliśmy prośbę o zresetowanie hasła do Twojego konta. Kliknij poniższy przycisk, żeby ustawić nowe hasło:</p>
            <a href="${resetLink}" class="button">Zmień hasło</a>
            <p class="link-text">
              Jeśli przycisk nie działa, skopiuj ten link:<br />
              ${resetLink}
            </p>
            <hr class="divider" />
            <p class="footer">
              Link będzie ważny przez ${expiresInMinutes} minut.<br />
              Jeśli to nie Ty wysłałeś tę prośbę, zignoruj tego emaila. Twoje hasło pozostanie bez zmian.
            </p>
          </div>
        </div>
      </body>
    </html>
  `;
}
