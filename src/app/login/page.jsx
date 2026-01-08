"use client";
import Link from "next/link";
import LoginForm from "../components/LoginFrom";
import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";

export default function LoginPage() {
  const { isLoggedIn, login } = useContext(AuthContext);
  const [loginName, setLoginName] = useState(null);

  useEffect(() => {
    setLoginName(localStorage.getItem("loginName"));
  }, []);

  return (
    <section>
      <h1>Login</h1>

      {!isLoggedIn ? (
        <LoginForm onLogin={login} />
      ) : (
        <>
          <p>Jesteś już zalogowany, {loginName}</p>
          <Link href="/dashboard">Przejdź do dashboard</Link>
        </>
      )}
    </section>
  );
}
