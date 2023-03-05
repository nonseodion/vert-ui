import React, { useMemo } from "react"
import { ReactComponent as Search } from "../../assets/icons/search.svg"
import { ReactComponent as Settings } from "../../assets/icons/settings.svg"
import { ReactComponent as Exit } from "../../assets/icons/exit.svg"
import { Steps } from "../../hooks/interfaces/useTokenModalInterface"

interface SelectTokenProps {
  setCurrentStep: React.Dispatch<React.SetStateAction<Steps>>
  tokenList: JSX.Element[]
  otherTokenList: JSX.Element[]
  pinnedTokens: JSX.Element[]
  resolvedTokenElement: JSX.Element | null
  searchQuery: string
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>
}

export default function SelectToken({
  setCurrentStep,
  searchQuery,
  otherTokenList,
  setSearchQuery,
  resolvedTokenElement,
  pinnedTokens,
  tokenList,
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
        {otherTokenList}
      </ul>

      {resolvedTokenElement}
      {!resolvedTokenElement &&
        tokenList.length === 0 &&
        otherTokenList.length === 0 && (
          <div className="flex justify-center mt-[10px] mb-[40px] italic text-lightBlue">
            No tokens found
          </div>
        )}
      <div className="pb-[11px] flex items-center justify-center">
        <button
          type="button"
          onClick={() => setCurrentStep(Steps.CUSTOM_TOKENS)}
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
