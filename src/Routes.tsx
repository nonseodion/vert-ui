import React from "react"
import { Route, Routes } from "react-router-dom"
import SignInWithEmail from "./pages/auth/SignInWithEmail"
import Home from "./pages/main/Home"
import { routes } from "./utils/constants"

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path={routes.home} element={<Home />} />
    <Route path={routes.sign_in_with_email} element={<SignInWithEmail />} />
  </Routes>
)

export default AppRoutes
