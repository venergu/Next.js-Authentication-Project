"use client";

import { useState } from "react";
import { Button, Text } from "@radix-ui/themes";
export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Text as="p" size="5" weight="medium" mb="2">
        Licznik: {count}
      </Text>

      <Button variant="classic" onClick={() => setCount(count + 1)} mr="2">
        Dodaj
      </Button>

      <Button variant="outline" onClick={() => setCount(0)}>
        Wyzeruj licznik
      </Button>
    </>
  );
}
