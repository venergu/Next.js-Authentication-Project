"use client";
<<<<<<< HEAD

=======
>>>>>>> 1fd9388c6eddaad881888d2c41a42907f41907a2
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
<<<<<<< HEAD
=======
  const [isLoading, setIsLoading] = useState(true);
>>>>>>> 1fd9388c6eddaad881888d2c41a42907f41907a2

  useEffect(() => {
    if (!user) {
      router.replace("/login");
<<<<<<< HEAD
    }
  }, [user, router]);

  useEffect(() => {
    if (!user) return;

    UserApi.getUsers().then(setUsers).catch(console.error);
  }, [user]);

  if (!user) return null;
=======
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
>>>>>>> 1fd9388c6eddaad881888d2c41a42907f41907a2

  const onDelete = async (id: number) => {
    await fetch("/api/users", {
      method: "DELETE",
<<<<<<< HEAD
      headers: {
        "content-type": "application/json",
      },
=======
      headers: { "content-type": "application/json" },
>>>>>>> 1fd9388c6eddaad881888d2c41a42907f41907a2
      body: JSON.stringify({ id }),
    });
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  return (
<<<<<<< HEAD
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
=======
    <div>
      <Heading>Witaj {user.name} na stronie po zalogowaniu!</Heading>
      <Button onClick={handleLogout}>Wyloguj</Button>

      <Heading>Lista użytkowników:</Heading>
      {isLoading ? (
        <div>Ładowanie...</div>
      ) : users.length === 0 ? (
        <div>Brak użytkowników</div>
>>>>>>> 1fd9388c6eddaad881888d2c41a42907f41907a2
      ) : (
        users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onDelete={() => onDelete(user.id)}
          />
        ))
      )}
<<<<<<< HEAD
    </section>
=======
    </div>
>>>>>>> 1fd9388c6eddaad881888d2c41a42907f41907a2
  );
}
