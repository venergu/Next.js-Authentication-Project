import { NextResponse } from "next/server";
import db from "@/app/lib/database/db";

export async function GET() {
  try {
    const [rows] = await db.query("SELECT * FROM users");
    return NextResponse.json(rows);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Błąd serwera" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    await db.query("DELETE FROM users WHERE id = ?", [id]);
    return NextResponse.json({ message: `Użytkownik o ${id} usunięty` });
  } catch (err) {
    NextResponse.json({ message: "Błąd serwera" }, { status: 500 });
  }
}
