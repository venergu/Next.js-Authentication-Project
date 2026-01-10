"use client";
import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/auth/useAuth";

export default function LoginForm() {
  const { login: performLogin } = useAuth();
  const router = useRouter();
  const [login, setLogin] = useState<string>("admin");
  const [password, setPassword] = useState<string>("1234");
  const [message, setMessage] = useState<string>("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      await performLogin(login, password);
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      setMessage("Błąd połączenia z serwerem...");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "12px" }}
    >
      <input
        type="text"
        placeholder="Wpisz login"
        value={login}
        onChange={(e) => setLogin(e.target.value)}
        required
        style={{ padding: "8px", fontSize: "16px" }}
      />

      <input
        type="password"
        placeholder="Hasło"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        style={{ padding: "8px", fontSize: "16px" }}
      />

      <button type="submit">Zaloguj</button>

      {message && <p style={{ color: "red" }}>{message}</p>}
    </form>
  );
}
