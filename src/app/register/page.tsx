"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { TextField, Button, Heading } from "@radix-ui/themes";

const registerSchema = z
  .object({
    name: z.string().min(2, "Imię musi mieć min. 2 znaki"),
    email: z.string().email("Nieprawidłowy email"),
    password: z.string().min(8, "Hasło musi mieć min. 8 znaków"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Hasła muszą być takie same",
    path: ["confirmPassword"],
  });

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterForm) => {
    setServerError(null);
    const { confirmPassword, ...registerData } = data;

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerData),
      });

      const result = await response.json();

      if (response.status === 400) {
        if (result.error === "Email już istnieje") {
          setError("email", {
            type: "manual",
            message: "Ten email jest już zarejestrowany",
          });
          return;
        }

        if (result.details) {
          setServerError("Nieprawidłowe dane");
          return;
        }
      }

      if (!response.ok) {
        setServerError(result.error || "Wystąpił błąd");
        return;
      }

      router.push("/login");
    } catch (error) {
      setServerError("Nie można połączyć z serwerem");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px" }}>
      <Heading size="6" mb="4">
        Rejestracja
      </Heading>

      {serverError && (
        <div style={{ color: "red", marginBottom: "16px" }}>{serverError}</div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginBottom: "16px" }}>
          <TextField.Root {...register("name")} placeholder="Imię" size="3" />
          {errors.name && (
            <span style={{ color: "red", fontSize: "14px" }}>
              {errors.name.message}
            </span>
          )}
        </div>

        <div style={{ marginBottom: "16px" }}>
          <TextField.Root
            {...register("email")}
            type="email"
            placeholder="Email"
            size="3"
          />
          {errors.email && (
            <span style={{ color: "red", fontSize: "14px" }}>
              {errors.email.message}
            </span>
          )}
        </div>

        <div style={{ marginBottom: "16px" }}>
          <TextField.Root
            {...register("password")}
            type="password"
            placeholder="Hasło"
            size="3"
          />
          {errors.password && (
            <span style={{ color: "red", fontSize: "14px" }}>
              {errors.password.message}
            </span>
          )}
        </div>

        <div style={{ marginBottom: "16px" }}>
          <TextField.Root
            {...register("confirmPassword")}
            type="password"
            placeholder="Potwierdź hasło"
            size="3"
          />
          {errors.confirmPassword && (
            <span style={{ color: "red", fontSize: "14px" }}>
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          size="3"
          style={{ width: "100%" }}
        >
          {isSubmitting ? "Rejestracja..." : "Zarejestruj się"}
        </Button>
      </form>
    </div>
  );
}
