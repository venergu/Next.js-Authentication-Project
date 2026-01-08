import { Text } from "@radix-ui/themes";

export default function RootLayout({ children }) {
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
