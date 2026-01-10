"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import UserCard from "../components/UserCard";
import { Text, Button } from "@radix-ui/themes";
import { useLogout } from "../hooks/useLogout";
import { useAuth } from "../context/auth/useAuth";

export default function DashboardPage() {
  const router = useRouter();
  const { isLoggedIn, loginName } = useAuth();
  const [users, setUsers] = useState([]);
  const logout = useLogout();

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/login");
    }
  }, [isLoggedIn, router]);

  useEffect(() => {
    if (!isLoggedIn) return;

    async function fetchUsers() {
      try {
        const res = await fetch("/api/users", {
          headers: { "x-frontend-request": "true" },
        });
        if (!res.ok) return;
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchUsers();
  }, [isLoggedIn]);

  const onDelete = (id) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  if (!isLoggedIn) return null;

  return (
    <section>
      <Text as="h1" size="8" weight="bold" mb="4">
        Witaj {loginName} na stronie po zalogowaniu!
      </Text>

      <Button onClick={handleLogout} mb="4">
        Wyloguj
      </Button>

      <h2>Lista użytkowników:</h2>

      {users.length === 0 ? (
        <p>Ładowanie...</p>
      ) : (
        users.map((user) => (
          <UserCard
            key={user.id}
            id={user.id}
            name={user.name}
            age={user.age}
            onDelete={onDelete}
          />
        ))
      )}
    </section>
  );
}
