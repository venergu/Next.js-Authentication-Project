import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { Config } from "./lib/Config";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const path = req.nextUrl.pathname;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    jwt.verify(token, Config.jwt.secret);
  } catch (error) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (path.startsWith("/api/users")) {
    return new NextResponse(JSON.stringify({ error: "Brak dostępu" }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/users/:path*"],
};
