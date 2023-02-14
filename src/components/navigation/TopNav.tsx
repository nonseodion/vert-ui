import React from "react"
import { useNavigate, Link } from "react-router-dom"
import { ReactComponent as Logo } from "../../assets/icons/logo.svg"
import { ReactComponent as USD } from "../../assets/icons/usd.svg"
import { ReactComponent as Dropdown } from "../../assets/icons/dropdown.svg"
import { ReactComponent as Hamburger } from "../../assets/icons/hamburger.svg"
import { ReactComponent as User } from "../../assets/icons/user.svg"
import useAuth from "../../hooks/useAuth"
import { routes } from "../../utils/constants"
import { doNothing, handleProfileDropdown } from "../../utils/functions"
import Button from "../general/Button"
import ProfileDropdown from "./ProfileDropdown"

export default function TopNav() {
  const navigate = useNavigate()
  const { isAuthenticated, user } = useAuth()

  return (
    <div className="fixed w-full flex items-center justify-between bg-nav h-[60px] px-4 lg:h-[100px] lg:pl-[80px] lg:pr-[95px] lg:py-[13px]">
      <Link to={routes.home}>
        <Logo className="h-10 w-[52px] lg:h-[74.44px] lg:w-[96.98px]" />
      </Link>
      {isAuthenticated ? (
        <div className="flex items-center space-x-[41px]">
          <button
            type="button"
            className="rounded-lg h-6 border border-primary bg-primary/[.15] flex items-center px-[6px]"
          >
            <USD className="h-4 w-4" />
            <span className="mx-[2px] mb-[-2px] text-primary font-semibold uppercase text-[10px]">
              usd
            </span>
            <Dropdown className="h-[10px] w-[10px] mb-[1px]" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleProfileDropdown("toggle")
            }}
            type="button"
            className="h-[30px] lg:h-[52px] rounded-xl bg-[#D7FFD0]/[.25] flex items-center px-2"
          >
            <User className="mr-0 lg:mr-[7px]" />
            <Button
              text={user ? user.username : ""}
              className="lg:block hidden h-9 text-[15px] rounded-[10px] px-[10px] py-0 max-w-[121px]"
            />
            <Dropdown className="ml-[13.41px] h-3 w-3" />
          </button>
        </div>
      ) : (
        <div>
          <button className="lg:hidden" type="button">
            <Hamburger />
          </button>
          <div className="hidden lg:flex items-center space-x-[15px]">
            <Button
              bordered
              text="sign in"
              onClick={() => navigate(routes.sign_in_with_email)}
              background="transparent"
            />
            <Button text="Connect Wallet" onClick={doNothing} />
          </div>
        </div>
      )}
      {isAuthenticated && <ProfileDropdown />}
    </div>
  )
}
