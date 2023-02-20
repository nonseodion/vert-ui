import React from "react"
import { ERC20Token } from "@pancakeswap/sdk"
// import { buyableCurrencies, sellableCurrencies } from "../../dummy/currencies"
import { ReactComponent as DropdownIcon } from "../../assets/icons/arrow-down.svg"

export interface ConverterSideProps {
  side: "sell" | "buy"
  token: ERC20Token
  amount: string
  logo: string
  setAmount: (amount: string) => void
  onTokenSelect: (_: any) => void
}

export default function ConverterSide({
  side,
  onTokenSelect,
  token,
  amount,
  logo,
  setAmount,
}: ConverterSideProps) {
  return (
    <div className="bg-white min-h-[104px] rounded-xl py-[13.5px] px-4">
      <p className="uppercase text-12 mb-[25.5px]">you {side}</p>
      <div className="flex items-center">
        <div className="flex-1">
          <input
            className="w-full border-none outline-none focus:outline-none placeholder:text-placeholder text-xl"
            placeholder="0.0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <button
          type="button"
          className="flex-shrink-0 ml-3"
          onClick={onTokenSelect}
        >
          <div className="w-[130px] h-[40px] flex space-x-[10.1px] justify-center items-center rounded border border-borderLight">
            <div className="flex space-x-4 items-center">
              <img
                src={logo}
                alt={`${token.symbol} logo`}
                className="h-6 w-6 rounded-xl"
              />
              <span className="font-semibold text-[#280D5F] text-base">
                {token.symbol}
              </span>
            </div>
            {side === "sell" && <DropdownIcon />}
          </div>
        </button>
      </div>
    </div>
  )
}
