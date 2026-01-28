import { Env } from "./Env";

export const Config = {
  jwt: {
    secret: Env.get("JWT_SECRET"),
  },
  user: {
    credentials: {
      login: Env.get("LOGIN"),
      password: Env.get("PASSWORD_USER"),
    },
  },
  database: {
    host: Env.get("DB_HOST"),
    user: Env.get("DB_USER"),
    port: Number(Env.get("DB_PORT")),
    password: Env.get("DB_PASSWORD"),
    database: Env.get("DB_DATABASE"),
  },
} as const;
