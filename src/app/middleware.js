import { NextResponse } from "next/server";

export function middleware(req) {
  const isLoggedIn = req.cookies.get("isLoggedIn")?.value;
  const path = req.nextUrl.pathname;

  if (path.startsWith("/dashboard") && isLoggedIn !== "true") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (path.startsWith("/api/users") && isLoggedIn !== "true") {
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
