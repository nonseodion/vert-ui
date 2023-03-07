import { Location, NavigateFunction } from "react-router-dom"
import { PageRoutes } from "./constants"

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

export const hideAllHideables = () => {
  handleProfileDropdown("hide")
  handleMobileNavDropdown("hide")
  handleConverterDropdown("hide")
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

export const getRandomBoolean = () => Math.random() < 0.5
