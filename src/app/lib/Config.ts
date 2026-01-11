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
} as const;
