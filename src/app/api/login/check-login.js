import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = cookies();
  const isLoggedIn = (await cookieStore).get("isLoggedIn")?.value === "true";
  return new Response(JSON.stringify({ isLoggedIn }), { status: 200 });
}
