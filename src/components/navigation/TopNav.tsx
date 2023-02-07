import React from "react"
import { ReactComponent as Logo } from "../../assets/icons/logo.svg"
import { doNothing } from "../../utils/functions"
import Button from "../general/Button"

const TopNav: React.FC = () => (
  <div className="flex items-center justify-between bg-nav h-[100px] pl-[80px] pr-[95px] py-[13px]">
    <Logo />
    <div className="flex items-center space-x-[15px]">
      <Button
        bordered
        text="sign in"
        onClick={doNothing}
        background="transparent"
      />
      <Button text="Connect Wallet" onClick={doNothing} />
    </div>
  </div>
)

export default TopNav
