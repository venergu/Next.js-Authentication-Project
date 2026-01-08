"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import { Text } from "@radix-ui/themes";

export default function UserDetails() {
  const params = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch("/api/users", {
        headers: { "x-frontend-request": "true" },
        next: { revalidate: 10 },
      });
      const data = await res.json();
      const found = data.find((u) => u.id === parseInt(params.id));
      setUser(found || null);
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
