"use client";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/auth/useAuth";

const DEFAULT_LOGIN = process.env["LOGIN"];
const DEFAULT_PASSWORD = process.env["PASSWORD"];

const style = {
  form: { display: "flex", flexDirection: "column", gap: "12px" },
  input: { padding: "8px", fontSize: "16px" },
  msg: { color: "red" },
} as const;

const inputs = {
  login: {
    type: "email",
    name: "login",
    placeholder: "Wpisz login",
    defaultValue: DEFAULT_LOGIN,
    required: true,
    style: style.input,
  },
  password: {
    type: "password",
    name: "password",
    placeholder: "Hasło",
    defaultValue: DEFAULT_PASSWORD,
    required: true,
    style: style.input,
  },
} as const;

export default function LoginForm() {
  const auth = useAuth();
  const router = useRouter();
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const login = formData.get("login")?.toString() ?? "";
    const password = formData.get("password")?.toString() ?? "";

    try {
      await auth.login(login, password);

      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      setMessage("Błąd połączenia z serwerem...");
    }
  }

  return (
    <form onSubmit={handleSubmit} style={style.form}>
      <input {...inputs.login} />
      <input {...inputs.password} />

      <button type="submit">Zaloguj</button>

      <Message msg={message} />
    </form>
  );
}

const Message = ({ msg }: { msg: string }) =>
  msg ? <p style={style.msg}>{msg}</p> : null;
