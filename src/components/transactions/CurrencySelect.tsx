import React from "react"
import clsx from "classnames"
import { ReactComponent as Dropdown } from "../../assets/icons/dropdown.svg"
import { handleCurrencySelectDropdown } from "../../utils/functions"
import { SupportedFiat, supportedFiat } from "../../utils/constants/exchange"
import useExchange from "../../state/exchange/useExchange"

const currencies = Object.entries(supportedFiat) as [
  SupportedFiat,
  (typeof supportedFiat)["ngn"]
][]

export default function CurrencySelect() {
  const {
    preferredFiat: {
      logo,
      fiat: { symbol },
    },
    setPreferredFiat,
  } = useExchange()

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
        <img src={logo} alt={symbol} className="h-4 w-4" />
        <span className="mx-[2px] mb-[-2px] text-primary font-semibold uppercase text-[10px]">
          {symbol}
        </span>
        <Dropdown className="h-[10px] w-[10px] mb-[1px]" />
      </button>
      <ul className="transition-all backdrop-blur-[5px] duration-150 currency-select translate-y-2 opacity-0 pointer-events-none rounded-lg px-3 bg-[#292929]/[.62] absolute w-[225px] -bottom-[112px] lg:-bottom-[132px] -left-[70px] shadow-sm pt-[18px] pb-[22px] pl-3 flex flex-col space-y-4">
        {currencies.map(([key, { fiat, logo: logo1 }]) => (
          <li key={fiat.name}>
            <button
              onClick={() => setPreferredFiat(key)}
              type="button"
              className="flex items-center space-x-[10px]"
            >
              <img src={logo1} alt={fiat.name} className="h-4 w-4" />
              <div className="flex items-center space-x-3">
                <span
                  className={clsx("text-lightBlue text-sm font-semibold", {
                    "!text-primary": fiat.symbol === symbol,
                  })}
                >
                  {fiat.symbol}
                </span>
                <span
                  className={clsx("text-white/[.4] text-sm", {
                    "!text-primary": fiat.symbol === symbol,
                  })}
                >
                  {fiat.name}
                </span>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
