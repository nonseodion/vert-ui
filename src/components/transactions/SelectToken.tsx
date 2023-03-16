import React, { useMemo } from "react"
import { ERC20Token } from "@pancakeswap/sdk"
import { ReactComponent as Search } from "../../assets/icons/search.svg"
import { ReactComponent as Settings } from "../../assets/icons/settings.svg"
import { ReactComponent as Exit } from "../../assets/icons/exit.svg"
import useSelectTokenInterface from "../../hooks/interfaces/useSelectTokenInterface"
import { pinnedTokens } from "../../utils/constants/exchange"
import PinnedToken from "./PinnedToken"
import { activeChainId } from "../../utils/config"
import TokenList from "./TokenList"
import { Steps } from "../../utils/types"

interface SelectTokenProps {
  setCurrentStep: React.Dispatch<React.SetStateAction<Steps>>
  startImportingToken: (token: ERC20Token, logo: string) => void
}

export default function SelectToken({
  setCurrentStep,
  startImportingToken,
}: SelectTokenProps) {
  const {
    tokens,
    logos,
    fiatBalances,
    tokenBalances,
    searchQuery,
    setSearchQuery,
    handleSelectToken,
    otherTokens,
    otherLogos,
  } = useSelectTokenInterface()

  const pinnedTokenList = useMemo(
    () =>
      pinnedTokens[activeChainId].map(([token, logo]) => (
        <PinnedToken
          onClick={() => handleSelectToken(token, logo)}
          key={token.address}
          token={token}
          icon={logo}
          className="mb-1 mr-[6px] cursor-pointer"
        />
      )),
    [handleSelectToken]
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
        {!(searchQuery.trim().length === 0) && (
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className="outline-none border-none flex-shrink-0 ml-[3.05px]"
          >
            <Exit className="h-3 w-3 fill-[#929AA5]" />
          </button>
        )}
      </div>
      <div className="mx-6 flex flex-wrap pb-[9px]">{pinnedTokenList}</div>
      <div className="mx-2 h-[1px] bg-lightBlue" />
      <TokenList
        {...{
          tokens,
          otherTokens,
          logos,
          otherLogos,
          fiatBalances,
          tokenBalances,
          handleSelectToken,
          searchQuery,
          startImportingToken,
        }}
      />
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
