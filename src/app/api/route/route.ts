import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { login, password } = await req.json();

    const validCredentials =
      login === process.env["LOGIN"] && password === process.env["PASSWORD"];

    if (!validCredentials) {
      return NextResponse.json(
        { success: false, message: "Błędny login lub hasło" },
        { status: 401 }
      );
    }

    const res = NextResponse.json({ success: true, message: "Zalogowano!" });

    return res;
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { success: false, message: "Błąd serwera" },
      { status: 500 }
    );
  }
}
