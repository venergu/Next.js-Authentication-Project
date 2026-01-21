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
