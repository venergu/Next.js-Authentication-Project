import { Text } from "@radix-ui/themes";
import { UserApi } from "../lib/users/api";

export default async function UsersPage() {
  const users = await UserApi.getUsers();

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
