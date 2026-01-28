import { NextResponse } from "next/server";
import * as argon2 from "argon2";
import { z } from "zod";
import db from "@/app/lib/database/db";
import { RowDataPacket, ResultSetHeader } from "mysql2";

const registerSchema = z.object({
  name: z.string().min(2, "Imię musi mieć min. 2 znaki"),
  email: z.string().email("Nieprawidłowy email"),
  password: z.string().min(8, "Hasło musi mieć min. 8 znaków"),
});

interface UserRow extends RowDataPacket {
  id: number;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const validationResult = registerSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Nieprawidłowe dane",
          details: validationResult.error.flatten(),
        },
        { status: 400 },
      );
    }

    const { name, email, password } = validationResult.data;

    const [existingUser] = await db.query<UserRow[]>(
      "SELECT id FROM admins WHERE email = ?",
      [email],
    );

    if (existingUser && existingUser.length > 0) {
      return NextResponse.json(
        { error: "Email już istnieje" },
        { status: 400 },
      );
    }
    const hashedPassword = await argon2.hash(password);
    const [result] = await db.query<ResultSetHeader>(
      "INSERT INTO admins (name, email, password, created_at) VALUES (?, ?, ?, NOW())",
      [name, email, hashedPassword],
    );

    return NextResponse.json(
      {
        message: "Rejestracja udana",
        userId: result.insertId,
      },
      { status: 201 },
    );
  } catch (error: any) {
    if (error.code === "ER_DUP_ENTRY") {
      return NextResponse.json(
        { error: "Email już istnieje" },
        { status: 400 },
      );
    }

    return NextResponse.json({ error: "Błąd serwera" }, { status: 500 });
  }
}
