"use client";
import { Button, Text } from "@radix-ui/themes";
export default function Error({ error, reset }) {
  return (
    <div>
      <Text size="2" weight="bold" color="brown">
        Napotkaliśmy błąd...
      </Text>
      <Button onClick={() => reset()}>Spróbuj ponownie</Button>
    </div>
  );
}
