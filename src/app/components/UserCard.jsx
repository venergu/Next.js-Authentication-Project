"use client";
import { useState } from "react";
import Link from "next/link";
import { Button, Text } from "@radix-ui/themes";
export default function UserCard({ name, age, id, onDelete }) {
  return (
    <div style={{ border: "1px solid #ccc", borderRadius: "8px", margin: "10px 0", padding: "10px" }}>
      <Text as="div" size="4" weight="bold">
        {name}
      </Text>
      <Text as="p" size="2" color="gray" mb="2">
        Wiek: {age}
      </Text>
      <Link href={`/users/${id}`}>
        <Text color="blue" highContrast size="2" mr="4">
          Szczegóły
        </Text>
      </Link>
      <Button variant="soft" color="red" size="1" onClick={() => onDelete(id)}>
        Usuń
      </Button>
    </div>
  );
}
