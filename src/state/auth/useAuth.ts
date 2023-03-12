import { useContext } from "react"
import AuthContext from "../../contexts/AuthContext"
import useWallet from "./useWallet"

const useAuth = () => {
  const { authState, setAuthState } = useContext(AuthContext)
  const { connected, disconnect } = useWallet()

  const updateAuthState = (data: object) =>
    setAuthState({ ...authState, ...data })

  const authenticateUser = () =>
    updateAuthState({
      isAuthenticated: true,
      user: { username: "sketchbreezy" },
    })

  const logOut = disconnect

  return {
    isAuthenticated: connected,
    user: { username: "nonseodion" },
    updateAuthState,
    authenticateUser,
    logOut,
  }
}

export default useAuth
