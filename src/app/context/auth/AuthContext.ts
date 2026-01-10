"use client";
import { createContext } from "react";

export interface AuthContextType {
  isLoggedIn: boolean;
  loginName: string | null;
  login: (login: string, pwd: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
