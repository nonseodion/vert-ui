import { BigintIsh, JSBI } from "@pancakeswap/sdk"
import { getAddress } from "ethers/lib/utils"
import { memoize } from "lodash"

export const doNothing = (): void => {}

type ActionType = "show" | "hide" | "toggle"

export const handleDropdown = (elementSelector: string, action: ActionType) => {
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
  handleDropdown(".profile-dropdown", action)

export const handleMobileNavDropdown = (action: ActionType) =>
  handleDropdown(".mobile-navigator-dropdown", action)

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
