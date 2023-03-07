import React from "react"
import { ERC20Token } from "@pancakeswap/sdk"
import { Button } from "../general"
import { getTokenLogoURL } from "../../utils"
import CurrencyLogo from "./CurrencyLogo"

interface ResolvedTokenProps {
  token: ERC20Token
  logo: string
  handleClick: () => void
}

export default function ResolvedToken({
  token,
  logo,
  handleClick,
}: ResolvedTokenProps) {
  const { name, symbol, address } = token
  return (
    <div className="pt-6 h-[320px] px-6" key={address}>
      <div className="justify-between flex items-center">
        <div className="flex space-x-4 items-center">
          <CurrencyLogo
            currency={token}
            srcs={[logo, getTokenLogoURL(token) ?? ""]}
          />
          <div className="flex flex-col space-y-[3.5px]">
            <h4 className="font-medium text-base text-black">{name}</h4>
            <span className="text-[13px] text-lightBlue">{symbol}</span>
          </div>
        </div>
        <Button
          text="Import"
          onClick={handleClick}
          className="h-8 p-0 w-[72px] flex items-center justify-center text-[13px]"
        />
      </div>
    </div>
  )
}
