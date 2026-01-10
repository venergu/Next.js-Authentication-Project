"use client";
import { useAuth } from "../context/auth/useAuth";

export function useLogout() {
  const { logout } = useAuth();
  return logout;
}
