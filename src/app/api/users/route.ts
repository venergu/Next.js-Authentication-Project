import { NextResponse } from "next/server";

async function getUsers() {
  return [
    { id: 1, name: "Jan", age: 12 },
    { id: 2, name: "Grzegorz", age: 25 },
  ];
}

export async function GET() {
  // middleware handles auth

  const users = await getUsers();
  return NextResponse.json(users);
}
