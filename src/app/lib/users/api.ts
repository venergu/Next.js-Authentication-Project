import type { User } from "./types";

export const UserApi = {
  async getUsers(): Promise<User[]> {
    const res = await fetch("/api/users", {
      headers: { "x-frontend-request": "true" },
    });

    if (!res.ok) throw new Error("Response was not ok.");

    return await res.json();
  },
};
