import Link from "next/link";
import Counter from "./Counter";
import { Text } from "@radix-ui/themes";

export default function Home() {
  return (
    <section>
      <Text
        as="div"
        size="8"
        weight="bold"
        mb="4"
        className="bg-blue-500 text-white p-10 rounded-lg"
      >
        Strona główna
      </Text>
      <Counter />
      <br />
      <Link href="/login">
        <Text color="blue" highContrast>
          Przejdź do logowania
        </Text>
      </Link>
    </section>
  );
}
