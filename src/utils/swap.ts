import {
  Currency,
  CurrencyAmount,
  ERC20Token,
  JSBI,
  TEN,
} from "@pancakeswap/sdk"
import { VertRouter } from "./abis/types"
import getContracts, { getAbis } from "./getContracts"
import { call } from "./blockClient"
import FiatAmount from "./FiatAmount"
import { NGN, USD } from "./Fiat"

const { vertRouter } = getContracts()
const { VertRouterAbi } = getAbis()

// eslint-disable-next-line import/prefer-default-export
export const getAmountOut = async (sellAmount: CurrencyAmount<ERC20Token>) => {
  const amountsOut = await call<VertRouter, "getAmountsOut">({
    contract: vertRouter,
    functionName: "getAmountsOut",
    abi: VertRouterAbi,
    functionArgs: [
      sellAmount.numerator.toString(),
      [
        "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd",
        "0xaB1a4d4f1D656d2450692D237fdD6C7f9146e814",
      ],
    ],
  })

  const amountOut = amountsOut[amountsOut.length - 1].toString()
  return amountOut
}

export const getAmountIn = async (buyAmount: CurrencyAmount<ERC20Token>) => {
  const amountsOut = await call<VertRouter, "getAmountsIn">({
    contract: vertRouter,
    functionName: "getAmountsIn",
    abi: VertRouterAbi,
    functionArgs: [
      buyAmount.numerator.toString(),
      [
        "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd",
        "0xaB1a4d4f1D656d2450692D237fdD6C7f9146e814",
      ],
    ],
  })

  const amountOut = amountsOut[0].toString()
  return amountOut
}

export const fiatToStableCoinAmount = (
  buyAmount: FiatAmount,
  stableCoin: ERC20Token,
  dollarRate: string
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
  dollarRate: string
): FiatAmount => {
  const USDAmount = FiatAmount.fromFractionalAmount(
    USD,
    stableCoinAmount.multiply(100).numerator,
    JSBI.exponentiate(TEN, JSBI.BigInt(stableCoinAmount.currency.decimals))
  )
  const NGNAmount = FiatAmount.fromOtherAmount(NGN, USDAmount, dollarRate)
  return NGNAmount
}
