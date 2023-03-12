import React, { useCallback, useMemo } from "react"
import { Currency, ERC20Token } from "@pancakeswap/sdk"
import { Balance } from "../../state/balances/useBalances"
import ImportedToken from "./ImportedToken"
import { wrappedCurrency } from "../../utils/wrappedCurrency"
import { activeChainId } from "../../utils/config"
import FiatAmount from "../../utils/FiatAmount"
import ResolvedToken from "./ResolvedToken"
import { isAddress } from "../../utils"
import UnImportedToken from "./UnImportedToken"

interface TokenRowsProps {
  tokens: Currency[]
  logos: string[]
  otherTokens: Currency[]
  otherLogos: string[]
  searchQuery: string
  handleSelectToken: (token: Currency, logo: string) => void
  startImportingToken: (token: ERC20Token, logo: string) => void
  fiatBalances?: (FiatAmount | undefined)[]
  tokenBalances?: Balance[]
}

export default function TokenList(props: TokenRowsProps) {
  const {
    tokens: defaultTokens,
    otherTokens,
    otherLogos,
    searchQuery,
    logos,
    handleSelectToken,
    fiatBalances,
    tokenBalances,
    startImportingToken,
  } = props

  const query: string = useMemo(
    () => searchQuery.trim().toLowerCase(),
    [searchQuery]
  )

  const getRows = useCallback(
    (tokens: Currency[], unImportedTokens: boolean = false) =>
      tokens
        .map<[Currency, FiatAmount | undefined, string, Balance | undefined]>(
          (token, index) => [
            token,
            fiatBalances?.[index],
            unImportedTokens ? otherLogos[index] : logos[index],
            tokenBalances?.[index],
          ]
        )
        // filter tokens with searchQuery
        .filter(([token]) => {
          const matching =
            token.symbol.toLowerCase().includes(query) ||
            token.name?.toLowerCase().includes(query) ||
            // compare address of all tokens exculuding BNB
            (!token.isNative &&
              wrappedCurrency(token, activeChainId)?.address.toLowerCase() ===
                query.trim())
          return matching
        })
        // sort tokens
        .sort(([a, balA], [b, balB]) => {
          // sort with balance if balA or balA is more than 0 else use symbols
          if (
            balA &&
            balB &&
            !unImportedTokens &&
            (balA.greaterThan(0) || balB.greaterThan(0))
          ) {
            return balA.lessThan(balB) ? 1 : -1
          }

          return a.symbol.localeCompare(b.symbol, "en", { sensitivity: "base" })
        })
        // map tokens to token element
        .map(([token, fiatBalance, logo, tokenBalance]) =>
          !unImportedTokens ? (
            <ImportedToken
              {...{
                token,
                logo,
                fiatBalance,
                tokenBalance,
                handleClick: handleSelectToken,
              }}
            />
          ) : (
            <UnImportedToken
              {...{
                token: wrappedCurrency(token, activeChainId)!,
                logo,
                handleClick: startImportingToken,
              }}
            />
          )
        ),

    [
      fiatBalances,
      handleSelectToken,
      logos,
      otherLogos,
      query,
      startImportingToken,
      tokenBalances,
    ]
  )

  const unImportedTokens = getRows(defaultTokens)
  // return 20 max unimported tokens
  const importedTokens =
    searchQuery.trim() !== "" ? getRows(otherTokens, true).slice(0, 20) : ""
  let noTokens = unImportedTokens.length + importedTokens.length === 0
  const resolvedToken = isAddress(searchQuery) && noTokens && (
    <ResolvedToken searchQuery={searchQuery} />
  )
  noTokens = !!resolvedToken

  return (
    <>
      <ul className="px-6 pt-6 max-h-[320px] overflow-y-scroll scrollbar-hide">
        {unImportedTokens}
        {importedTokens}
      </ul>
      {resolvedToken}
      {noTokens && (
        <div className="flex justify-center mt-[10px] mb-[40px] italic text-lightBlue">
          No tokens found
        </div>
      )}
    </>
  )
}

TokenList.defaultProps = {
  fiatBalances: undefined,
  tokenBalances: undefined,
}
