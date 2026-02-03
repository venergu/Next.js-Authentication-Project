"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { TextField, Button, Heading, Text, Flex, Card } from "@radix-ui/themes";

const forgotPasswordSchema = z.object({
  email: z.string().email("Nieprawidłowy email"),
});

type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordForm) => {
    setServerError(null);

    try {
      const response = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.status === 429) {
        setServerError("Zbyt wiele prób. Spróbuj ponownie za godzinę.");
        return;
      }

      if (!response.ok) {
        setServerError(result.error || "Wystąpił błąd");
        return;
      }

      setSuccess(true);
    } catch (error) {
      setServerError("Nie można połączyć z serwerem");
    }
  };

  if (success) {
    return (
      <Flex justify="center" mt="9">
        <Card size="4" width="400px">
          <Heading size="6" mb="2">
            Sprawdź email
          </Heading>
          <Text size="3" color="gray" mb="4">
            Jeśli podany email istnieje w systemie, wysłaliśmy link do
            resetowania hasła. Link będzie ważny przez 1 godzinę.
          </Text>
          <Button size="3" width="100%" onClick={() => router.push("/login")}>
            Wróć do logowania
          </Button>
        </Card>
      </Flex>
    );
  }

  return (
    <Flex justify="center" mt="9">
      <Card size="4" width="400px">
        <Heading size="6" mb="2">
          Resetuj hasło
        </Heading>
        <Text size="3" color="gray" mb="4">
          Wpisz email przyporządkowany do konta. Wysłamy link do resetowania
          hasła.
        </Text>

        {serverError && (
          <Text size="2" color="red" mb="2">
            {serverError}
          </Text>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex direction="column" gap="3">
            <div>
              <TextField.Root
                {...register("email")}
                type="email"
                placeholder="Email"
                size="3"
              />
              {errors.email && (
                <Text size="1" color="red" mt="1">
                  {errors.email.message}
                </Text>
              )}
            </div>

            <Button type="submit" disabled={isSubmitting} size="3" width="100%">
              {isSubmitting ? "Wysyłanie..." : "Wyślij link"}
            </Button>
          </Flex>
        </form>

        <Text size="2" color="gray" mt="4" align="center">
          Pamiętasz hasło? <a href="/login">Zaloguj się</a>
        </Text>
      </Card>
    </Flex>
  );
}
