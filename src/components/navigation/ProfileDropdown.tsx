import React from "react"
import { useNavigate } from "react-router-dom"
import { ReactComponent as Profile } from "../../assets/icons/profile.svg"
import { ReactComponent as History } from "../../assets/icons/history.svg"
import { ReactComponent as Settings } from "../../assets/icons/settings-white.svg"
import { ReactComponent as SignOut } from "../../assets/icons/sign-out.svg"
import { ReactComponent as PowerSwitch } from "../../assets/icons/power-switch.svg"
import { ReactComponent as Copy } from "../../assets/icons/copy.svg"
import metamask from "../../assets/icons/metamask.png"
import { useAuth } from "../../hooks"
import { PageRoutes } from "../../utils/constants"
import { handleProfileDropdown } from "../../utils/functions"

interface ProfileDropdownLink {
  icon: JSX.Element
  text: string
  page?: string
  onClick?: () => void
}

export default function ProfileDropdown() {
  const { user, logOut } = useAuth()
  const navigate = useNavigate()

  const signUserOut = () => {
    logOut()
    navigate(PageRoutes.HOME)
  }

  const links: ProfileDropdownLink[] = [
    {
      icon: <Profile className="fill-white" />,
      text: "Profile",
      page: PageRoutes.PROFILE_SETTINGS,
    },
    {
      icon: <History />,
      text: "Transactions",
      page: PageRoutes.TRANSACTIONS,
    },
    {
      icon: <Settings />,
      text: "Account settings",
      page: PageRoutes.PROFILE_SETTINGS,
    },
    {
      icon: <SignOut />,
      text: "Sign out",
      onClick: signUserOut,
    },
  ]

  const onClick = (page: string) => {
    navigate(page)
    handleProfileDropdown("hide")
  }

  const onLinkClick = (link: ProfileDropdownLink) => {
    if (link.onClick) {
      link.onClick()
      return
    }
    if (link.page) {
      onClick(link.page)
    }
  }

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      role="presentation"
      className="opacity-0 transition-all duration-150 pointer-events-none absolute backdrop-blur-[5px] top-[95px] lg:top-[120px] rounded-3xl right-4 lg:right-[77px] w-[320px] mobile:w-[370px] bg-[#292929]/[.62] profile-dropdown px-[30px] pt-8 pb-[41.19px] z-[3]"
    >
      <p className="text-primary font-medium text-base">
        Hello {user?.username}!
      </p>
      <ul className="mt-4 mb-[27px] flex flex-col space-y-4">
        {links.map((link) => (
          <li key={link.text}>
            <button
              type="button"
              onClick={() => onLinkClick(link)}
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
      <div className="flex mb-[13px]">
        <button
          type="button"
          onClick={() => onClick(PageRoutes.MANAGE_WALLETS)}
          className="text-white/[.6] ml-auto font-medium text-13"
        >
          Manage Wallets
        </button>
      </div>
      <div className="flex py-[13px] px-3 border-[0.25px] justify-between border-primary rounded-xl">
        <div className="flex items-center space-x-3">
          <div className="h-7 w-7 rounded-full bg-[#FFD3A2] flex items-center justify-center">
            <img src={metamask} alt="Metmask logo" />
          </div>
          <div className="flex flex-col space-y-[9.5px]">
            <div className="flex space-x-2 items-center">
              <span className="text-white font-medium text-[15px] leading-4">
                0x6810...9568
              </span>
              <Copy className="stroke-lightBlue" />
            </div>
            <div className="flex space-x-1 items-center">
              <div className="h-2 w-2 rounded-full bg-brightGreen" />
              <span className="text-[11.13px] text-white leading-4">
                connected
              </span>
            </div>
          </div>
        </div>
        <button
          className="bg-primary/[.16] h-10 w-10 flex items-center justify-center rounded-xl"
          type="button"
          onClick={signUserOut}
        >
          <PowerSwitch />
        </button>
      </div>
    </div>
  )
}
