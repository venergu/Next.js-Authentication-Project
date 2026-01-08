"use client";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../context/AuthContext";

export default function LoginForm() {
  const { setIsLoggedIn } = useContext(AuthContext);
  const router = useRouter();
  const [login, setLogin] = useState("admin");
  const [password, setPassword] = useState("1234");
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch("/api/route", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, password }),
      });

      const data = await res.json();

      if (data.success) {
        setIsLoggedIn(true);
        router.push("/dashboard");
      } else {
        setMessage(data.message);
      }
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
