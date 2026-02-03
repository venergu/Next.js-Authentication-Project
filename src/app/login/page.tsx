"use client";
import { useAuth } from "../context/auth/useAuth";
import LoginForm from "../components/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  const { user } = useAuth();

  return (
    <section>
      <h1>Login</h1>

      {!user ? (
        <>
          <LoginForm />
          <Link href="/forgot-password">Nie pamiętasz hasła?</Link>
          <br />
          <Link href="/register">Zarejestruj się</Link>
        </>
      ) : (
        <>
          <p>Jesteś już zalogowany, {user.name}</p>
          <Link href="/dashboard">Przejdź do dashboard</Link>
        </>
      )}
    </section>
  );
}
