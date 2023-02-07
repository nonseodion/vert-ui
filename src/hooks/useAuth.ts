import { useContext } from "react"
import AuthContext from "../contexts/AuthContext"

const useAuth = () => {
  const {
    authState: { isAuthenticated },
  } = useContext(AuthContext)

  return {
    isAuthenticated,
  }
}

export default useAuth
