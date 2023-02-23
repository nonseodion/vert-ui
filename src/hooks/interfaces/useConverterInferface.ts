import { Currency, CurrencyAmount, JSBI, TEN } from "@pancakeswap/sdk"
import React, { useCallback, useEffect, useMemo, useState } from "react"
import { parseUnits } from "ethers/lib/utils"
import useTokens from "../useTokens"
import ngnLogo from "../../assets/icons/ngn.png"
import busdLogo from "../../assets/icons/busd.png"
import bnbLogo from "../../assets/icons/bnb.png"
import Fiat, { NGN } from "../../utils/Fiat"
import FiatAmount from "../../utils/FiatAmount"
import validateUserInput from "../../utils/validateConverterInput"
import removeTrailingZeros from "../../utils/removeTrailingZeros"
import { useTradeExactIn, useTradeExactOut } from "../useTrades"
import {
  fiatToStableCoinAmount,
  stableCoinAmountToFiat,
} from "../../utils/swap"

let independentField: "sell" | "buy"

interface Returntypes {
  sellAmount: string
  sellToken: Currency
  setSellToken: React.Dispatch<React.SetStateAction<Currency>>
  setSellAmount: (_: string) => void
  sellLogo: string

  buyToken: Fiat
  buyAmount: string
  buyLogo: string
  setBuyAmount: (_: string) => void

  typedValue: string
  independentField: "sell" | "buy"
  tokens: Currency[]
  logos: string[]
}

const useConverterInterface = (): Returntypes => {
  const tokens = useTokens()
  const buyToken = NGN
  const dollarRate = "745"
  const stableCoin = useMemo(
    () => tokens.filter((token) => token.symbol === "BUSD")[0],
    [tokens]
  )

  const [sellToken, setSellToken] = useState<Currency>(tokens[1])
  const [buyAmount, setBuyAmount] = useState<FiatAmount | "">("")
  const [sellAmount, setSellAmount] = useState<CurrencyAmount<Currency> | "">(
    ""
  )

  const tradeIn = useTradeExactIn(
    sellAmount ||
      CurrencyAmount.fromRawAmount(
        sellToken,
        JSBI.exponentiate(TEN, JSBI.BigInt(sellToken.decimals))
      ),
    stableCoin
  )

  const stableCoinAmount = useMemo(
    () =>
      fiatToStableCoinAmount(
        buyAmount || FiatAmount.fromRawAmount(NGN, "1"),
        stableCoin,
        dollarRate
      ),
    [buyAmount, dollarRate, stableCoin]
  )

  const tradeOut = useTradeExactOut(
    sellToken,
    buyAmount
      ? stableCoinAmount
      : CurrencyAmount.fromRawAmount(
          stableCoin,
          JSBI.exponentiate(TEN, JSBI.BigInt(stableCoin.decimals))
        )
  )

  const [typedValue, setTypedValue] = useState<string>("")
  const logos = [busdLogo, bnbLogo]

  // validate and format inputted buyAmount before updating state
  const setBuyAmount1 = useCallback(
    (amount: string) => {
      independentField = "buy"
      const valid = validateUserInput(amount, buyToken.decimals)
      if (valid) {
        setTypedValue(amount)
        const newAmount =
          amount === ""
            ? amount
            : FiatAmount.fromRawAmount(
                buyToken,
                parseUnits(amount, buyToken.decimals).toString()
              )

        setBuyAmount(newAmount)
      }
    },
    [buyToken]
  )

  // validate and format inputted sellAmount before updating state
  const setSellAmount1 = useCallback(
    (amount: string) => {
      independentField = "sell"
      const valid = validateUserInput(amount, sellToken.decimals)
      if (valid) {
        setTypedValue(amount)
        const newAmount =
          amount === ""
            ? amount
            : CurrencyAmount.fromRawAmount<Currency>(
                sellToken,
                parseUnits(amount, sellToken.decimals).toString()
              )

        setSellAmount(newAmount)
      }
    },
    [sellToken]
  )

  // update buyAmount when sellAmount or sellToken changes
  useEffect(() => {
    if (sellAmount === "" && buyAmount === "") return

    if (
      sellAmount &&
      sellAmount.toExact() !== "0" &&
      independentField === "sell"
    ) {
      ;(async (): Promise<void> => {
        const amountOut =
          tradeIn?.outputAmount ?? CurrencyAmount.fromRawAmount(stableCoin, "0")
        const NGNAmount = stableCoinAmountToFiat(amountOut, dollarRate)
        setBuyAmount(NGNAmount)
      })()
    } else if (
      (sellAmount === "" || sellAmount.toExact() === "0") &&
      independentField === "sell"
    ) {
      setBuyAmount("")
    } else if (independentField !== "sell" && typedValue === "") {
      setSellAmount("")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sellToken, sellAmount])

  // update sellAmount when buyAmount changes
  useEffect(() => {
    if (buyAmount === "" && sellAmount === "") return

    if (
      buyAmount &&
      buyAmount.toExact() !== "0" &&
      independentField === "buy"
    ) {
      ;(async (): Promise<void> => {
        const amountIn =
          tradeOut?.inputAmount ?? CurrencyAmount.fromRawAmount(sellToken, "0")
        setSellAmount(amountIn)
      })()
    } else if (
      (buyAmount === "" || buyAmount.toExact() === "0") &&
      independentField === "buy"
    ) {
      setSellAmount("")
    } else if (independentField !== "buy" && typedValue === "") {
      setBuyAmount("")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buyAmount])

  return {
    sellAmount:
      sellAmount === ""
        ? sellAmount
        : removeTrailingZeros(sellAmount.toFixed()),
    sellToken,
    setSellToken,
    setSellAmount: setSellAmount1,
    sellLogo: bnbLogo,

    buyToken,
    buyAmount:
      buyAmount === "" ? buyAmount : removeTrailingZeros(buyAmount.toFixed()),
    buyLogo: ngnLogo,
    setBuyAmount: setBuyAmount1,

    typedValue,
    independentField: independentField ?? "sell",
    tokens,
    logos,
  }
}

export default useConverterInterface
