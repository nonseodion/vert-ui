import { createContext } from "react"
import { doNothing } from "../utils/functions"

export interface UserDetails {
  username: string
}

export interface AuthStateValues {
  isAuthenticated: boolean
  user: UserDetails | null
}

export interface AuthContextValues {
  authState: AuthStateValues
  setAuthState: React.Dispatch<React.SetStateAction<AuthStateValues>>
}

const AuthContext = createContext<AuthContextValues>({
  authState: { isAuthenticated: false, user: null },
  setAuthState: doNothing,
})

export default AuthContext
