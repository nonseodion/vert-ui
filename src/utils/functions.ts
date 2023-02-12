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
  document.body.style.overflowY = action === "enable" ? "visible" : "hidden"
}
