import {
  Currency,
  CurrencyAmount,
  ERC20Token,
  Fraction,
  JSBI,
  ONE_HUNDRED_PERCENT,
  Percent,
  TEN,
  Trade,
  TradeType,
} from "@pancakeswap/sdk"
import FiatAmount from "./FiatAmount"
import Fiat, { USD } from "./Fiat"
import {
  ALLOWED_PRICE_IMPACT_HIGH,
  ALLOWED_PRICE_IMPACT_LOW,
  ALLOWED_PRICE_IMPACT_MEDIUM,
  BIPS_BASE,
  BLOCKED_PRICE_IMPACT_NON_EXPERT,
  Field,
  INPUT_FRACTION_AFTER_FEE,
} from "./constants/exchange"

export const fiatToStableCoinAmount = (
  buyAmount: FiatAmount,
  stableCoin: ERC20Token,
  dollarRate: number
): CurrencyAmount<ERC20Token> => {
  const usdAmount = buyAmount.toDollarAmount(dollarRate)
  const rawBUSDAmount = usdAmount
    .multiply(
      JSBI.exponentiate(TEN, JSBI.BigInt(stableCoin.decimals)).toString()
    )
    .toFixed(0)
  const stableAmount = CurrencyAmount.fromRawAmount(stableCoin, rawBUSDAmount)
  return stableAmount
}

export const stableCoinAmountToFiat = (
  stableCoinAmount: CurrencyAmount<Currency>,
  dollarRate: number,
  fiat: Fiat
): FiatAmount => {
  const USDAmount = FiatAmount.fromFractionalAmount(
    USD,
    stableCoinAmount.multiply(100).numerator,
    JSBI.multiply(stableCoinAmount.decimalScale, stableCoinAmount.denominator)
  )
  const fiatAmount = FiatAmount.fromOtherAmount(fiat, USDAmount, dollarRate)
  return fiatAmount
}

export function calculateSlippageAmount(
  value: CurrencyAmount<Currency>,
  slippage: number
): [JSBI, JSBI] {
  if (slippage < 0 || slippage > 10000) {
    throw Error(`Unexpected slippage value: ${slippage}`)
  }
  return [
    JSBI.divide(
      JSBI.multiply(value.quotient, JSBI.BigInt(10000 - slippage)),
      BIPS_BASE
    ),
    JSBI.divide(
      JSBI.multiply(value.quotient, JSBI.BigInt(10000 + slippage)),
      BIPS_BASE
    ),
  ]
}

// computes price breakdown for the trade
export function computeTradePriceBreakdown(
  trade: Trade<Currency, Currency, TradeType> | null
): {
  priceImpactWithoutFee: Percent | undefined
  realizedLPFee: CurrencyAmount<Currency> | undefined | null
} {
  // for each hop in our trade, take away the x*y=k price impact from 0.3% fees
  // e.g. for 3 tokens/2 hops: 1 - ((1 - .03) * (1-.03))
  const realizedLPFee = !trade
    ? undefined
    : ONE_HUNDRED_PERCENT.subtract(
        trade.route.pairs.reduce<Fraction>(
          (currentFee: Fraction): Fraction =>
            currentFee.multiply(INPUT_FRACTION_AFTER_FEE),
          ONE_HUNDRED_PERCENT
        )
      )

  // remove lp fees from price impact
  const priceImpactWithoutFeeFraction =
    trade && realizedLPFee
      ? trade?.priceImpact.subtract(realizedLPFee)
      : undefined

  // the x*y=k impact
  const priceImpactWithoutFeePercent = priceImpactWithoutFeeFraction
    ? new Percent(
        priceImpactWithoutFeeFraction?.numerator,
        priceImpactWithoutFeeFraction?.denominator
      )
    : undefined

  // the amount of the input that accrues to LPs
  const realizedLPFeeAmount =
    realizedLPFee &&
    trade &&
    CurrencyAmount.fromRawAmount(
      trade.inputAmount.currency,
      realizedLPFee.multiply(trade.inputAmount.quotient).quotient
    )

  return {
    priceImpactWithoutFee: priceImpactWithoutFeePercent,
    realizedLPFee: realizedLPFeeAmount,
  }
}

// converts a basis points value to a pancakeswap sdk percent
export function basisPointsToPercent(num: number): Percent {
  return new Percent(JSBI.BigInt(num), BIPS_BASE)
}

// computes the minimum amount out and maximum amount in for a trade given a user specified allowed slippage in bips

export function computeSlippageAdjustedAmounts(
  trade: Trade<Currency, Currency, TradeType> | undefined,
  allowedSlippage: number
): { [field in Field]?: CurrencyAmount<Currency> } {
  const pct = basisPointsToPercent(allowedSlippage)
  return {
    [Field.SELL]: trade?.maximumAmountIn(pct),
    [Field.BUY]: trade?.minimumAmountOut(pct),
  }
}

export function warningSeverity(
  priceImpact: Percent | undefined
): 0 | 1 | 2 | 3 | 4 {
  if (!priceImpact?.lessThan(BLOCKED_PRICE_IMPACT_NON_EXPERT)) return 4
  if (!priceImpact?.lessThan(ALLOWED_PRICE_IMPACT_HIGH)) return 3
  if (!priceImpact?.lessThan(ALLOWED_PRICE_IMPACT_MEDIUM)) return 2
  if (!priceImpact?.lessThan(ALLOWED_PRICE_IMPACT_LOW)) return 1
  return 0
}
