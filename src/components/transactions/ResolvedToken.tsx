import React, { useMemo } from "react"
import { useAtomValue } from "jotai"
import { ERC20Token } from "@pancakeswap/sdk"
import { Button } from "../general"
import { getTokenLogoURL, isAddress } from "../../utils"
import CurrencyLogo from "./CurrencyLogo"
import { activeChainId } from "../../utils/config"
import { useSingleContractWithCallData } from "../../utils/multicall"
import { blockNumberAtom } from "../../state/blockAtoms"
import getContracts from "../../utils/getContracts"

interface ResolvedTokenProps {
  searchQuery: string
}

const { erc20Token } = getContracts()
const erc20TokenInterface = erc20Token.interface
const callDatas: string[] = [
  erc20TokenInterface.encodeFunctionData("name"),
  erc20TokenInterface.encodeFunctionData("symbol"),
  erc20TokenInterface.encodeFunctionData("decimals"),
]

export default function ResolvedToken({ searchQuery }: ResolvedTokenProps) {
  const blockNumber = useAtomValue(blockNumberAtom)
  erc20Token.attach(isAddress(searchQuery) as string)

  // fetch user query token
  const results = useSingleContractWithCallData(
    activeChainId,
    blockNumber,
    erc20Token,
    callDatas
  )

  // confirm if token has been resolved
  const token = useMemo(
    () =>
      results.length > 0 &&
      // make sure results is valid
      results.reduce((prev, curr) => prev && curr.valid && !!curr.result, true)
        ? new ERC20Token(
            activeChainId,
            erc20Token.address,
            results[2].result?.[0],
            results[1].result?.[0],
            results[0].result?.[0]
          )
        : null,
    [results]
  )

  return (
    token && (
      <div className="pt-6 h-[320px] px-6" key={token.address}>
        <div className="justify-between flex items-center">
          <div className="flex space-x-4 items-center">
            <CurrencyLogo
              currency={token}
              srcs={[getTokenLogoURL(token) ?? ""]}
            />
            <div className="flex flex-col space-y-[3.5px]">
              <h4 className="font-medium text-base text-black">{token.name}</h4>
              <span className="text-[13px] text-lightBlue">{token.symbol}</span>
            </div>
          </div>
          <Button
            text="Import"
            onClick={() => {}}
            className="h-8 p-0 w-[72px] flex items-center justify-center text-[13px]"
          />
        </div>
      </div>
    )
  )
}
