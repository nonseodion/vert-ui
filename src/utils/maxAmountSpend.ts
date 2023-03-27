import { Currency, CurrencyAmount, JSBI } from "@pancakeswap/sdk"
import { BIG_INT_ZERO, MIN_BNB } from "./constants/exchange"

/**
 * Given some token amount, return the max that can be spent of it
 * @param currencyAmount to return max of
 */
export function maxAmountSpend<T extends CurrencyAmount<Currency> | undefined>(
  currencyAmount?: T
): T {
  if (typeof currencyAmount === "undefined") return undefined as T
  if (currencyAmount.currency?.isNative) {
    if (JSBI.greaterThan(currencyAmount.quotient, MIN_BNB)) {
      return CurrencyAmount.fromRawAmount(
        currencyAmount.currency,
        JSBI.subtract(currencyAmount.quotient, MIN_BNB)
      ) as T
    }
    return CurrencyAmount.fromRawAmount(
      currencyAmount.currency,
      BIG_INT_ZERO
    ) as T
  }
  return currencyAmount
}
