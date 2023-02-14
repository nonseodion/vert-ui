import React, { useState } from "react"
import { Wrapper } from "../../components/general"
import { Navigator } from "../../components/navigation"
import { ReactComponent as Search } from "../../assets/icons/search.svg"
import { ReactComponent as Right } from "../../assets/icons/right.svg"
import SettingsContent from "../../components/settings/SettingsContent"
import { userFiatCurrencies } from "../../dummy/currencies"

export default function DefaultCurrency() {
  const [filterText, setFilterText] = useState<string>("")
  const filteredCurrencies =
    filterText?.trim()?.length > 0
      ? userFiatCurrencies.filter(
          (currency) =>
            currency.name.toLowerCase().includes(filterText.toLowerCase()) ||
            currency.label.toLowerCase().includes(filterText.toLowerCase())
        )
      : userFiatCurrencies
  return (
    <Wrapper>
      <div className="px-4 pt-5 lg:pt-[60px] lg:px-[80px] flex flex-col space-y-[50px] lg:flex-row lg:space-y-20 lg:space-x-[77px]">
        <Navigator />
        <SettingsContent title="Choose preferred currency">
          <div className="bg-[#E9FFE5] mb-[30px] flex items-center shadowed px-[18.8px] space-x-[17.12px] h-12 rounded-lg">
            <Search className="flex-shrink-0" />
            <input
              onChange={({ target: { value } }) => setFilterText(value)}
              value={filterText}
              className="bg-transparent text-sm placeholder:text-lightBlue text-black border-none outline-none h-12 flex-1"
            />
          </div>
          <ul>
            {filteredCurrencies.map((currency) => (
              <li
                key={currency.label}
                className="mb-[19px] flex justify-between items-center"
              >
                <div className="flex space-x-[10px] items-center">
                  <img
                    src={currency.icon}
                    alt={currency.name}
                    className="h-10 w-10 rounded-full"
                  />
                  <div className="flex flex-col space-y-1">
                    <h3 className="text-sm font-medium text-white">
                      {currency.label}
                    </h3>
                    <p className="text-[10px] text-[#8994A1]">
                      {currency.name}
                    </p>
                  </div>
                </div>
                {currency.is_connected && (
                  <div className="h-4 w-4 rounded-full bg-[#E7FFE3] flex items-center justify-center">
                    <Right />
                  </div>
                )}
              </li>
            ))}
          </ul>
        </SettingsContent>
      </div>
    </Wrapper>
  )
}
