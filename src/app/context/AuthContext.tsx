"use client";
import { createContext, useState, useEffect, ReactNode, Dispatch, SetStateAction } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetch("api/check-login")
      .then((res) => res.json())
      .then((data) => setIsLoggedIn(data.isLoggedIn))
      .catch(() => setIsLoggedIn(false));
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}
