export const AuthApi = {
  async getCurrentUser(): Promise<AuthUserResponse> {
    const response = await fetch("/api/login");
    const data = await response.json();
    return data;
  },

  async login(email: string, password: string): Promise<AuthUserResponse> {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Błąd logowania");
    }

    const data = await response.json();
    return data;
  },

  async logout() {
    await fetch("/api/logout", { method: "POST" });
  },
};

type AuthUserResponse = {
  user?: {
    id: number;
    name: string;
    email: string;
  };
  message?: string;
  error?: string;
};
