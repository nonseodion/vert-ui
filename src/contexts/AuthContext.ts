import { createContext } from "react"
import { AuthContextValues } from "../interfaces/auth"
import { doNothing } from "../utils/functions"

const AuthContext = createContext<AuthContextValues>({
  authState: { isAuthenticated: false },
  setAuthState: doNothing,
})

export default AuthContext
