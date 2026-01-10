"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import { Text } from "@radix-ui/themes";

interface User {
  id: number;
  name: string;
  age: number;
}

export default function UserDetails() {
  const params = useParams();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/users", {
          headers: { "x-frontend-request": "true" },
        });
        const data: User[] = await res.json();
        const found = data.find((u) => u.id === parseInt(params.id as string));
        setUser(found || null);
      } catch (err) {
        console.error(err);
      }
    }

    fetchUser();
  }, [params.id]);

  if (!user) {
    return <Text>Ładowanie użytkownika...</Text>;
  }

  return (
    <section>
      <Suspense fallback={<Text>Ładowanie użytkowników...</Text>}>
        <Text as="div" size="4" weight="bold" mb="2">
          Profil użytkownika
        </Text>
        <Text as="p">Id użytkownika: {params.id}</Text>
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
