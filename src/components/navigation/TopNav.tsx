import React, { useState } from "react"
import clsx from "classnames"
import { useNavigate, Link, useLocation } from "react-router-dom"
import { ReactComponent as Logo } from "../../assets/icons/logo.svg"
import { ReactComponent as Exit } from "../../assets/icons/exit.svg"
import { ReactComponent as Dropdown } from "../../assets/icons/dropdown.svg"
import { ReactComponent as Hamburger } from "../../assets/icons/hamburger.svg"
import { ReactComponent as User } from "../../assets/icons/user.svg"
import useAuth from "../../state/auth/useAuth"
import { Modals, PageRoutes } from "../../utils/constants"
import { handleProfileDropdown } from "../../utils/functions"
import Button from "../general/Button"
import ProfileDropdown from "./ProfileDropdown"
import { useModal } from "../../hooks"
import CurrencySelect from "../transactions/CurrencySelect"

export default function TopNav() {
  const navigate = useNavigate()
  const location = useLocation()
  const [showSlider, setShowSlider] = useState<boolean>(false)
  const { isAuthenticated, user } = useAuth()
  const { showModal } = useModal(Modals.CONNECT_WALLET)

  return (
    <div className="z-[998] fixed left-0  w-full bg-nav">
      <div className="max-w-[1500px] h-[60px] lg:h-[100px] lg:py-[13px]  relative mx-auto flex items-center justify-between px-4 lg:pl-[80px] lg:pr-[95px]">
        <Link to={PageRoutes.HOME}>
          <Logo className="h-10 w-[52px] lg:h-[74.44px] lg:w-[96.98px]" />
        </Link>
        {location.pathname !== PageRoutes.ERROR && (
          <div className="flex items-center space-x-5 md:space-x-[41px]">
            <CurrencySelect />
            {isAuthenticated ? (
              <div className="flex items-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleProfileDropdown("toggle")
                  }}
                  type="button"
                  className="h-[30px] lg:h-[52px] rounded-xl bg-[#D7FFD0]/[.25] flex items-center px-2 cursor-pointer"
                >
                  <User className="mr-0 lg:mr-[7px]" />
                  <div className="lg:flex bg-primary h-9 rounded-10 px-[10px] max-w-[121px] overflow-hidden hidden items-center justify-center">
                    <span className="text-[15px] text-white">
                      {user ? user.username : ""}
                    </span>
                  </div>
                  <Dropdown className="ml-[13.41px] h-3 w-3" />
                </button>
              </div>
            ) : (
              <div>
                <button
                  className="lg:hidden"
                  type="button"
                  onClick={() => setShowSlider(true)}
                >
                  <Hamburger className="mb-[-4px]" />
                </button>
                <div className="hidden lg:flex items-center space-x-[15px]">
                  <Button
                    bordered
                    text="sign in"
                    onClick={() => navigate(PageRoutes.SIGN_IN_WITH_EMAIL)}
                    background="transparent"
                  />
                  <Button
                    text="Connect Wallet"
                    onClick={() => showModal({ modal: Modals.CONNECT_WALLET })}
                  />
                </div>
              </div>
            )}
            {isAuthenticated && <ProfileDropdown />}
            <div
              className={clsx(
                "fixed lg:hidden top-0 left-[-100vw] px-[61px] flex flex-col space-y-[22px] bg-[#1E1E1E] h-screen w-screen pt-[14vh] transition-all duration-150",
                { "!left-0": showSlider }
              )}
            >
              <button
                type="button"
                className="absolute top-[48.1px] right-[25.1px]"
                onClick={() => setShowSlider(false)}
              >
                <Exit className="fill-[#929AA5]" />
              </button>
              <Button
                text="Sign in"
                fullWidth
                background="transparent"
                bordered
                className="text-primary"
                onClick={() => navigate(PageRoutes.SIGN_IN_WITH_EMAIL)}
              />
              <Button
                text="Connect Wallet"
                fullWidth
                bordered
                textColor="white"
                onClick={() => showModal({ modal: Modals.CONNECT_WALLET })}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
