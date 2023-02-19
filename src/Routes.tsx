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
import { PageRoutes } from "./utils/constants"

export default function AppRoutes() {
  return (
    <Routes>
      <Route path={PageRoutes.home} element={<Home />} />
      <Route
        path={PageRoutes.sign_in_with_email}
        element={<SignInWithEmail />}
      />
      <Route
        path={PageRoutes.sign_up_with_email}
        element={<SignUpWithEmail />}
      />
      <Route
        path={PageRoutes.sign_up_with_wallet}
        element={<SignUpWithWallet />}
      />
      <Route
        path={PageRoutes.email_verification}
        element={<EmailVerification />}
      />
      <Route
        path={PageRoutes.profile_settings}
        element={
          <ProtectedRoute>
            <ProfileSettings />
          </ProtectedRoute>
        }
      />
      <Route
        path={PageRoutes.manage_wallets}
        element={
          <ProtectedRoute>
            <ManageWallets />
          </ProtectedRoute>
        }
      />
      <Route
        path={PageRoutes.default_currency}
        element={
          <ProtectedRoute>
            <DefaultCurrency />
          </ProtectedRoute>
        }
      />
      <Route
        path={PageRoutes.bank_accounts}
        element={
          <ProtectedRoute>
            <BankAccounts />
          </ProtectedRoute>
        }
      />
      <Route
        path={PageRoutes.security_settings}
        element={
          <ProtectedRoute>
            <SecuritySettings />
          </ProtectedRoute>
        }
      />
      <Route
        path={PageRoutes.change_password}
        element={
          <ProtectedRoute>
            <ChangePassword />
          </ProtectedRoute>
        }
      />
      <Route
        path={PageRoutes.manage_token_approvals}
        element={
          <ProtectedRoute>
            <ManageTokenApprovals />
          </ProtectedRoute>
        }
      />
      <Route
        path={PageRoutes.set_password}
        element={
          <ProtectedRoute>
            <SetPassword />
          </ProtectedRoute>
        }
      />
      <Route
        path={PageRoutes.transactions}
        element={
          <ProtectedRoute>
            <TransactionList />
          </ProtectedRoute>
        }
      />
      <Route
        path={PageRoutes.transaction_detail}
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
