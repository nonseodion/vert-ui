import React from "react"
import { Currency } from "@pancakeswap/sdk"
// import { buyableCurrencies, sellableCurrencies } from "../../dummy/currencies"
import { ReactComponent as DropdownIcon } from "../../assets/icons/arrow-down.svg"
import Fiat from "../../utils/Fiat"

export interface ConverterSideProps {
  side: "sell" | "buy"
  token: Fiat | Currency
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
      <div className="flex justify-between items-center mb-[25.5px]">
        <p className="uppercase text-12">you {side}</p>
        {side === "sell" && (
          <div className="flex items-center space-x-[3.52px]">
            <span className="text-lightBlue text-12">Balance:0</span>
            <button
              type="button"
              className="bg-[#1AFF91]/[.13] rounded-[4px] px-[3px] py-[2px] text-[#1AFF91] font-medium text-12"
            >
              MAX
            </button>
          </div>
        )}
      </div>
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
              <span className="font-semibold text-black text-base">
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
