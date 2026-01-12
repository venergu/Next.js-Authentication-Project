export const AuthApi = {
  async getCurrentUser(): Promise<AuthUserResponse> {
    const response = await fetch("/api/login");
    const data = await response.json();
    return data;
  },

  async login(login: string, password: string): Promise<AuthUserResponse> {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login, password }),
    });

    const data = await response.json();

    return data;
  },

  async logout() {
    await fetch("/api/logout", { method: "POST" });
  },
};

type AuthUserResponse = {
  name: string;
};
