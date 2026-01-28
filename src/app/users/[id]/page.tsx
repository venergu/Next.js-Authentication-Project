"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { Text } from "@radix-ui/themes";
import type { User } from "@/app/lib/users/types";
import { UserApi } from "@/app/lib/users/api";

export default function UserDetails() {
  const userId = useParams().id;
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const users = await UserApi.getUsers();
        const user = users?.find((u) => u.id.toString() === userId) ?? null;
        setUser(user);
      } catch (err) {
        console.error(err);
      }
    }

    fetchUser();
  }, [userId]);

  if (!user) {
    return <Text>Ładowanie użytkownika...</Text>;
  }

  return (
    <section>
      <Suspense fallback={<Text>Ładowanie użytkowników...</Text>}>
        <Text as="div" size="4" weight="bold" mb="2">
          Profil użytkownika
        </Text>

        <Text as="p">Id użytkownika: {userId}</Text>
        <Text as="p">Imię: {user.name}</Text>
        <Text as="p">Wiek: {user.age}</Text>

        <Link href="/dashboard">
          <Text color="blue" highContrast>
            Powrót do panelu
          </Text>
        </Link>
      </Suspense>
    </section>
  );
}
