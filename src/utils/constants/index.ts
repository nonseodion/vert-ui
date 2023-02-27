import { JSBI, Percent, Token } from "@pancakeswap/sdk"
import { ChainId } from "../config"

export const routes = {
  home: "/",
  sign_in_with_email: "/sign-in/email",
  sign_up_with_email: "/sign-up/email",
  sign_up_with_wallet: "/sign-up/wallet",
  email_verification: "/verify-email",
  profile_settings: "/settings/profile",
  manage_wallets: "/settings/wallet",
  default_currency: "/settings/default-currency",
  bank_accounts: "/settings/bank-accounts",
  security_settings: "/settings/security",
  change_password: "/settings/security/change-password",
  set_password: "/settings/security/set-password",
  manage_token_approvals: "/settings/security/manage-token-approvals",
}

export const modals = {
  connect_wallet: "connect_wallet",
  token_modal: "token_modal",
  bank_account: "bank_account",
  remove_token_approval: "remove_token_approval",
  unlink_wallet: "unlink_wallet",
}

export const BIPS_BASE = JSBI.BigInt(10000)
export const BETTER_TRADE_LESS_HOPS_THRESHOLD = new Percent(
  JSBI.BigInt(50),
  BIPS_BASE
)

export type ChainMap<T> = {
  readonly [id in ChainId]: T
}
export type ChainTokenList = ChainMap<Token[]>
