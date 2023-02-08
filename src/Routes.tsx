import React from "react"
import { Route, Routes } from "react-router-dom"
import { SignInWithEmail, SignUpWithEmail } from "./pages/auth"
import Home from "./pages/main/Home"
import { routes } from "./utils/constants"

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path={routes.home} element={<Home />} />
    <Route path={routes.sign_in_with_email} element={<SignInWithEmail />} />
    <Route path={routes.sign_up_with_email} element={<SignUpWithEmail />} />
  </Routes>
)

export default AppRoutes
