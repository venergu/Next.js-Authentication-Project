import { NextResponse, NextRequest } from "next/server";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
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
}

export async function POST(req: NextRequest) {
  try {
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
  }
}
