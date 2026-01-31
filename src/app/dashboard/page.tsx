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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.replace("/login");
      return;
    }

    setIsLoading(true);
    UserApi.getUsers()
      .then(setUsers)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, [user, router]);

  if (!user) {
    return null;
  }

  const onDelete = async (id: number) => {
    await fetch("/api/users", {
      method: "DELETE",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  return (
    <div>
      <Heading>Witaj {user.name} na stronie po zalogowaniu!</Heading>
      <Button onClick={handleLogout}>Wyloguj</Button>

      <Heading>Lista użytkowników:</Heading>
      {isLoading ? (
        <div>Ładowanie...</div>
      ) : users.length === 0 ? (
        <div>Brak użytkowników</div>
      ) : (
        users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onDelete={() => onDelete(user.id)}
          />
        ))
      )}
    </div>
  );
}
