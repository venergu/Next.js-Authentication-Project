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
<<<<<<< HEAD
        <LoginForm />
=======
        <>
          <LoginForm />
          <Link href="/register">Zarejestruj się</Link>
        </>
>>>>>>> 1fd9388c6eddaad881888d2c41a42907f41907a2
      ) : (
        <>
          <p>Jesteś już zalogowany, {user.name}</p>
          <Link href="/dashboard">Przejdź do dashboard</Link>
        </>
      )}
    </section>
  );
}
