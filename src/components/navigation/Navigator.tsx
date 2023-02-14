import React, { useMemo } from "react"
import clsx from "classnames"
import { useNavigate, NavLink, useLocation } from "react-router-dom"
import { ReactComponent as Dropdown } from "../../assets/icons/dropdown.svg"
import { ReactComponent as Profile } from "../../assets/icons/profile.svg"
import { ReactComponent as Wallet } from "../../assets/icons/wallet.svg"
import { ReactComponent as Bank } from "../../assets/icons/bank.svg"
import { ReactComponent as Currency } from "../../assets/icons/currency.svg"
import { ReactComponent as Security } from "../../assets/icons/security.svg"
import { routes } from "../../utils/constants"
import { handleMobileNavDropdown } from "../../utils/functions"
import ActiveCurrency from "./ActiveCurrency"

const navigatorLinks = [
  { route: routes.profile_settings, text: "Profile", icon: <Profile /> },
  { route: routes.manage_wallets, text: "Wallet", icon: <Wallet /> },
  { route: routes.bank_accounts, text: "Bank Accounts", icon: <Bank /> },
  {
    route: routes.default_currency,
    text: "Default Currency",
    icon: <Currency />,
    extra: <ActiveCurrency />,
  },
  { route: routes.profile_settings, text: "Security", icon: <Security /> },
]

export default function MobileNavigator() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const currPage = useMemo(() => {
    const activeLink = navigatorLinks.find((link) => link.route === pathname)
    if (activeLink) {
      return activeLink.text
    }
    return ""
  }, [pathname])

  return (
    <div className="flex flex-col space-y-[30px] lg:fixed flex-shrink-0 lg:min-w-[247px]">
      <h3 className="font-bold text-2xl text-white lg:text-[40px]">
        My Account
      </h3>
      <div className="relative lg:hidden">
        <button
          onClick={(e) => {
            e.stopPropagation()
            handleMobileNavDropdown("toggle")
          }}
          type="button"
          className="w-[231px] bg-primary/[.25] h-10 flex items-center justify-between rounded-xl px-[18px]"
        >
          <span className="text-[15px] text-white font-medium">{currPage}</span>
          <div className="flex-shrink-0 ml-1 flex items-center justify-center">
            <Dropdown className="w-[11.18px] h-[6.59px]" />
          </div>
        </button>
        <ul className="absolute transition-all duration-150 opacity-0 pointer-events-none bottom-[-260px] z-[2] w-[231px] px-[17px] bg-[#292929] rounded-[4px] py-[19px] mobile-navigator-dropdown flex flex-col space-y-3">
          {navigatorLinks.map((link) => (
            <li key={link.text}>
              <button
                onClick={() => {
                  navigate(link.route)
                  handleMobileNavDropdown("hide")
                }}
                type="button"
                className="h-[30px] w-full outline-none border-none text-left"
              >
                <span className="text-white text-base">{link.text}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="hidden lg:flex flex-col space-y-3">
        {navigatorLinks.map((link) => (
          <NavLink
            key={`${link.route}-${link.text}`}
            to={link.route}
            className={({ isActive }) =>
              clsx(
                "flex items-center h-11 space-x-[15px] text-white/[.4] inactive-link",
                { "active-link !text-white": isActive }
              )
            }
          >
            {link.icon}
            <span className="font-medium text-xl">{link.text}</span>
            {link.extra && link.extra}
          </NavLink>
        ))}
      </div>
    </div>
  )
}
