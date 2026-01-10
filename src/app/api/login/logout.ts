import { NextResponse } from "next/server";

export function POST() {
  const res = NextResponse.json(
    { success: true, message: "Wylogowano!" }
  );

  res.cookies.set({
    name: "isLoggedIn",
    value: "",
    path: "/",
    httpOnly: true,
    maxAge: 0,
    sameSite: "lax",
  });

  return res;
}
