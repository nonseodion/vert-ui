import React, { useCallback, useMemo } from "react"
import { Currency, ERC20Token } from "@pancakeswap/sdk"
import { v4 as uuidv4 } from "uuid"
import { Balance } from "../../state/balances/useBalances"
import ImportedToken from "./ImportedToken"
import { wrappedCurrency } from "../../utils/wrappedCurrency"
import { activeChainId } from "../../utils/config"
import FiatAmount from "../../utils/FiatAmount"
import ResolvedToken from "./ResolvedToken"
import { isAddress } from "../../utils"
import UnImportedToken from "./UnImportedToken"
import { USD } from "../../utils/Fiat"

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
        .map<[Currency, FiatAmount | undefined, Balance | undefined, string]>(
          (token, index) => [
            token,
            fiatBalances?.[index],
            tokenBalances?.[index],
            unImportedTokens ? otherLogos[index] : logos[index],
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
        .sort(([a, fiatBalA], [b, fiatBalB]) => {
          // sort with balance if balA or balA is more than 0 else use symbols
          if (
            (fiatBalA || fiatBalB) &&
            !unImportedTokens &&
            (fiatBalA?.greaterThan(0) || fiatBalB?.greaterThan(0))
          ) {
            const [balA, balB] = [
              fiatBalA ?? FiatAmount.fromRawAmount(USD, "0"),
              fiatBalB ?? FiatAmount.fromRawAmount(USD, "0"),
            ]
            return balA.lessThan(balB) ? 1 : -1
          }

          return a.symbol.localeCompare(b.symbol, "en", { sensitivity: "base" })
        })
        // map tokens to token element
        .map(([token, fiatBalance, tokenBalance, logo]) =>
          !unImportedTokens ? (
            <ImportedToken
              {...{
                token,
                logo,
                fiatBalance,
                tokenBalance,
                handleClick: handleSelectToken,
              }}
              key={uuidv4()}
            />
          ) : (
            <UnImportedToken
              {...{
                token: wrappedCurrency(token, activeChainId)!,
                logo,
                handleClick: startImportingToken,
              }}
              key={uuidv4()}
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

  const importedTokens = getRows(defaultTokens)
  // return 20 max unimported tokens
  const unImportedTokens =
    searchQuery.trim() !== "" ? getRows(otherTokens, true).slice(0, 20) : ""
  let noTokens = unImportedTokens.length + importedTokens.length === 0
  const resolvedToken = isAddress(searchQuery) && noTokens && (
    <ResolvedToken
      {...{ searchQuery, handleClick: startImportingToken, logo: "" }}
    />
  )
  noTokens = !resolvedToken && noTokens

  return (
    <>
      <ul className="px-6 pt-6 max-h-[320px] overflow-y-scroll scrollbar-hide">
        {importedTokens}
        {unImportedTokens}
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
