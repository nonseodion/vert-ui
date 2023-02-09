import React from "react"
import { useNavigate } from "react-router-dom"
import { ReactComponent as Logo } from "../../assets/icons/logo.svg"
import { routes } from "../../utils/constants"
import { doNothing } from "../../utils/functions"
import Button from "../general/Button"

export default function TopNav() {
  const navigate = useNavigate()
  return (
    <div className="flex items-center justify-between bg-nav h-[100px] pl-[80px] pr-[95px] py-[13px]">
      <Logo />
      <div className="flex items-center space-x-[15px]">
        <Button
          bordered
          text="sign in"
          onClick={() => navigate(routes.sign_in_with_email)}
          background="transparent"
        />
        <Button text="Connect Wallet" onClick={doNothing} />
      </div>
    </div>
  )
}
