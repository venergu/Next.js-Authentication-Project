import { Text } from "@radix-ui/themes";

interface User {
  id: number;
  name: string;
  age: number;
}

async function getUsers(): Promise<User[]> {
  const res = await fetch("http://localhost:3000/api/users", {
    headers: { "x-frontend-request": "true" },
  });
  if (!res.ok) return [];
  return res.json();
}

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <section>
      <Text as="div" size="8" weight="bold" mb="4">
        Lista użytkowników
      </Text>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            <Text>{u.name}</Text>
          </li>
        ))}
      </ul>
    </section>
  );
}
