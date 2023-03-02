import { Currency, Pair, CurrencyAmount } from "@pancakeswap/sdk"
import { useMemo } from "react"
import { wrappedCurrency } from "../utils/wrappedCurrency"
import { activeChainId } from "../utils/config"
import { Call } from "../utils/blockClient"
import getContracts, { getAbis } from "../utils/getContracts"
import { Pair as PairContractType } from "../utils/abis/types/Pair"
import { useMulticall } from "./blockHooks"

export enum PairState {
  LOADING,
  NOT_EXISTS,
  EXISTS,
  INVALID,
}

const { pair: pairContract } = getContracts()
const { PairAbi } = getAbis()

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

  const callDetails: Call<PairContractType, "getReserves">[] = useMemo(
    () =>
      pairAddresses.map((address) => ({
        functionName: "getReserves",
        contract: pairContract.attach(address),
        abi: PairAbi,
      })),
    [pairAddresses]
  )

  const results = useMulticall<[PairContractType], ["getReserves"], 0>({
    callDetails,
  })

  console.log(
    "results",
    results.map((result) => [result[0].toString(), result[1].toString()])
  )

  return useMemo(
    () =>
      results.map((result, i) => {
        const { reserve0, reserve1 } = result
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
