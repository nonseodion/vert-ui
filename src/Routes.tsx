import React from "react"
import { Route, Routes } from "react-router-dom"
import {
  SignInWithEmail,
  SignUpWithEmail,
  SignUpWithWallet,
  EmailVerification,
} from "./pages/auth"
import Home from "./pages/main/Home"
import NotFound from "./pages/utils/NotFound"
import { routes } from "./utils/constants"

export default function AppRoutes() {
  return (
    <Routes>
      <Route path={routes.home} element={<Home />} />
      <Route path={routes.sign_in_with_email} element={<SignInWithEmail />} />
      <Route path={routes.sign_up_with_email} element={<SignUpWithEmail />} />
      <Route path={routes.sign_up_with_wallet} element={<SignUpWithWallet />} />
      <Route path={routes.email_verification} element={<EmailVerification />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
