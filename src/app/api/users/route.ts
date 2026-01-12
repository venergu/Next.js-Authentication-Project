import { NextResponse } from "next/server";

const users = new Map(
  [
    { id: 1, name: "Jan", age: 12 },
    { id: 2, name: "Grzegorz", age: 25 },
  ].map((user) => [user.id, user])
);

const getUsers = async () => Array.from(users.values());

const deleteUser = async () => {}; // Todo(task): Implement API endpoint & Frontend.

export async function GET() {
  // middleware handles auth

  const users = await getUsers();
  return NextResponse.json(users);
}
