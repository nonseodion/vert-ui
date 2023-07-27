import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import useAuth from "../../state/auth/useAuth"
import { PageRoutes } from "../../utils/constants"

interface ProtectedRouteProps {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(PageRoutes.HOME)
    }
  }, [navigate, isAuthenticated])

  if (isAuthenticated) return <div>{children}</div>
  return <div />
}
