import { NextResponse, NextRequest } from "next/server";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
<<<<<<< HEAD
import { Config } from "@/app/lib/Config";
import { Cookie } from "@/app/lib/Cookie";

type Credentials = { login: string; password: string };
const verifyCredentials = async (
  provided: Credentials,
  expected: Credentials
) => {
  // This hash should be comming from database.
  const hash = await argon2.hash(expected.password, {
    type: argon2.argon2id,
    memoryCost: 19456,
    timeCost: 2,
    parallelism: 1,
  });

  const isValidPassword = await argon2.verify(hash, provided.password);
  const isValidLogin = provided.login === expected.login;

  return isValidPassword && isValidLogin;
};

export async function GET() {
  const token = await Cookie.get("token");

  if (!token) return new NextResponse(null, { status: 401 });

  const user = jwt.verify(token, Config.jwt.secret);

  if (!user) return new NextResponse(null, { status: 401 });

  return NextResponse.json(user);
=======
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
>>>>>>> 1fd9388c6eddaad881888d2c41a42907f41907a2
}

export async function POST(req: NextRequest) {
  try {
<<<<<<< HEAD
    const { login, password } = await req.json();

    const validCredentials = await verifyCredentials(
      { login, password },
      Config.user.credentials
    );

    if (!validCredentials) {
      return NextResponse.json(
        { success: false, message: "Błędny login lub hasło" },
        { status: 401 }
      );
    }

    const user = { name: login };
    const token = jwt.sign(user, Config.jwt.secret, { expiresIn: "7d" });

    const response = NextResponse.json(user);
    response.cookies.set(Cookie.make("token", token));

    return response;
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { success: false, message: "Błąd serwera" },
      { status: 500 }
    );
=======
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
>>>>>>> 1fd9388c6eddaad881888d2c41a42907f41907a2
  }
}
