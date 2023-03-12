import { Currency, Price, WNATIVE, JSBI, Pair } from "@pancakeswap/sdk"
import { PairState } from "../hooks/usePairs"
import { activeChainId } from "./config"
import { bscTokens, bscTestnetTokens } from "./constants/tokens"

/**
 * Returns the price in BUSD of the input currency
 * @param currency currency to compute the BUSD price of
 */
export default function getBUSDPrice(
  pairs: [PairState, Pair | null][],
  currency?: Currency
): Price<Currency, Currency> | undefined {
  const chainId = activeChainId
  const wrapped = currency?.wrapped
  const wnative = WNATIVE[chainId]
  const stable = activeChainId === 56 ? bscTokens.busd : bscTestnetTokens.busd

  const [
    [bnbPairState, bnbPair],
    [busdPairState, busdPair],
    [busdBnbPairState, busdBnbPair],
  ] = pairs

  if (!currency || !wrapped || !chainId || !wnative) {
    return undefined
  }

  // handle busd
  if (wrapped.equals(stable)) {
    return new Price(stable, stable, "1", "1")
  }

  const isBUSDPairExist =
    busdPair &&
    busdPairState === PairState.EXISTS &&
    busdPair.reserve0.greaterThan("0") &&
    busdPair.reserve1.greaterThan("0")

  // handle wbnb/bnb
  if (wrapped.equals(wnative)) {
    if (isBUSDPairExist) {
      const price = busdPair.priceOf(wnative)
      return new Price(currency, stable, price.denominator, price.numerator)
    }
    return undefined
  }

  const isBnbPairExist =
    bnbPair &&
    bnbPairState === PairState.EXISTS &&
    bnbPair.reserve0.greaterThan("0") &&
    bnbPair.reserve1.greaterThan("0")
  const isBusdBnbPairExist =
    busdBnbPair &&
    busdBnbPairState === PairState.EXISTS &&
    busdBnbPair.reserve0.greaterThan("0") &&
    busdBnbPair.reserve1.greaterThan("0")

  const bnbPairBNBAmount = isBnbPairExist && bnbPair?.reserveOf(wnative)
  const bnbPairBNBBUSDValue: JSBI =
    bnbPairBNBAmount && isBUSDPairExist && isBusdBnbPairExist
      ? busdBnbPair.priceOf(wnative).quote(bnbPairBNBAmount).quotient
      : JSBI.BigInt(0)

  // all other tokens
  // first try the busd pair
  if (
    isBUSDPairExist &&
    busdPair.reserveOf(stable).greaterThan(bnbPairBNBBUSDValue.toString())
  ) {
    const price = busdPair.priceOf(wrapped)
    return new Price(currency, stable, price.denominator, price.numerator)
  }
  if (isBnbPairExist && isBusdBnbPairExist) {
    if (
      busdBnbPair.reserveOf(stable).greaterThan("0") &&
      bnbPair.reserveOf(wnative).greaterThan("0")
    ) {
      const bnbBusdPrice = busdBnbPair.priceOf(stable)
      const currencyBnbPrice = bnbPair.priceOf(wnative)
      const busdPrice = bnbBusdPrice.multiply(currencyBnbPrice).invert()
      return new Price(
        currency,
        stable,
        busdPrice.denominator,
        busdPrice.numerator
      )
    }
  }

  return undefined
}
