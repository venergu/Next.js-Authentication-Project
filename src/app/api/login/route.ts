import { NextResponse, NextRequest } from "next/server";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { Config } from "@/app/lib/Config";
import { Cookie } from "@/app/lib/Cookie";
import db from "@/app/lib/database/db";
import { RowDataPacket } from "mysql2";
import { cookies } from "next/headers";

const loginSchema = z.object({
  email: z.string().email("Nieprawidłowy email"),
  password: z.string().min(1, "Hasło jest wymagane"),
});

interface UserRow extends RowDataPacket {
  id: number;
  name: string;
  email: string;
  password: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validationResult = loginSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Nieprawidłowe dane",
          details: validationResult.error.flatten(),
        },
        { status: 400 },
      );
    }

    const { email, password } = validationResult.data;

    const [users] = await db.query<UserRow[]>(
      "SELECT id, name, email, password FROM admins WHERE email = ?",
      [email],
    );

    if (!users || users.length === 0) {
      return NextResponse.json(
        { error: "Nieprawidłowy email lub hasło" },
        { status: 401 },
      );
    }

    const user = users[0];

    const isPasswordValid = await argon2.verify(user.password, password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Nieprawidłowy email lub hasło" },
        { status: 401 },
      );
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        name: user.name,
      },
      Config.jwt.secret,
      { expiresIn: "24h" },
    );

    const response = NextResponse.json(
      {
        message: "Logowanie udane",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
      { status: 200 },
    );

    const cookieStore = await cookies();
    cookieStore.set(Cookie.make("token", token));

    return response;
  } catch (error) {
    return NextResponse.json({ error: "Błąd serwera" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const token = await Cookie.get("token");

    if (!token) {
      return NextResponse.json({ error: "Nie zalogowany" }, { status: 401 });
    }

    const decoded = jwt.verify(token, Config.jwt.secret) as {
      userId: number;
      email: string;
      name: string;
    };

    const [users] = await db.query<UserRow[]>(
      "SELECT id, name, email FROM admins WHERE id = ?",
      [decoded.userId],
    );

    if (!users || users.length === 0) {
      return NextResponse.json(
        { error: "Użytkownik nie istnieje" },
        { status: 401 },
      );
    }

    return NextResponse.json(
      {
        user: {
          id: decoded.userId,
          name: decoded.name,
          email: decoded.email,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error: "Nieprawidłowy token" }, { status: 401 });
  }
}
