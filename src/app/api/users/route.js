import { NextResponse } from "next/server";

async function getUsers() {
  return [
    { id: 1, name: "Jan", age: 12 },
    { id: 2, name: "Grzegorz", age: 25 },
  ];
}

export async function GET(req) {
  const allowFrontend = req.headers.get("x-frontend-request");

  if (allowFrontend !== "true") {
    return NextResponse.json({ error: "Brak dostępu" }, { status: 403 });
  }

  const users = await getUsers();
  return NextResponse.json(users);
}
