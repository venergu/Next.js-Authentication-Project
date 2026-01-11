export const AuthApi = {
  async getCurrentUser(): Promise<CurrentUserSuccessfulResponse["user"]> {
    const response = await fetch("/api/login");
    const data = await response.json();
    return data.user;
  },

  async login(
    login: string,
    password: string
  ): Promise<LoginSuccessfulResponse> {
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

type LoginSuccessfulResponse = {
  success: true;
  message: string;
  name: string;
};

type CurrentUserSuccessfulResponse = {
  user: {
    name: string;
  };
};
