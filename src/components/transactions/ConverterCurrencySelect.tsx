import React, { useState } from "react"
import clsx from "classnames"
import { ReactComponent as ArrowDown } from "../../assets/icons/arrow-down-black.svg"
import { handleConverterDropdown } from "../../utils/functions"

type Currency = "USD" | "NGN"

const currencies: Currency[] = ["NGN", "USD"]

export default function ConverterCurrencySelect() {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>("NGN")

  const onCurrencyChange = (currency: Currency) => {
    if (selectedCurrency !== currency) {
      setSelectedCurrency(currency)
    }
  }

  return (
    <div className="relative">
      <button
        onClick={(e) => {
          e.stopPropagation()
          handleConverterDropdown("toggle")
        }}
        type="button"
        className="ml-1 flex bg-transparent items-center space-x-1"
      >
        <span className="font-bold text-13">{selectedCurrency}</span>
        <ArrowDown />
      </button>
      <ul className="transition-all duration-150 converter-currency-select translate-y-2 opacity-0 pointer-events-none rounded-lg px-3 absolute min-w-[70px] bg-white shadow-sm pt-[18px] pb-[22px] flex flex-col space-y-[18px]">
        {currencies.map((currency) => (
          <li key={currency}>
            <button
              onClick={() => onCurrencyChange(currency)}
              type="button"
              className={clsx("text-sm font-semibold text-lightBlue", {
                "!text-black": selectedCurrency === currency,
              })}
            >
              {currency}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
