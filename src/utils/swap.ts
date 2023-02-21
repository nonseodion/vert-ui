import { CurrencyAmount, ERC20Token } from "@pancakeswap/sdk"
import { VertRouter } from "./abis/types"
import getContracts from "./getContracts"
import { call } from "./blockClient"

const { vertRouter, VertRouterAbi } = getContracts()

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
