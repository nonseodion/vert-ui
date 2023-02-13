import { useContext } from "react"
import AuthContext from "../contexts/AuthContext"

const useAuth = () => {
  const { authState, setAuthState } = useContext(AuthContext)

  const updateAuthState = (data: object) =>
    setAuthState({ ...authState, ...data })

  const authenticateUser = () =>
    updateAuthState({
      isAuthenticated: true,
      user: { username: "sketchbreezy" },
    })

  const logOut = () => updateAuthState({ isAuthenticated: false, user: null })

  return {
    isAuthenticated: authState.isAuthenticated,
    user: authState.user,
    updateAuthState,
    authenticateUser,
    logOut,
  }
}

export default useAuth
