import React, { useMemo } from "react"
import { buyableCurrencies, sellableCurrencies } from "../../utils/constants"
import { ReactComponent as DropdownIcon } from "../../assets/icons/arrow-down.svg"

export interface ConverterSideProps {
  side: "sell" | "buy"
}

const ConverterSide: React.FC<ConverterSideProps> = ({ side }) => {
  const isBuySide = useMemo(() => side === "buy", [side])
  return (
    <div className="bg-white min-h-[104px] rounded-xl py-[13.5px] px-4">
      <p className="uppercase text-12 mb-[25.5px]">you {side}</p>
      <div className="flex items-center">
        <div className="flex-1">
          <input
            className="w-full border-none outline-none focus:outline-none placeholder:text-placeholder text-xl"
            placeholder="0.0"
          />
        </div>
        <button type="button" className="flex-shrink-0 ml-3">
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
              <span className="font-semibold text-[#280D5F] text-base">
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

export default ConverterSide
