import { createContext } from "react"
import { doNothing } from "../utils/functions"

export interface AuthStateValues {
  isAuthenticated: boolean
}

export interface AuthContextValues {
  authState: AuthStateValues
  setAuthState: React.Dispatch<React.SetStateAction<AuthStateValues>>
}

const AuthContext = createContext<AuthContextValues>({
  authState: { isAuthenticated: false },
  setAuthState: doNothing,
})

export default AuthContext
