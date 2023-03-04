import React, { useMemo } from "react"
import { ERC20Token } from "@pancakeswap/sdk"
import { ReactComponent as Search } from "../../assets/icons/search.svg"
import { ReactComponent as Settings } from "../../assets/icons/settings.svg"
import { ReactComponent as Exit } from "../../assets/icons/exit.svg"
import { Button } from "../general"

interface SelectTokenProps {
  setCurrentStep: React.Dispatch<React.SetStateAction<string>>
  steps: { [key: string]: string }
  tokenList: JSX.Element[]
  pinnedTokens: JSX.Element[]
  resolvedToken: ERC20Token | null
  searchQuery: string
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>
}

export default function SelectToken({
  setCurrentStep,
  searchQuery,
  setSearchQuery,
  resolvedToken,
  pinnedTokens,
  tokenList,
  steps,
}: SelectTokenProps) {
  const emptyQuery = useMemo(
    () => searchQuery.trim().length === 0,
    [searchQuery]
  )

  return (
    <div>
      <div className="h-12 mb-6 bg-[#E9FFE5] token-modal-wallet-search mx-6 rounded-xl flex items-center px-[18.8px]">
        <div className="flex-shrink-0 mr-[17.12px]">
          <Search />
        </div>
        <input
          className="h-12 w-full flex-1 text-sm text-lightBlue bg-transparent outline-none border-none"
          placeholder="Search name or paste address"
          value={searchQuery}
          onChange={({ target: { value } }) => setSearchQuery(value)}
        />
        {!emptyQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className="outline-none border-none flex-shrink-0 ml-[3.05px]"
          >
            <Exit className="h-3 w-3" />
          </button>
        )}
      </div>
      <div className="mx-6 flex flex-wrap pb-[9px]">{pinnedTokens}</div>
      <div className="mx-2 h-[1px] bg-lightBlue" />
      <ul className="px-6 pt-6 max-h-[320px] overflow-y-scroll scrollbar-hide">
        {tokenList}
      </ul>

      {resolvedToken && (
        <div className="pt-6 h-[320px] px-6">
          <div className="justify-between flex items-center">
            <div className="flex space-x-4 items-center">
              <div className="h-10 bg-[#CADAF4] w-10 p-1 rounded-full flex items-center justify-center">
                <span className="text-lightBlue text-base overflow-hidden">
                  {resolvedToken.symbol}
                </span>
              </div>
              <div className="flex flex-col space-y-[3.5px]">
                <h4 className="font-medium text-base text-black">
                  {resolvedToken.name}
                </h4>
                <span className="text-[13px] text-lightBlue">
                  {resolvedToken.symbol}
                </span>
              </div>
            </div>
            <Button
              text="Import"
              onClick={() => setCurrentStep(steps.IMPORT_TOKEN)}
              className="h-8 p-0 w-[72px] flex items-center justify-center text-[13px]"
            />
          </div>
        </div>
      )}
      {!resolvedToken && tokenList.length === 0 && (
        <div className="flex justify-center mt-[10px] mb-[40px] italic text-lightBlue">
          No tokens found
        </div>
      )}
      <div className="pb-[11px] flex items-center justify-center">
        <button
          type="button"
          onClick={() => setCurrentStep(steps.CUSTOM_TOKENS)}
          className="flex items-center space-x-[12.95px]"
        >
          <Settings />
          <span className="text-primary font-semibold text-base">
            Custom Tokens
          </span>
        </button>
      </div>
    </div>
  )
}
