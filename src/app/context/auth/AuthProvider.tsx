"use client";
import { useState, useEffect, ReactNode } from "react";
import { AuthContext, AuthContextType } from "./AuthContext";
import { AuthApi } from "../../lib/auth/api";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<{ name: string } | null>(null);

  useEffect(() => {
    AuthApi.getCurrentUser()
      .then((user) => {
        if (user) setUser({ name: user.name });
      })
      .catch(() => {
        setUser(null);
      });
  }, []);

  const login = async (login: string, password: string) => {
    const user = await AuthApi.login(login, password);
    setUser({ name: user.name });
  };

  const logout = async () => AuthApi.logout();

  const value: AuthContextType = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
