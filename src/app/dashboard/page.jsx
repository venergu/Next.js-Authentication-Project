"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../context/AuthContext";
import UserCard from "../components/UserCard";
import { Text, Button } from "@radix-ui/themes";

export default function DashboardPage() {
  const router = useRouter();
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

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

        if (!res.ok) {
          console.error("Błąd fetch: ", res.statusText);
          return;
        }

        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Błąd fetch:", err);
      }
    }

    fetchUsers();
  }, [isLoggedIn]);

  const onDelete = (id) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  const handleLogout = () => {
    document.cookie = "isLoggedIn=false; path=/";
    setIsLoggedIn(false);
    router.replace("/login");
  };

  if (!isLoggedIn) return null;

  return (
    <section>
      <Text as="h1" size="8" weight="bold" mb="4">
        Witaj na stronie po zalogowaniu!
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
