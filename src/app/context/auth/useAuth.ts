"use client";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("Auth Context must be used within Provider!");
  }

  return context;
}
