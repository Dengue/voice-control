import { useContext } from "react"
import { UserContext } from "../User/UserProvider"

export const useLogin = () => {
  const { setUser } = useContext(UserContext);

  return (user: Record<string, string>) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  }
}