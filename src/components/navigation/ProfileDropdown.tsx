import React from "react"
import { useNavigate } from "react-router-dom"
import { ReactComponent as Profile } from "../../assets/icons/profile.svg"
import { ReactComponent as Retry } from "../../assets/icons/retry-white.svg"
import { ReactComponent as Settings } from "../../assets/icons/settings-white.svg"
import { ReactComponent as SignOut } from "../../assets/icons/sign-out.svg"
import useAuth from "../../hooks/useAuth"
import { routes } from "../../utils/constants"
import { doNothing, handleProfileDropdown } from "../../utils/functions"
import Button from "../general/Button"

export default function ProfileDropdown() {
  const { user, logOut } = useAuth()
  const navigate = useNavigate()
  const links = [
    { icon: <Profile />, text: "Profile", page: routes.profile_settings },
    {
      icon: <Retry />,
      text: "Transactions",
    },
    {
      icon: <Settings />,
      text: "Account settings",
      page: routes.profile_settings,
    },
    {
      icon: <SignOut />,
      text: "Sign out",
      onClick: () => {
        logOut()
        navigate(routes.home)
      },
    },
  ]

  const onClick = (page: string) => {
    navigate(page)
    handleProfileDropdown("hide")
  }

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="opacity-0 transition-all duration-150 pointer-events-none absolute backdrop-blur-[5px] top-[120px] rounded-3xl right-4 lg:right-[77px] w-[283px] bg-[#292929]/[.62] profile-dropdown p-[30px] py-8"
    >
      <p className="text-primary font-medium text-base">
        Hello {user?.username}!
      </p>
      <ul className="mt-4 mb-8 flex flex-col space-y-4">
        {links.map((link) => (
          <li key={link.text}>
            <button
              type="button"
              onClick={() =>
                link.onClick
                  ? link.onClick()
                  : link.page
                  ? onClick(link.page)
                  : doNothing()
              }
              className="h-11 space-x-[15px] flex items-center"
            >
              {link.icon}
              <span className="text-white font-medium text-xl leading-[30px]">
                {link.text}
              </span>
            </button>
          </li>
        ))}
      </ul>
      <Button
        text="Manage Wallets"
        background="transparent"
        textColor="white"
        className="text-[13px]"
        bordered
        fullWidth
        onClick={() => onClick(routes.manage_wallets)}
      />
    </div>
  )
}
