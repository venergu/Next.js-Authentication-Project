import { Env } from "./Env";

export const Config = {
  jwt: {
    secret: Env.get("JWT_SECRET"),
  },
  user: {
    credentials: {
      login: Env.get("LOGIN"),
      password: Env.get("PASSWORD"),
    },
  },
  database: {
    host: Env.get("HOST"),
    user: Env.get("USER"),
    password: Env.get("PASSWORD"),
    database: Env.get("DATABASE"),
  },
} as const;
