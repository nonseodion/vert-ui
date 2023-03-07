import React, { useMemo } from "react"
import { buyableCurrencies, sellableCurrencies } from "../../dummy/currencies"
import { ReactComponent as DropdownIcon } from "../../assets/icons/arrow-down.svg"

export interface ConverterSideProps {
  side: "sell" | "buy"
  onTokenSelect: (_: any) => void
  onValueChange: (value: number | null) => void
  value: number | null
}

export default function ConverterSide({
  side,
  onTokenSelect,
  onValueChange,
  value,
}: ConverterSideProps) {
  const isBuySide = useMemo(() => side === "buy", [side])
  return (
    <div className="bg-white min-h-[104px] rounded-xl py-[13.5px] px-4">
      <div className="flex justify-between items-center mb-[25.5px]">
        <p className="uppercase text-12">you {side}</p>
        {side === "sell" && (
          <div className="flex items-center space-x-[3.52px]">
            <span className="text-purple text-12">Balance:0</span>
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
        <div className="flex flex-col space-y-[5px]">
          <div className="flex-1">
            <input
              className="w-full font-medium border-none outline-none focus:outline-none placeholder:text-placeholder text-xl"
              placeholder="0.0"
              value={value ?? ""}
              onChange={({ target }) =>
                onValueChange(target.value ? Number(target.value) : null)
              }
            />
          </div>
          {value ? (
            <span className="leading-none text-[9px] text-purple font-medium">
              ~28,380.16 USD.
            </span>
          ) : (
            <div className="h-[9px] w-4" />
          )}
        </div>
        <button
          type="button"
          className="flex-shrink-0 ml-3"
          onClick={onTokenSelect}
        >
          <div className="w-[130px] h-[40px] flex space-x-[10.1px] justify-center items-center rounded border border-borderLight">
            <div className="flex space-x-4 items-center">
              <img
                src={
                  isBuySide
                    ? buyableCurrencies[0]?.icon
                    : sellableCurrencies[0]?.icon
                }
                alt={
                  isBuySide
                    ? buyableCurrencies[0]?.label
                    : sellableCurrencies[0]?.label
                }
                className="h-6 w-6 rounded-xl"
              />
              <span className="font-semibold text-black text-base">
                {isBuySide
                  ? buyableCurrencies[0]?.label
                  : sellableCurrencies[0]?.label}
              </span>
            </div>
            {(isBuySide
              ? buyableCurrencies.length > 1
              : sellableCurrencies.length > 1) && <DropdownIcon />}
          </div>
        </button>
      </div>
    </div>
  )
}
