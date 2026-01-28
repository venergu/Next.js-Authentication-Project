import type { User } from "./types";

export const UserApi = {
  async getUsers(): Promise<User[]> {
    const res = await fetch("/api/users", {
      headers: { "x-frontend-request": "true" },
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(
        `Response was not ok. Status: ${res.status}, Message: ${text}`,
      );
    }

    const data: User[] = await res.json();
    return data;
  },
};
