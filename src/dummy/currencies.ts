import BNB from "../assets/icons/bnb.png"
import NGN from "../assets/icons/ngn.png"
import USD from "../assets/icons/usd.png"
import metamask from "../assets/icons/metamask.png"
import { OptionType } from "../components/inputs/Select"

export const sellableCurrencies = [
  { label: "BNB", icon: BNB },
  { label: "BNB", icon: BNB },
]
export const buyableCurrencies = [{ label: "NGN", icon: NGN }]

export const userFiatCurrencies = [
  { label: "NGN", name: "Nigerian Naira", icon: NGN, is_connected: false },
  { label: "USD", name: "US Dollar", icon: USD, is_connected: true },
]

export const userWallets = [
  { icon: metamask, address: "0x6810...9268", is_connected: true },
  { icon: null, address: "0x6810...9368" },
  { icon: null, address: "0x6810...9468" },
]

export interface BankAccountDetails {
  account_number: string
  account_name: string
  bank_name: string
}

export const banks: OptionType[] = [
  { label: "9 Payment Service ", value: "9 Payment Service " },
  { label: "Access Bank Nigeria", value: "Access Bank Nigeria" },
  { label: "Access Mobile", value: "Access Mobile" },
  { label: "Access Money", value: "Access Money" },
  { label: "Alert MFB", value: "Alert MFB" },
]
