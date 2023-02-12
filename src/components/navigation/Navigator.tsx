import React from "react"
import clsx from "classnames"
import { useNavigate, NavLink } from "react-router-dom"
import { ReactComponent as Dropdown } from "../../assets/icons/dropdown.svg"
import { ReactComponent as Profile } from "../../assets/icons/profile.svg"
import { ReactComponent as Wallet } from "../../assets/icons/wallet.svg"
import { ReactComponent as Bank } from "../../assets/icons/bank.svg"
import { ReactComponent as Currency } from "../../assets/icons/currency.svg"
import { ReactComponent as USD } from "../../assets/icons/usd.svg"
import { ReactComponent as Security } from "../../assets/icons/security.svg"
import { routes } from "../../utils/constants"
import { handleMobileNavDropdown } from "../../utils/functions"

interface MobileNavigatorProps {
  currPage:
    | "Profile"
    | "Settings"
    | "Wallet"
    | "Bank Accounts"
    | "Default Currency"
    | "Security"
}

const navigatorLinks = [
  { route: routes.profile_settings, text: "Profile" },
  { route: routes.manage_wallets, text: "Wallet" },
  { route: routes.profile_settings, text: "Bank Accounts" },
  { route: routes.profile_settings, text: "Default Currency" },
  { route: routes.profile_settings, text: "Security" },
]

export default function MobileNavigator({ currPage }: MobileNavigatorProps) {
  const navigate = useNavigate()
  return (
    <div>
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
        <NavLink
          to={routes.profile_settings}
          className={({ isActive }) =>
            clsx(
              "flex items-center h-11 space-x-[15px] text-white/[.4] stroke-white/[.4]",
              { "!stroke-white !text-white": isActive }
            )
          }
        >
          <Profile className="h-4 w-4" />
          <span className="font-medium text-xl">Profile</span>
        </NavLink>
        <NavLink
          to={routes.manage_wallets}
          className={({ isActive }) =>
            clsx(
              "flex items-center h-11 space-x-[15px] text-white/[.4] stroke-white/[.4]",
              { "!stroke-white !text-white": isActive }
            )
          }
        >
          <Wallet />
          <span className="font-medium text-xl">Wallet</span>
        </NavLink>
        <NavLink
          to={routes.profile_settings}
          className={({ isActive }) =>
            clsx(
              "flex items-center h-11 space-x-[15px] text-white/[.4] stroke-white/[.4]",
              { "!stroke-white !text-white": isActive }
            )
          }
        >
          <Bank />
          <span className="font-medium text-xl">Bank accounts</span>
        </NavLink>
        <NavLink
          to={routes.profile_settings}
          className={() =>
            clsx(
              "flex items-center h-11 space-x-[15px] text-white/[.4]"
              // { "!stroke-white !text-white": isActive }
            )
          }
        >
          <Currency />
          <span className="font-medium text-xl">Default Currency</span>
          <div className="px-[6px] h-6 bg-white/[.15] rounded-lg flex items-center space-x-[2px]">
            <USD />
            <span className="text-[#B0B0B0] text-[8px] font-semibold">USD</span>
          </div>
        </NavLink>
        <NavLink
          to={routes.profile_settings}
          className={({ isActive }) =>
            clsx("flex items-center h-11 space-x-[15px] text-white/[.4]", {
              "!stroke-white !text-white": isActive,
            })
          }
        >
          <Security />
          <span className="font-medium text-xl">Security</span>
        </NavLink>
      </div>
    </div>
  )
}
