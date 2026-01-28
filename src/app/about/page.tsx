import Link from "next/link";
import { Text } from "@radix-ui/themes";
export default function AboutPage() {
  return (
    <section>
      <Text as="div" size="8" weight="bold" color="gray" mb="4">
        Witaj w sekcji About
      </Text>
      <Link href="/">
        <Text color="blue" highContrast>
          Powróć na stronę główną
        </Text>
      </Link>
    </section>
  );
}
