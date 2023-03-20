import React, { useState } from "react"
import clsx from "classnames"
import { ReactComponent as USD } from "../../assets/icons/usd.svg"
import ngn from "../../assets/icons/ngn.png"
import { ReactComponent as Dropdown } from "../../assets/icons/dropdown.svg"
import { handleCurrencySelectDropdown } from "../../utils/functions"

type Currency = "USD" | "NGN"

type CurrencyDetail = { name: Currency; fullName: string }

const currencies: CurrencyDetail[] = [
  { name: "USD", fullName: "US Dollar" },
  { name: "NGN", fullName: "Nigerian Naira" },
]

export default function CurrencySelect() {
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyDetail>(
    currencies[0]
  )

  const onCurrencyChange = (currency: CurrencyDetail) => {
    if (selectedCurrency.name !== currency.name) {
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
        {selectedCurrency.name === "USD" ? (
          <USD className="h-4 w-4" />
        ) : (
          <img src={ngn} alt="Nigeria" className="h-4 w-4" />
        )}
        <span className="mx-[2px] mb-[-2px] text-primary font-semibold uppercase text-[10px]">
          {selectedCurrency.name}
        </span>
        <Dropdown className="h-[10px] w-[10px] mb-[1px]" />
      </button>
      <ul className="transition-all backdrop-blur-[5px] duration-150 currency-select translate-y-2 opacity-0 pointer-events-none rounded-lg px-3 bg-[#292929]/[.62] absolute w-[225px] -bottom-[112px] lg:-bottom-[132px] -left-[70px] shadow-sm pt-[18px] pb-[22px] pl-3 flex flex-col space-y-4">
        {currencies.map((currency) => (
          <li key={currency.name}>
            <button
              onClick={() => onCurrencyChange(currency)}
              type="button"
              className="flex items-center space-x-[10px]"
            >
              {currency.name === "USD" ? (
                <USD className="h-4 w-4" />
              ) : (
                <img src={ngn} alt="Nigeria" className="h-4 w-4" />
              )}
              <div className="flex items-center space-x-3">
                <span
                  className={clsx("text-lightBlue text-sm font-semibold", {
                    "!text-primary": currency.name === selectedCurrency.name,
                  })}
                >
                  {currency.name}
                </span>
                <span
                  className={clsx("text-white/[.4] text-sm", {
                    "!text-primary": currency.name === selectedCurrency.name,
                  })}
                >
                  {currency.fullName}
                </span>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
