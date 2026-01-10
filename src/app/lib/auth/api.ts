export const AuthApi = {
  async getCurrentUser() {
    const response = await fetch("/api/login");
    const data = await response.json();
    return data.user;
  },

  async login(login: string, password: string) {
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
