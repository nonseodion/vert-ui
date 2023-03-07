import React from "react"
import { ERC20Token } from "@pancakeswap/sdk"
import { Balance } from "../../state/balances/hooks"
import removeTrailingZeros from "../../utils/removeTrailingZeros"
import { getTokenLogoURL } from "../../utils"
import CurrencyLogo from "./CurrencyLogo"

interface TokenRowProps {
  token: ERC20Token
  logo: string
  handleClick: (token: ERC20Token, logo: string) => void
  balance?: Balance
}

export default function TokenRow({
  token,
  logo,
  handleClick,
  balance = { amount: null, loading: false },
}: TokenRowProps) {
  const { name, symbol, address } = token

  return (
    <li key={address} className="w-full">
      <button
        onClick={() => handleClick(token, logo)}
        type="button"
        className="w-full text-left flex justify-between mb-8"
      >
        <div className="flex flex-nowrap grow">
          <CurrencyLogo
            currency={token}
            srcs={[logo, getTokenLogoURL(token) ?? ""]}
          />
          <div className="flex flex-col ml-4 space-y-[3.5px]">
            <h4 className="font-medium text-base text-black">{name}</h4>
            <span className="text-[13px] text-lightBlue">
              {`${
                balance.amount
                  ? removeTrailingZeros(balance.amount.toFixed(6))
                  : ""
              } ${symbol}`}
            </span>
          </div>
        </div>
        <div className="grow-0 text-right font-normal text text-13">
          117,131.46 NGN
        </div>
      </button>
    </li>
  )
}

TokenRow.defaultProps = {
  balance: { amount: null, loading: false },
}
