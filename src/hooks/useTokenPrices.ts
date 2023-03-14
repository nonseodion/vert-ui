import {
  WNATIVE,
  Currency,
  CurrencyAmount,
  ERC20Token,
  Price,
} from "@pancakeswap/sdk"
import { useCallback, useMemo } from "react"
import { activeChainId } from "../utils/config"
import { bscTokens, bscTestnetTokens } from "../utils/constants/tokens"
import { usePairs } from "./usePairs"
import getBUSDPrice from "../utils/getBUSDPrice"

export default function useTokenPrices(
  amounts?: (CurrencyAmount<ERC20Token> | undefined)[]
): (Price<Currency, Currency> | undefined)[] {
  const currencies = useMemo(
    () => amounts?.map((amount) => amount?.currency) || [],
    [amounts]
  )

  const getTokenPairs = useCallback(() => {
    const pairs: [Currency | undefined, Currency | undefined][] = []
    currencies.forEach((currency) => {
      const chainId = activeChainId
      const wrapped = currency?.wrapped
      const wnative = WNATIVE[chainId]
      const stable =
        activeChainId === 56 ? bscTokens.busd : bscTestnetTokens.busd

      const tokenPairs: [Currency | undefined, Currency | undefined][] = [
        [
          chainId && wrapped && wnative?.equals(wrapped) ? undefined : currency,
          chainId ? wnative : undefined,
        ],
        [stable && wrapped?.equals(stable) ? undefined : wrapped, stable],
        [chainId ? wnative : undefined, stable],
      ]

      pairs.push(...tokenPairs)
    })

    return pairs
  }, [currencies])

  const tokenPairs = getTokenPairs()
  const pairs = usePairs(tokenPairs)
  const prices: (Price<Currency, Currency> | undefined)[] = useMemo(() => {
    const pricesHolder: (Price<Currency, Currency> | undefined)[] = []
    for (let i = 0; i < currencies.length; i += 1) {
      const j = i * 3
      pricesHolder.push(
        getBUSDPrice([pairs[j], pairs[j + 1], pairs[j + 2]], currencies[i])
      )
    }

    return pricesHolder
  }, [currencies, pairs])

  return prices
}
