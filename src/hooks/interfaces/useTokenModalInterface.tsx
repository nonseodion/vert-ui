import React, { useCallback, useEffect, useMemo, useState } from "react"
import { useAtom, useAtomValue } from "jotai"
import { ERC20Token } from "@pancakeswap/sdk"
import { activeChainId } from "../../utils/config"
import { pinnedTokens } from "../../utils/constants/exchange"
import PinnedToken from "../../components/transactions/PinnedToken"
import { handleSetExchangeAtomCreator } from "../../state/exchange/atoms"
import useModal from "../useModal"
import { isAddress } from "../../utils"
import { useSingleContractWithCallData } from "../../utils/multicall"
import { blockNumberAtom } from "../../state/blockAtoms"
import getContracts from "../../utils/getContracts"

interface ReturnTypes {
  pinnedTokens: JSX.Element[]
  tokenList: JSX.Element[]
  searchQuery: string
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>
  resolvedToken: ERC20Token | null
}

const { erc20Token } = getContracts()
const erc20TokenInterface = erc20Token.interface
const callDatas: string[] = [
  erc20TokenInterface.encodeFunctionData("name"),
  erc20TokenInterface.encodeFunctionData("symbol"),
  erc20TokenInterface.encodeFunctionData("decimals"),
]

let tokenList: JSX.Element[] = []

const useTokenModalInterface = (
  tokens: ERC20Token[],
  logos: string[]
): ReturnTypes => {
  const [, setSellToken] = useAtom(
    useMemo(
      () =>
        handleSetExchangeAtomCreator<
          "sellToken",
          { token: ERC20Token; logo: string }
        >(),
      []
    )
  )
  const { hideModal, isActive } = useModal("token_modal")
  const [searchQuery, setSearchQuery] = useState("")

  const blockNumber = useAtomValue(blockNumberAtom)

  // resolve token when user enters address in searchQuery
  const erc20TokenQuery = useMemo(
    () =>
      isAddress(searchQuery) && tokenList.length === 0
        ? erc20Token.attach(isAddress(searchQuery) as string)
        : erc20Token,
    [searchQuery]
  )
  const results = useSingleContractWithCallData(
    activeChainId,
    blockNumber,
    erc20TokenQuery,
    callDatas
  )

  const resolvedToken =
    results.length > 0 &&
    results.reduce((prev, curr) => prev && curr.valid && !!curr.result, true)
      ? new ERC20Token(
          activeChainId,
          erc20TokenQuery.address,
          results[2].result?.[0],
          results[1].result?.[0],
          results[0].result?.[0]
        )
      : null

  // clear searchQuery when modal closes
  useEffect(() => {
    if (!isActive) {
      setSearchQuery("")
    }
  }, [isActive])

  const handleSelectToken = useCallback(
    (token: ERC20Token, logo: string) => {
      setSellToken({ key: "sellToken", value: { token, logo } })
      hideModal()
    },
    [hideModal, setSellToken]
  )

  const pinnedTokensList = useMemo(
    () =>
      pinnedTokens[activeChainId].map(([token, logo]) => (
        <PinnedToken
          onClick={() => handleSelectToken(token, logo)}
          key={token.address}
          name={token.symbol}
          icon={logo}
          className="mb-1 mr-[6px] cursor-pointer"
        />
      )),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  tokenList = useMemo(
    () => {
      const query = searchQuery.trim().toLowerCase()

      return (
        tokens
          .map<[ERC20Token, string]>((token, index) => [token, logos[index]])
          // filter tokens with searchQuery
          .filter(
            ([token]) =>
              token.symbol.toLowerCase().includes(query) ||
              token.name?.toLowerCase().includes(query) ||
              isAddress(token.address) === searchQuery.trim()
          )
          // map tokens to token element
          .map(([token, logo]) => (
            <li key={token.address}>
              <button
                onClick={() => handleSelectToken(token, logo)}
                type="button"
                className="w-full text-left flex space-x-4 items-center mb-8"
              >
                <img
                  src={logo}
                  alt={token.name}
                  className="h-10 w-10 rounded-[20px]"
                />
                <div className="flex flex-col space-y-[3.5px]">
                  <h4 className="font-medium text-base text-black">
                    {token.name}
                  </h4>
                  <span className="text-[13px] text-lightBlue">
                    {token.symbol}
                  </span>
                </div>
              </button>
            </li>
          ))
      )
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tokens, logos, searchQuery]
  )

  return {
    pinnedTokens: pinnedTokensList,
    tokenList,
    searchQuery,
    setSearchQuery,
    resolvedToken,
  }
}

export default useTokenModalInterface
