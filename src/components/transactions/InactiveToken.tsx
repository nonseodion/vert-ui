import { ERC20Token } from "@pancakeswap/sdk"
import React from "react"
import { Button } from "../general"
import CurrencyLogo from "./CurrencyLogo"
import { getTokenLogoURL } from "../../utils"

interface InactiveTokenProps {
  token: ERC20Token
  logo: string
  handleClick: (token: ERC20Token, logo: string) => void
}

export default function InactiveToken({
  token,
  logo,
  handleClick,
}: InactiveTokenProps) {
  const { name, symbol, address } = token

  return (
    <li key={address}>
      <div className="flex justify-between">
        <div className="w-full text-left flex space-x-4 items-center mb-8">
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
          onClick={() => handleClick(token, logo)}
          className="h-8 p-0 w-[72px] flex items-center justify-center text-[13px]"
        />
      </div>
    </li>
  )
}
