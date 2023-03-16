import React, { useState } from "react"
import clsx from "classnames"
import { ReactComponent as USD } from "../../assets/icons/usd.svg"
import ngn from "../../assets/icons/ngn.png"
import { ReactComponent as Dropdown } from "../../assets/icons/dropdown.svg"
import { handleCurrencySelectDropdown } from "../../utils/functions"

type Currency = "USD" | "NGN"

const currencies: Currency[] = ["NGN", "USD"]

export default function CurrencySelect() {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>("NGN")

  const onCurrencyChange = (currency: Currency) => {
    if (selectedCurrency !== currency) {
      setSelectedCurrency(currency)
    }
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          handleCurrencySelectDropdown("toggle")
        }}
        className="rounded-lg h-6 border border-primary bg-primary/[.15] flex items-center px-[6px]"
      >
        {selectedCurrency === "USD" ? (
          <USD className="h-4 w-4" />
        ) : (
          <img src={ngn} alt="Nigeria" className="h-4 w-4" />
        )}
        <span className="mx-[2px] mb-[-2px] text-primary font-semibold uppercase text-[10px]">
          {selectedCurrency}
        </span>
        <Dropdown className="h-[10px] w-[10px] mb-[1px]" />
      </button>
      <ul className="transition-all duration-150 currency-select translate-y-2 opacity-0 pointer-events-none rounded-lg px-3 absolute min-w-[70px] -bottom-[106px] bg-white shadow-sm pt-[18px] pb-[22px] flex flex-col space-y-[18px]">
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
