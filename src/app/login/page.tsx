"use client";
import React from "react";
import { useAuth } from "../context/auth/useAuth";
import LoginForm from "../components/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  const { isLoggedIn, loginName } = useAuth();

  return (
    <section>
      <h1>Login</h1>
      {!isLoggedIn ? (
        <LoginForm />
      ) : (
        <>
          <p>Jesteś już zalogowany, {loginName}</p>
          <Link href="/dashboard">Przejdź do dashboard</Link>
        </>
      )}
    </section>
  );
}
