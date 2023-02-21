import {
  BigintIsh,
  Fraction,
  JSBI,
  Rounding,
  TEN,
  ZERO,
} from "@pancakeswap/sdk"
import invariant from "tiny-invariant"
import _Big from "big.js"
import toFormat from "toformat"
import Fiat, { USD } from "./Fiat"
import { parseBigintIsh } from "./functions"

const Big = toFormat(_Big)

class FiatAmount extends Fraction {
  public readonly fiat: Fiat

  private readonly decimalScale

  protected constructor(
    fiat: Fiat,
    numerator: BigintIsh,
    denominator?: BigintIsh
  ) {
    super(numerator, denominator)
    invariant(JSBI.greaterThanOrEqual(this.quotient, ZERO), "AMOUNT")
    this.fiat = fiat
    this.decimalScale = JSBI.exponentiate(TEN, JSBI.BigInt(2))
  }

  static fromRawAmount<T extends Fiat>(fiat: T, rawAmount: string) {
    return new FiatAmount(fiat, rawAmount)
  }

  static fromFractionalAmount<T extends Fiat>(
    fiat: T,
    numerator: BigintIsh,
    denominator: BigintIsh
  ) {
    const num = parseBigintIsh(numerator)
    const denom = parseBigintIsh(denominator)
    return new FiatAmount(fiat, num, denom)
  }

  public add(other: FiatAmount): FiatAmount {
    invariant(this.fiat.equals(other.fiat), "Fiat not equal")
    const added = super.add(other)
    return FiatAmount.fromFractionalAmount(
      this.fiat,
      added.numerator,
      added.denominator
    )
  }

  public subtract(other: FiatAmount): FiatAmount {
    invariant(this.fiat.equals(other.fiat), "Fiat not equal")
    const subtracted = super.subtract(other)
    return FiatAmount.fromFractionalAmount(
      this.fiat,
      subtracted.numerator,
      subtracted.denominator
    )
  }

  public multiply(other: Fraction | BigintIsh): FiatAmount {
    const multiplied = super.multiply(other)
    return FiatAmount.fromFractionalAmount(
      this.fiat,
      multiplied.numerator,
      multiplied.denominator
    )
  }

  public divide(other: Fraction | BigintIsh): FiatAmount {
    const divided = super.divide(other)
    return FiatAmount.fromFractionalAmount(
      this.fiat,
      divided.numerator,
      divided.denominator
    )
  }

  public toSignificant(
    significantDigits = 2,
    format?: object,
    rounding: Rounding = Rounding.ROUND_DOWN
  ): string {
    return super
      .divide(this.decimalScale)
      .toSignificant(significantDigits, format, rounding)
  }

  public toFixed(
    decimalPlaces: number = this.fiat.decimals,
    format?: object,
    rounding: Rounding = Rounding.ROUND_DOWN
  ): string {
    invariant(decimalPlaces <= this.fiat.decimals, "DECIMALS")
    return super
      .divide(this.decimalScale.toString())
      .toFixed(decimalPlaces, format, rounding)
  }

  public toExact(format: object = { groupSeparator: "" }): string {
    Big.DP = this.fiat.decimals
    return new Big(this.quotient.toString())
      .div(this.decimalScale.toString())
      .toFormat(format)
  }

  public toDollarAmount(rate: Fraction | BigintIsh): FiatAmount {
    const divided = this.divide(rate)
    return FiatAmount.fromFractionalAmount(
      USD,
      divided.numerator,
      divided.denominator
    )
  }

  /**
   * Constructs an instance of this fiatAmount equivalent to another fiat currency's amount.
   * @param other FiatAmount of other fiat currency
   * @param rate exchange rate i.e this/other e.g NGN/USD
   */
  static fromOtherAmount(
    fiat: Fiat,
    other: FiatAmount,
    rate: Fraction | BigintIsh
  ): FiatAmount {
    const multiplied = other.multiply(rate)
    return FiatAmount.fromFractionalAmount(
      fiat,
      multiplied.numerator,
      multiplied.denominator
    )
  }
}

export default FiatAmount
