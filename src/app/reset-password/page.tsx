"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { TextField, Button, Heading, Text, Flex, Card } from "@radix-ui/themes";

const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Hasło musi mieć min. 8 znaków"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Hasła muszą być takie same",
    path: ["confirmPassword"],
  });

type ResetPasswordForm = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [tokenValid, setTokenValid] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordForm>({
    resolver: zodResolver(resetPasswordSchema),
  });

  useEffect(() => {
    async function verifyToken() {
      if (!token) {
        setTokenValid(false);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("/api/verify-reset-token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        const result = await response.json();
        setTokenValid(result.valid);

        if (!result.valid) {
          setServerError(result.error);
        }
      } catch (error) {
        setTokenValid(false);
        setServerError("Błąd weryfikacji linku");
      } finally {
        setLoading(false);
      }
    }

    verifyToken();
  }, [token]);

  const onSubmit = async (data: ResetPasswordForm) => {
    setServerError(null);

    try {
      const response = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword: data.password }),
      });

      const result = await response.json();

      if (!response.ok) {
        setServerError(result.error || "Wystąpił błąd");
        return;
      }

      setSuccess(true);
    } catch (error) {
      setServerError("Nie można połączyć z serwerem");
    }
  };

  if (loading) {
    return (
      <Flex justify="center" mt="9">
        <Card size="4" width="400px">
          <Text size="3" color="gray" align="center">
            Weryfikacja linku...
          </Text>
        </Card>
      </Flex>
    );
  }

  if (!tokenValid) {
    return (
      <Flex justify="center" mt="9">
        <Card size="4" width="400px">
          <Heading size="6" mb="4">
            Nieprawidłowy link
          </Heading>
          <Text size="3" color="red" mb="4">
            {serverError || "Link jest nieprawidłowy lub wygasł."}
          </Text>
          <Button
            size="3"
            width="100%"
            onClick={() => router.push("/forgot-password")}
          >
            Wygeneruj nowy link
          </Button>
        </Card>
      </Flex>
    );
  }

  if (success) {
    return (
      <Flex justify="center" mt="9">
        <Card size="4" width="400px">
          <Heading size="6" mb="2">
            Gotowo!
          </Heading>
          <Text size="3" color="gray" mb="4">
            Hasło zostało zmienione pomyślnie. Możesz się teraz zalogować.
          </Text>
          <Button size="3" width="100%" onClick={() => router.push("/login")}>
            Idź do logowania
          </Button>
        </Card>
      </Flex>
    );
  }

  return (
    <Flex justify="center" mt="9">
      <Card size="4" width="400px">
        <Heading size="6" mb="2">
          Nowe hasło
        </Heading>
        <Text size="3" color="gray" mb="4">
          Wpisz nowe hasło dla Twojego konta.
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
                {...register("password")}
                type="password"
                placeholder="Nowe hasło"
                size="3"
              />
              {errors.password && (
                <Text size="1" color="red" mt="1">
                  {errors.password.message}
                </Text>
              )}
            </div>

            <div>
              <TextField.Root
                {...register("confirmPassword")}
                type="password"
                placeholder="Potwierdź nowe hasło"
                size="3"
              />
              {errors.confirmPassword && (
                <Text size="1" color="red" mt="1">
                  {errors.confirmPassword.message}
                </Text>
              )}
            </div>

            <Button type="submit" disabled={isSubmitting} size="3" width="100%">
              {isSubmitting ? "Zmieniam..." : "Zmień hasło"}
            </Button>
          </Flex>
        </form>
      </Card>
    </Flex>
  );
}
