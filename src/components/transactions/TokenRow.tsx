import React from "react"
import { ERC20Token } from "@pancakeswap/sdk"
import TokenImage from "./TokenImage"

interface TokenRowProps {
  token: ERC20Token
  logo: string
  handleClick: (token: ERC20Token, logo: string) => void
}

export default function TokenRow({ token, logo, handleClick }: TokenRowProps) {
  const { name, symbol, address } = token

  return (
    <li key={address}>
      <button
        onClick={() => handleClick(token, logo)}
        type="button"
        className="w-full text-left flex space-x-4 items-center mb-8"
      >
        <TokenImage token={token} url={logo} />
        <div className="flex flex-col space-y-[3.5px]">
          <h4 className="font-medium text-base text-black">{name}</h4>
          <span className="text-[13px] text-lightBlue">{symbol}</span>
        </div>
      </button>
    </li>
  )
}
