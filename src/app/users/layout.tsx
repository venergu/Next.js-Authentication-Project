import { Text } from "@radix-ui/themes";
import { ReactNode } from "react";

export default function UsersLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <header style={{ padding: "10px", background: "#eee" }}>
        <Text size="2" weight="bold">
          Użytkownicy
        </Text>
      </header>
      <section style={{ padding: "10px" }}>{children}</section>
    </>
  );
}
