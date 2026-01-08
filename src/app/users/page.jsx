import { Text } from "@radix-ui/themes";

async function getUsers() {
  const res = await fetch("/api/users", {
    headers: { "x-frontend-request": "true" },
  });
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
