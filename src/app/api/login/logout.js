import { NextResponse } from "next/server";

export function POST() {
  const res = NextResponse(
    JSON.stringify({ sucess: true, message: "Wylogowano!" })
  );

  res.cookies.set({
    name: "isLoggedIn",
    value: "",
    path: "/",
    httpOnly: true,
    magAge: 0,
    sameSite: "lax",
  });

  return res;
}
