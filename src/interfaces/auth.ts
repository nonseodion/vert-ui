export interface AuthStateValues {
  isAuthenticated: boolean
}

export interface AuthContextValues {
  authState: AuthStateValues
  setAuthState: React.Dispatch<React.SetStateAction<AuthStateValues>>
}
