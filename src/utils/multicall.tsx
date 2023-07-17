import React from "react"
import { createMulticall } from "@uniswap/redux-multicall"
import { ChainId } from "./config"
import getContracts from "./getContracts"

// uses Uniswap multicall for multicalls
export const multicall = createMulticall({ reducerPath: "multicall" })

export const {
  useMultipleContractSingleData,
  useSingleCallResult,
  useSingleContractMultipleData,
  useSingleContractWithCallData,
  useMultiChainMultiContractSingleData,
  useMultiChainSingleContractSingleData,
} = multicall.hooks

interface Props {
  chainId: ChainId
  blockNumber: number | undefined
  blocksPerFetch?: number
}

export function Updater({ chainId, blockNumber, blocksPerFetch }: Props) {
  const { multicall: multicallContract } = getContracts(chainId)
  const listenerOptions = blocksPerFetch ? { blocksPerFetch } : undefined
  return (
    <multicall.Updater
      chainId={chainId}
      latestBlockNumber={blockNumber}
      contract={multicallContract}
      listenerOptions={listenerOptions}
    />
  )
}

Updater.defaultProps = {
  blocksPerFetch: 1,
}
