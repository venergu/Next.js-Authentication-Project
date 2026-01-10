import { NextRequest, NextResponse } from "next/server";

interface User {
  id: number;
  name: string;
  age: number;
}

async function getUsers(): Promise<User[]> {
  return [
    { id: 1, name: "Jan", age: 12 },
    { id: 2, name: "Grzegorz", age: 25 },
  ];
}

export async function GET(req: NextRequest) {
  const allowFrontend = req.headers.get("x-frontend-request");

  if (allowFrontend !== "true") {
    return NextResponse.json({ error: "Brak dostępu" }, { status: 403 });
  }

  const users = await getUsers();
  return NextResponse.json(users);
}
