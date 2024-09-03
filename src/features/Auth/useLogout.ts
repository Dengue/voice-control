import { useContext } from "react"
import { UserContext } from "../User/UserProvider"

export const useLogout = () => {
  const { clearUser } = useContext(UserContext);

  return () => {
    clearUser();
    localStorage.removeItem("user");
  }
}