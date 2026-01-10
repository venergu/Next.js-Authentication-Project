import Link from "next/link";
import { Text } from "@radix-ui/themes";

export default function ContactPage() {
  return (
    <section>
      <Text as="div" size="8" weight="bold" color="plum" mb="4">
        Witaj na sekcji contact
      </Text>
      <Link href="/">
        <Text color="blue" highContrast>
          Powrót na strone główną
        </Text>
      </Link>
    </section>
  );
}
