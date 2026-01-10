import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";

const mockedUser = {
  loginName: "Mocked user",
  name: "Mocked user",
  isLoggedIn: true,
};

const jwt = {
  verify: (token: string | undefined, secret: string | undefined) => {
    if (!token) return null;
    return mockedUser;
  },
};

const JWT_SECRET = process.env["JWT_SECRET"] || "secret";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const user = jwt.verify(token, JWT_SECRET);

  if (!user) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  return NextResponse.json({ user });
}

export async function POST(req: NextRequest) {
  try {
    const { login, password } = await req.json();

    const expectedLogin = process.env.login || "admin";
    const expectedPassword = process.env.password || "1234";

    if (login === expectedLogin && password === expectedPassword) {
      const res = NextResponse.json({
        ...mockedUser,
        name: login,
        success: true,
        message: "Zalogowano!",
      });

      const cookieOptions = {
        path: "/",
        httpOnly: true,
        sameSite: "lax" as const,
        maxAge: 60 * 60 * 24,
      };

      res.cookies.set({
        name: "token",
        value: "some.jwt.here",
        ...cookieOptions,
      });

      res.cookies.set({
        name: "isLoggedIn",
        value: "true",
        ...cookieOptions,
      });

      res.cookies.set({
        name: "login",
        value: login,
        ...cookieOptions,
      });

      return res;
    } else {
      return NextResponse.json(
        { success: false, message: "Błędny login lub hasło" },
        { status: 401 }
      );
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: "Błąd serwera" },
      { status: 500 }
    );
  }
}
