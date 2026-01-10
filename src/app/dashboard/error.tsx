"use client";
import { Button, Text } from "@radix-ui/themes";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div>
      <Text size="2" weight="bold" color="brown">
        Napotkaliśmy błąd...
      </Text>
      <Button onClick={() => reset()}>Spróbuj ponownie</Button>
    </div>
  );
}
