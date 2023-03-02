import {
  Currency,
  CurrencyAmount,
  Pair,
  Token,
  Trade,
  TradeType,
} from "@pancakeswap/sdk"
import { useMemo } from "react"
import flatMap from "lodash/flatMap"
import { BASES_TO_CHECK_TRADES_AGAINST } from "../utils/constants/exchange"
import { activeChainId } from "../utils/config"
import { wrappedCurrency } from "../utils/wrappedCurrency"
import { PairState, usePairs } from "./usePairs"

const chainId = activeChainId

export function useAllCommonPairs(
  currencyA?: Currency,
  currencyB?: Currency
): Pair[] {
  const [tokenA, tokenB] = useMemo(
    () =>
      chainId
        ? [
            wrappedCurrency(currencyA, chainId),
            wrappedCurrency(currencyB, chainId),
          ]
        : [undefined, undefined],
    [currencyA, currencyB]
  )

  const bases: Token[] = useMemo(() => {
    if (!chainId) return []
    const common = BASES_TO_CHECK_TRADES_AGAINST[chainId] ?? []

    return common
  }, [])

  const basePairs: [Token, Token][] = useMemo(
    () =>
      flatMap(bases, (base): [Token, Token][] =>
        bases.map((otherBase) => [base, otherBase])
      ),
    [bases]
  )

  const allPairCombinations: [Token, Token][] = useMemo(
    () =>
      tokenA && tokenB
        ? [
            // the direct pair
            [tokenA, tokenB],
            // token A against all bases
            ...bases.map((base): [Token, Token] => [tokenA, base]),
            // token B against all bases
            ...bases.map((base): [Token, Token] => [tokenB, base]),
            // each base against all bases
            ...basePairs,
          ]
            .filter((tokens): tokens is [Token, Token] =>
              Boolean(tokens[0] && tokens[1])
            )
            .filter(([t0, t1]) => t0.address !== t1.address)
            // remove duplicate pairs
            .reduce<[Token, Token][]>((memo, [token1, token2]) => {
              let pairs = memo
              const foundPair = pairs.find(([token11, token22]) => {
                if (
                  (token11.address === token1.address ||
                    token11.address === token2.address) &&
                  (token22.address === token1.address ||
                    token22.address === token2.address)
                ) {
                  return [token11, token22]
                }

                return undefined
              })
              if (!foundPair) pairs = [...pairs, [token1, token2]]

              return pairs
            }, [])
        : [],
    [tokenA, tokenB, bases, basePairs]
  )

  const allPairs = usePairs(allPairCombinations)

  // only pass along valid pairs, non-duplicated pairs
  return useMemo(
    () =>
      Object.values(
        allPairs
          // filter out invalid pairs
          .filter((result): result is [PairState.EXISTS, Pair] =>
            Boolean(result[0] === PairState.EXISTS && result[1])
          )
          // filter out duplicated pairs
          .reduce<{ [pairAddress: string]: Pair }>((memo, [, curr]) => {
            const pairs = memo
            pairs[curr.liquidityToken.address] =
              memo[curr.liquidityToken.address] ?? curr
            return pairs
          }, {})
      ),
    [allPairs]
  )
}

export function useTradeExactIn(
  currencyAmountIn?: CurrencyAmount<Currency>,
  currencyOut?: Currency
): Trade<Currency, Currency, TradeType> | null {
  const allowedPairs: Pair[] = useAllCommonPairs(
    currencyAmountIn?.currency,
    currencyOut
  )
  console.log(
    "useTradeExactIn",
    allowedPairs.map((pair) => [pair.token0.symbol, pair.token1.symbol])
  )
  return useMemo(() => {
    if (currencyAmountIn && currencyOut && allowedPairs.length > 0) {
      const bestTrade: Trade<Currency, Currency, TradeType> | null =
        Trade.bestTradeExactIn(allowedPairs, currencyAmountIn, currencyOut, {
          maxHops: 3,
          maxNumResults: 1,
        })[0] ?? null
      return bestTrade
    }

    return null
  }, [currencyAmountIn, currencyOut, allowedPairs])
}

export function useTradeExactOut(
  currencyIn?: Currency,
  currencyAmountOut?: CurrencyAmount<Currency>
): Trade<Currency, Currency, TradeType> | null {
  const allowedPairs = useAllCommonPairs(
    currencyIn,
    currencyAmountOut?.currency
  )

  return useMemo(() => {
    if (currencyIn && currencyAmountOut && allowedPairs.length > 0) {
      const bestTrade =
        Trade.bestTradeExactOut(allowedPairs, currencyIn, currencyAmountOut, {
          maxHops: 3,
          maxNumResults: 1,
        })[0] ?? null
      return bestTrade
    }
    return null
  }, [currencyIn, currencyAmountOut, allowedPairs])
}
