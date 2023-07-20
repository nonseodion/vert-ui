import {
  BigintIsh,
  Currency,
  CurrencyAmount,
  ERC20Token,
  JSBI,
} from "@pancakeswap/sdk"
import { getAddress } from "ethers/lib/utils"
import Big from "big.js"
import { memoize } from "lodash"
import { Location, NavigateFunction } from "react-router-dom"
import { PageRoutes } from "./constants"
import { ChainId } from "./config"
import { Bank } from "../services/banks"

export const doNothing = (): void => {}

type ActionType = "show" | "hide" | "toggle"

export const handleHideAbleElement = (
  elementSelector: string,
  action: ActionType
) => {
  const el = document.querySelector(elementSelector)
  if (!el) return
  if (action === "toggle") {
    if (el.classList.contains("active")) {
      el.classList.remove("active")
    } else {
      el.classList.add("active")
    }
    return
  }
  if (action === "hide") {
    el.classList.remove("active")
  } else {
    el.classList.add("active")
  }
}

export const handleProfileDropdown = (action: ActionType) =>
  handleHideAbleElement(".profile-dropdown", action)

export const handleMobileNavDropdown = (action: ActionType) =>
  handleHideAbleElement(".mobile-navigator-dropdown", action)

export const handleConverterDropdown = (action: ActionType) =>
  handleHideAbleElement(".converter-currency-select", action)

export const handleCurrencySelectDropdown = (action: ActionType) =>
  handleHideAbleElement(".currency-select", action)

export const hideAllHideables = () => {
  handleProfileDropdown("hide")
  handleMobileNavDropdown("hide")
  handleConverterDropdown("hide")
  handleCurrencySelectDropdown("hide")
}

export const handleBodyScroll = (action: "enable" | "disable" = "enable") => {
  const el = document.querySelector("html")
  if (el) {
    if (action === "enable") {
      el.classList.remove("hide-overflow")
    } else {
      el.classList.add("hide-overflow")
    }
  }
}

export function parseBigintIsh(bigintIsh: BigintIsh): JSBI {
  return bigintIsh instanceof JSBI ? bigintIsh : JSBI.BigInt(bigintIsh)
}

export const isAddress = memoize((value: any): string | false => {
  try {
    return getAddress(value)
  } catch {
    return false
  }
})

export const shortenAddress = memoize((value: string): string => {
  const address = isAddress(value)
  if (!address) {
    return value
  }
  return `${address.slice(0, 5)}...${address.slice(-3)}`
})

export const canGoBack = (location: Location) => location.key !== "default"

export const goBackConditionally = (
  navigate: NavigateFunction,
  location: Location,
  page: PageRoutes
) => {
  if (canGoBack(location)) {
    navigate(-1)
    return
  }
  navigate(page)
}

const mapping = {
  [ChainId.BSC]: "smartchain",
  [ChainId.BSC_TESTNET]: "",
}

export const getTokenLogoURL = memoize(
  (token?: ERC20Token, chainId?: ChainId) => {
    if (token && chainId && mapping[chainId]) {
      return `https://assets-cdn.trustwallet.com/blockchains/${
        mapping[chainId] || ""
      }/assets/${getAddress(token.address)}/logo.png`
    }
    return undefined
  },
  (t) => `${t?.chainId}#${t?.address}`
)

export const getTokenLogoURLByAddress = memoize(
  (address?: string, chainId?: ChainId) => {
    if (address && chainId && mapping[chainId]) {
      return `https://assets-cdn.trustwallet.com/blockchains/${
        mapping[chainId]
      }/assets/${getAddress(address)}/logo.png`
    }
    return null
  },
  (address, chainId) => `${chainId}#${address}`
)
export const getRandomBoolean = () => Math.random() < 0.5

export const comparePasswords = (password1: string, password2: string) =>
  password1?.length > 0
    ? password1?.length > 0 && password2?.length > 0 && password1 === password2
    : true

export function setCurrencyAmountCurrency(
  currencyAmount: CurrencyAmount<Currency>,
  currency: Currency
) {
  const amount = new Big(currencyAmount.toExact().toString())
    .mul(10 ** currency.decimals)
    .toString()
  return CurrencyAmount.fromRawAmount(currency, amount)
}

export function checkBanks(query: string, banks: Bank[]) {
  const lowerQuery = query.toLowerCase()
  const selectedBank = banks.find(
    (bank) =>
      bank.label.toLowerCase().includes(lowerQuery) ||
      bank.aliases.map((alias) => alias.toLowerCase()).includes(lowerQuery)
  )

  return selectedBank
}
