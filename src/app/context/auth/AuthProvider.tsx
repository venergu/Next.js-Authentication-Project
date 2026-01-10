"use client";
import React, { useState, useEffect, ReactNode } from "react";
import { AuthContext, AuthContextType } from "./AuthContext";
import { AuthApi } from "../../lib/auth/api";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loginName, setLoginName] = useState<string | null>(null);

  useEffect(() => {
    AuthApi.getCurrentUser()
      .then((user) => {
        if (user) {
          setIsLoggedIn(true);
          setLoginName(user.loginName || user.name);
        }
      })
      .catch(() => {
        setIsLoggedIn(false);
        setLoginName(null);
      });
  }, []);

  const login = async (loginStr: string, pwdStr: string) => {
    const data = await AuthApi.login(loginStr, pwdStr);
    setIsLoggedIn(data.isLoggedIn);
    setLoginName(data.name || data.loginName);
  };

  const logout = async () => {
    await AuthApi.logout();
    setIsLoggedIn(false);
    setLoginName(null);
  };

  const value: AuthContextType = { isLoggedIn, loginName, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
