import React from "react"
import { Route, Routes } from "react-router-dom"
import { ProtectedRoute } from "./components/navigation"
import {
  SignInWithEmail,
  SignUpWithEmail,
  SignUpWithWallet,
  EmailVerification,
} from "./pages/auth"
import Home from "./pages/main/Home"
import {
  BankAccounts,
  ChangePassword,
  DefaultCurrency,
  ManageTokenApprovals,
  ManageWallets,
  ProfileSettings,
  SecuritySettings,
  SetPassword,
} from "./pages/settings"
import { TransactionDetail, TransactionList } from "./pages/transactions"
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
      <Route
        path={routes.profile_settings}
        element={
          <ProtectedRoute>
            <ProfileSettings />
          </ProtectedRoute>
        }
      />
      <Route
        path={routes.manage_wallets}
        element={
          <ProtectedRoute>
            <ManageWallets />
          </ProtectedRoute>
        }
      />
      <Route
        path={routes.default_currency}
        element={
          <ProtectedRoute>
            <DefaultCurrency />
          </ProtectedRoute>
        }
      />
      <Route
        path={routes.bank_accounts}
        element={
          <ProtectedRoute>
            <BankAccounts />
          </ProtectedRoute>
        }
      />
      <Route
        path={routes.security_settings}
        element={
          <ProtectedRoute>
            <SecuritySettings />
          </ProtectedRoute>
        }
      />
      <Route
        path={routes.change_password}
        element={
          <ProtectedRoute>
            <ChangePassword />
          </ProtectedRoute>
        }
      />
      <Route
        path={routes.manage_token_approvals}
        element={
          <ProtectedRoute>
            <ManageTokenApprovals />
          </ProtectedRoute>
        }
      />
      <Route
        path={routes.set_password}
        element={
          <ProtectedRoute>
            <SetPassword />
          </ProtectedRoute>
        }
      />
      <Route
        path={routes.transactions}
        element={
          <ProtectedRoute>
            <TransactionList />
          </ProtectedRoute>
        }
      />
      <Route
        path={routes.transaction_detail}
        element={
          <ProtectedRoute>
            <TransactionDetail />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
