import React from "react"
import { Route, Routes } from "react-router-dom"
import { ProtectedRoute, UnProtectedRoute } from "./components/navigation"
import {
  SignInWithEmail,
  SignUpWithEmail,
  SignUpWithWallet,
  EmailVerification,
  ForgotPassword,
  ResetPassword,
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
import {
  TransactionDetail,
  TransactionList,
  SelectBankAccount,
  ProcessTransaction,
} from "./pages/transactions"
import Error from "./pages/utils/Error"
import NotFound from "./pages/utils/NotFound"
import { PageRoutes } from "./utils/constants"

export default function AppRoutes() {
  return (
    <Routes>
      <Route path={PageRoutes.HOME} element={<Home />} />
      <Route path={PageRoutes.ERROR} element={<Error />} />

      <Route
        path={PageRoutes.SIGN_IN_WITH_EMAIL}
        element={
          <UnProtectedRoute>
            <SignInWithEmail />
          </UnProtectedRoute>
        }
      />
      <Route
        path={PageRoutes.FORGOT_PASSWORD}
        element={
          <UnProtectedRoute>
            <ForgotPassword />
          </UnProtectedRoute>
        }
      />
      <Route
        path={PageRoutes.RESET_PASSWORD}
        element={
          <UnProtectedRoute>
            <ResetPassword />
          </UnProtectedRoute>
        }
      />
      <Route
        path={PageRoutes.SIGN_UP_WITH_EMAIL}
        element={
          <UnProtectedRoute>
            <SignUpWithEmail />
          </UnProtectedRoute>
        }
      />
      <Route
        path={PageRoutes.SIGN_UP_WITH_WALLET}
        element={
          <UnProtectedRoute>
            <SignUpWithWallet />
          </UnProtectedRoute>
        }
      />
      <Route
        path={PageRoutes.EMAIL_VERIFICATION}
        element={
          <UnProtectedRoute>
            <EmailVerification />
          </UnProtectedRoute>
        }
      />
      <Route
        path={PageRoutes.PROFILE_SETTINGS}
        element={
          <ProtectedRoute>
            <ProfileSettings />
          </ProtectedRoute>
        }
      />
      <Route
        path={PageRoutes.MANAGE_WALLETS}
        element={
          <ProtectedRoute>
            <ManageWallets />
          </ProtectedRoute>
        }
      />
      <Route
        path={PageRoutes.DEFAULT_CURRENCY}
        element={
          <ProtectedRoute>
            <DefaultCurrency />
          </ProtectedRoute>
        }
      />
      <Route
        path={PageRoutes.BANK_ACCOUNTS}
        element={
          <ProtectedRoute>
            <BankAccounts />
          </ProtectedRoute>
        }
      />
      <Route
        path={PageRoutes.SECURITY_SETTINGS}
        element={
          <ProtectedRoute>
            <SecuritySettings />
          </ProtectedRoute>
        }
      />
      <Route
        path={PageRoutes.CHANGE_PASSWORD}
        element={
          <ProtectedRoute>
            <ChangePassword />
          </ProtectedRoute>
        }
      />
      <Route
        path={PageRoutes.MANAGE_TOKEN_APPROVALS}
        element={
          <ProtectedRoute>
            <ManageTokenApprovals />
          </ProtectedRoute>
        }
      />
      <Route
        path={PageRoutes.SET_PASSWORD}
        element={
          <ProtectedRoute>
            <SetPassword />
          </ProtectedRoute>
        }
      />
      <Route
        path={PageRoutes.TRANSACTIONS}
        element={
          <ProtectedRoute>
            <TransactionList />
          </ProtectedRoute>
        }
      />
      <Route
        path={PageRoutes.TRANSACTION_DETAIL}
        element={
          <ProtectedRoute>
            <TransactionDetail />
          </ProtectedRoute>
        }
      />
      <Route
        path={PageRoutes.SELECT_BANK_ACCOUNT}
        element={
          <ProtectedRoute>
            <SelectBankAccount />
          </ProtectedRoute>
        }
      />
      <Route
        path={PageRoutes.PROCESS_TRANSACTION}
        element={
          <ProtectedRoute>
            <ProcessTransaction />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
