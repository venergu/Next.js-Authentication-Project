"use client";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/auth/useAuth";
<<<<<<< HEAD

const DEFAULT_LOGIN = process.env["LOGIN"];
const DEFAULT_PASSWORD = process.env["PASSWORD"];
=======
import { TextField, Button } from "@radix-ui/themes";
>>>>>>> 1fd9388c6eddaad881888d2c41a42907f41907a2

const style = {
  form: { display: "flex", flexDirection: "column", gap: "12px" },
  input: { padding: "8px", fontSize: "16px" },
  msg: { color: "red" },
} as const;

const inputs = {
<<<<<<< HEAD
  login: {
    type: "text",
    name: "login",
    placeholder: "Wpisz login",
    defaultValue: DEFAULT_LOGIN,
=======
  email: {
    type: "email",
    name: "email",
    placeholder: "Wpisz email",
>>>>>>> 1fd9388c6eddaad881888d2c41a42907f41907a2
    required: true,
    style: style.input,
  },
  password: {
    type: "password",
    name: "password",
    placeholder: "Hasło",
<<<<<<< HEAD
    defaultValue: DEFAULT_PASSWORD,
=======
>>>>>>> 1fd9388c6eddaad881888d2c41a42907f41907a2
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
<<<<<<< HEAD
    const login = formData.get("login")?.toString() ?? "";
    const password = formData.get("password")?.toString() ?? "";

    try {
      await auth.login(login, password);

      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      setMessage("Błąd połączenia z serwerem...");
=======
    const email = formData.get("email")?.toString() ?? "";
    const password = formData.get("password")?.toString() ?? "";

    try {
      await auth.login(email, password);
      router.push("/dashboard");
    } catch (err) {
      setMessage("Nieprawidłowy email lub hasło");
>>>>>>> 1fd9388c6eddaad881888d2c41a42907f41907a2
    }
  }

  return (
    <form onSubmit={handleSubmit} style={style.form}>
<<<<<<< HEAD
      <input {...inputs.login} />
      <input {...inputs.password} />

      <button type="submit">Zaloguj</button>
=======
      <TextField.Root {...inputs.email} />
      <TextField.Root {...inputs.password} />

      <Button type="submit">Zaloguj</Button>
>>>>>>> 1fd9388c6eddaad881888d2c41a42907f41907a2

      <Message msg={message} />
    </form>
  );
}

const Message = ({ msg }: { msg: string }) =>
  msg ? <p style={style.msg}>{msg}</p> : null;
