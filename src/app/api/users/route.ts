import { NextResponse } from "next/server";
import db from "@/app/lib/database/db";

export async function GET() {
  try {
    const [rows] = await db.query("SELECT * FROM users");
    return NextResponse.json(rows);
  } catch (err) {
<<<<<<< HEAD
    console.error(err);
=======
>>>>>>> 1fd9388c6eddaad881888d2c41a42907f41907a2
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

export async function POST(req: Request) {
  try {
    const { name, age } = await req.json();

    if (!name || typeof name !== "string") {
      return NextResponse.json(
        { message: "Błąd, wpisz poprawne imię." },
        { status: 400 },
      );
    }

    const ageNumber = Number(age);
    if (!age || isNaN(ageNumber)) {
      return NextResponse.json(
        { message: "Błąd, w miejscu wieku wpisz liczbę." },
        { status: 400 },
      );
    }

    const [result] = await db.query(
      "INSERT INTO users (name, age) VALUES (?, ?)",
      [name, age],
    );

    return NextResponse.json({
      id: result.insertId,
      name,
      age,
    });
  } catch (err) {
<<<<<<< HEAD
    console.error(err);
=======
>>>>>>> 1fd9388c6eddaad881888d2c41a42907f41907a2
    return NextResponse.json({ message: "Błąd serwera" }, { status: 500 });
  }
}
