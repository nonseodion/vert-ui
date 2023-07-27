import { Currency, Pair, CurrencyAmount } from "@pancakeswap/sdk"
import { useMemo } from "react"
import { ListenerOptionsWithGas } from "@uniswap/redux-multicall"
import { useBlockNumber, useChainId } from "wagmi"
import { Interface } from "ethers/lib/utils"
import { wrappedCurrency } from "../utils/wrappedCurrency"
import { getAbis } from "../utils/getContracts"
import { useMultipleContractSingleData } from "../utils/multicall"

export enum PairState {
  LOADING,
  NOT_EXISTS,
  EXISTS,
  INVALID,
}

const { PairAbi } = getAbis()
const pairInterface = new Interface(PairAbi)

export function usePairs(
  currencies: [Currency | undefined, Currency | undefined][],
  listenerOptions?: ListenerOptionsWithGas
): [PairState, Pair | null][] {
  const chainId = useChainId()
  const tokens = useMemo(
    () =>
      currencies.map(([currencyA, currencyB]) => [
        wrappedCurrency(currencyA, chainId),
        wrappedCurrency(currencyB, chainId),
      ]),
    [chainId, currencies]
  )

  const pairAddresses = useMemo(
    () =>
      tokens.map(([tokenA, tokenB]) => {
        try {
          return tokenA && tokenB && !tokenA.equals(tokenB)
            ? Pair.getAddress(tokenA, tokenB)
            : undefined
        } catch (error: any) {
          // Debug Invariant failed related to this line
          console.error(
            error.message,
            `- pairAddresses: ${tokenA?.address}-${tokenB?.address}`,
            `chainIds: ${tokenA?.chainId}- ${tokenB?.chainId}`
          )

          return undefined
        }
      }),
    [tokens]
  )

  const { data: blockNumber } = useBlockNumber({
    scopeKey: "pairReserves",
    staleTime: 2_000,
  })

  const results = useMultipleContractSingleData(
    chainId,
    blockNumber,
    pairAddresses,
    pairInterface,
    "getReserves",
    [],
    listenerOptions
  )

  return useMemo(
    () =>
      results.map(({ result, loading }, i) => {
        if (loading) return [PairState.LOADING, null]
        const { reserve0, reserve1 } = {
          reserve0: result?.reserve0,
          reserve1: result?.reserve1,
        }
        const tokenA = tokens[i][0]
        const tokenB = tokens[i][1]
        if (!tokenA || !tokenB || tokenA.equals(tokenB))
          return [PairState.INVALID, null]
        if (!reserve0) return [PairState.NOT_EXISTS, null]
        const [token0, token1] = tokenA.sortsBefore(tokenB)
          ? [tokenA, tokenB]
          : [tokenB, tokenA]
        return [
          PairState.EXISTS,
          new Pair(
            CurrencyAmount.fromRawAmount(token0, reserve0.toString()),
            CurrencyAmount.fromRawAmount(token1, reserve1.toString())
          ),
        ]
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [results]
  )
}

export function usePair(
  tokenA: Currency,
  tokenB: Currency
): [PairState, Pair | null] {
  const pairCurrencies = useMemo<[Currency, Currency][]>(
    () => [[tokenA, tokenB]],
    [tokenA, tokenB]
  )
  return usePairs(pairCurrencies)[0]
}
