import { Currency, Pair, CurrencyAmount } from "@pancakeswap/sdk"
import { useMemo } from "react"
import { useAtomValue } from "jotai"
import { Interface } from "ethers/lib/utils"
import { wrappedCurrency } from "../utils/wrappedCurrency"
import { activeChainId } from "../utils/config"
import { getAbis } from "../utils/getContracts"
import { useMultipleContractSingleData } from "../utils/multicall"
import { blockNumberAtom } from "../state/blockAtoms"

export enum PairState {
  LOADING,
  NOT_EXISTS,
  EXISTS,
  INVALID,
}

const { PairAbi } = getAbis()
const pairInterface = new Interface(PairAbi)

const chainId = activeChainId

export function usePairs(
  currencies: [Currency | undefined, Currency | undefined][]
): [PairState, Pair | null][] {
  const tokens = useMemo(
    () =>
      currencies.map(([currencyA, currencyB]) => [
        wrappedCurrency(currencyA, chainId),
        wrappedCurrency(currencyB, chainId),
      ]),
    [currencies]
  )

  const pairAddresses = useMemo(
    () =>
      tokens
        .map(([tokenA, tokenB]) => {
          try {
            return tokenA && tokenB && !tokenA.equals(tokenB)
              ? Pair.getAddress(tokenA, tokenB)
              : undefined
          } catch (error: any) {
            // Debug Invariant failed related to this line
            console.error(
              error.msg,
              `- pairAddresses: ${tokenA?.address}-${tokenB?.address}`,
              `chainId: ${tokenA?.chainId}`
            )

            return undefined
          }
        })
        .filter((pair): boolean => pair !== undefined) as string[],
    [tokens]
  )

  const blockNumber = useAtomValue(blockNumberAtom)

  const results = useMultipleContractSingleData(
    activeChainId,
    blockNumber,
    pairAddresses,
    pairInterface,
    "getReserves"
  )

  return useMemo(
    () =>
      results.map(({ result }, i) => {
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
    [results, tokens]
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
