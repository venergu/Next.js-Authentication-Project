"use client";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/auth/useAuth";
import { TextField, Button } from "@radix-ui/themes";

const style = {
  form: { display: "flex", flexDirection: "column", gap: "12px" },
  input: { padding: "8px", fontSize: "16px" },
  msg: { color: "red" },
} as const;

const inputs = {
  email: {
    type: "email",
    name: "email",
    placeholder: "Wpisz email",
    required: true,
    style: style.input,
  },
  password: {
    type: "password",
    name: "password",
    placeholder: "Hasło",
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
    const email = formData.get("email")?.toString() ?? "";
    const password = formData.get("password")?.toString() ?? "";

    try {
      await auth.login(email, password);
      router.push("/dashboard");
    } catch (err) {
      setMessage("Nieprawidłowy email lub hasło");
    }
  }

  return (
    <form onSubmit={handleSubmit} style={style.form}>
      <TextField.Root {...inputs.email} />
      <TextField.Root {...inputs.password} />

      <Button type="submit">Zaloguj</Button>

      <Message msg={message} />
    </form>
  );
}

const Message = ({ msg }: { msg: string }) =>
  msg ? <p style={style.msg}>{msg}</p> : null;
