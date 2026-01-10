import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { login, password } = await req.json();

    if (login === process.env.login && password === process.env.password) {
      const res = NextResponse.json({ success: true, message: "Zalogowano!" });
      res.cookies.set({
        name: "isLoggedIn",
        value: "true",
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 24,
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
