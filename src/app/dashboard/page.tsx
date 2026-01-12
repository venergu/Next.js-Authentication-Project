"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserCard } from "../components/UserCard";
import { Button, Heading } from "@radix-ui/themes";
import { useAuth } from "../context/auth/useAuth";
import { UserApi } from "../lib/users/api";
import type { User } from "../lib/users/types";

export default function DashboardPage() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, [user, router]);

  useEffect(() => {
    if (!user) return;

    UserApi.getUsers().then(setUsers).catch(console.error);
  }, [user]);

  if (!user) return null;

  const onDelete = (id: number) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  return (
    <section>
      <Heading as="h1" size="8" weight="bold" mb="4">
        Witaj {user.name} na stronie po zalogowaniu!
      </Heading>

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
            user={user}
            onDelete={() => onDelete(user.id)}
          />
        ))
      )}
    </section>
  );
}
