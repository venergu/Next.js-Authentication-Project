import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export function useLogout() {
  const { setIsLoggedIn } = useContext(AuthContext);

  const logout = async () => {
    fetch("/api/logout", { method: "POST" });
    setIsLoggedIn(false);
  };
  return logout;
}
