import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { Config } from "@/app/lib/Config";
import { Cookie } from "@/app/lib/Cookie";

export async function GET() {
  const token = await Cookie.get("token");

  if (!token) return new NextResponse(null, { status: 401 });

  const user = jwt.verify(token, Config.jwt.secret);

  if (!user) return new NextResponse(null, { status: 401 });

  return NextResponse.json({ user });
}

export async function POST(req: NextRequest) {
  try {
    const { login, password } = await req.json();

    const creds = Config.user.credentials;
    const validCredentials =
      login === creds.login && password === creds.password;

    if (!validCredentials) {
      return NextResponse.json(
        { success: false, message: "Błędny login lub hasło" },
        { status: 401 }
      );
    }

    const user = { name: login };

    const response = NextResponse.json(user);

    const token = jwt.sign(user, Config.jwt.secret, { expiresIn: "7d" });

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
