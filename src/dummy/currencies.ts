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
  selected_bank: { value: string; label: string }
}

export const banks: OptionType[] = [
  { label: "Access Bank", value: "Access Bank" },
  { label: "Access Bank (Diamond)", value: "Access Bank (Diamond)" },
  { label: "ALAT by WEMA", value: "ALAT by WEMA" },
  { label: "ASO Savings and Loans", value: "ASO Savings and Loans" },
  { label: "Bowen Microfinance Bank", value: "Bowen Microfinance Bank" },
  { label: "CEMCS Microfinance Bank", value: "CEMCS Microfinance Bank" },
  { label: "Citibank Nigeria", value: "Citibank Nigeria" },
  { label: "Ecobank Nigeria", value: "Ecobank Nigeria" },
  { label: "Ekondo Microfinance Bank", value: "Ekondo Microfinance Bank" },
  { label: "Fidelity Bank", value: "Fidelity Bank" },
  { label: "First Bank of Nigeria", value: "First Bank of Nigeria" },
  {
    label: "First City Monument Bank",
    value: "First City Monument Bank",
    aliases: ["fcmb"],
  },
  { label: "Globus Bank", value: "Globus Bank" },
  {
    label: "Guaranty Trust Bank",
    value: "Guaranty Trust Bank",
    aliases: ["gtb"],
  },
  { label: "Hasal Microfinance Bank", value: "Hasal Microfinance Bank" },
  { label: "Heritage Bank", value: "Heritage Bank" },
  { label: "Jaiz Bank", value: "Jaiz Bank" },
  { label: "Keystone Bank", value: "Keystone Bank" },
  { label: "Kuda Bank", value: "Kuda Bank" },
  { label: "One Finance", value: "One Finance" },
  { label: "Paga", value: "Paga" },
  { label: "Parallex Bank", value: "Parallex Bank" },
  { label: "PayCom", value: "PayCom" },
  { label: "Polaris Bank", value: "Polaris Bank" },
  { label: "Providus Bank", value: "Providus Bank" },
  { label: "Rubies MFB", value: "Rubies MFB" },
  { label: "Sparkle Microfinance Bank", value: "Sparkle Microfinance Bank" },
  { label: "Stanbic IBTC Bank", value: "Stanbic IBTC Bank" },
  { label: "Standard Chartered Bank", value: "Standard Chartered Bank" },
  { label: "Sterling Bank", value: "Sterling Bank" },
  { label: "Suntrust Bank", value: "Suntrust Bank" },
  { label: "TAJ Bank", value: "TAJ Bank" },
  { label: "TCF MFB", value: "TCF MFB" },
  { label: "Titan Trust Bank", value: "Titan Trust Bank" },
  { label: "Union Bank of Nigeria", value: "Union Bank of Nigeria" },
  {
    label: "United Bank For Africa",
    value: "United Bank For Africa",
    aliases: ["uba"],
  },
  { label: "Unity Bank", value: "Unity Bank" },
  { label: "VFD", value: "VFD" },
  { label: "Wema Bank", value: "Wema Bank" },
  { label: "Zenith Bank", value: "Zenith Bank" },
]
