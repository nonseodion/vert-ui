import { BigintIsh, JSBI } from "@pancakeswap/sdk"

export const doNothing = (): void => {}

export const handleProfileDropdown = (
  action: "show" | "hide" | "toggle" = "show"
) => {
  const el = document.querySelector(".profile-dropdown")
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

export const handleBodyScroll = (action: "enable" | "disable" = "enable") => {
  document.body.style.overflowY = action === "enable" ? "visible" : "hidden"
}

export function parseBigintIsh(bigintIsh: BigintIsh): JSBI {
  return bigintIsh instanceof JSBI ? bigintIsh : JSBI.BigInt(bigintIsh)
}
