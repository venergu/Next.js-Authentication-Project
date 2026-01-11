"use client";
import { useAuth } from "../context/auth/useAuth";

export const useLogout = () => useAuth().logout;
