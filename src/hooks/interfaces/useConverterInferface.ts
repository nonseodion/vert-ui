import {
  Currency,
  CurrencyAmount,
  ERC20Token,
  JSBI,
  TEN,
} from "@pancakeswap/sdk"
import { useCallback, useEffect, useMemo, useState } from "react"
import { useAtom, useAtomValue } from "jotai"

import { parseUnits } from "ethers/lib/utils"
import useTokens from "../../state/tokens/hooks"
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
import { stableCoin } from "../../utils/constants/exchange"
import {
  exchangeAtom,
  handleSetExchangeAtomCreator,
} from "../../state/exchange/atoms"

let independentField: "sell" | "buy"

interface ReturnTypes {
  sellAmount: string
  sellToken: Currency
  setSellToken: (arg: {
    key: "sellToken"
    value: { token: ERC20Token; logo: string }
  }) => void
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

const useConverterInterface = (): ReturnTypes => {
  const { tokens } = useTokens()
  const buyToken = NGN
  const dollarRate = "745"
  const {
    sellToken: { token: sellToken, logo: sellLogo },
  } = useAtomValue(exchangeAtom)
  const [, setSellToken] = useAtom(
    useMemo(
      () =>
        handleSetExchangeAtomCreator<
          "sellToken",
          { token: ERC20Token; logo: string }
        >(),
      []
    )
  )
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

  // console.log(
  //   tradeIn?.outputAmount.toExact(),
  //   sellToken.symbol,
  //   tradeIn?.route.path.map((t) => t.symbol)
  // )

  const stableCoinAmount = useMemo(
    () =>
      fiatToStableCoinAmount(
        buyAmount || FiatAmount.fromRawAmount(NGN, "1"),
        stableCoin,
        dollarRate
      ),
    [buyAmount, dollarRate]
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

  // update sellAmount when sellToken changes
  useEffect(() => {
    setSellAmount((oldAmount) =>
      oldAmount === ""
        ? ""
        : CurrencyAmount.fromFractionalAmount(
            sellToken,
            oldAmount.numerator,
            oldAmount.denominator
          )
    )
  }, [sellToken])

  // update buyAmount when sellAmount or sellToken changes
  useEffect(() => {
    if (sellAmount === "" && buyAmount === "") return

    if (
      sellAmount &&
      sellAmount.toExact() !== "0" &&
      independentField === "sell"
    ) {
      ;(async (): Promise<void> => {
        const amountOut = tradeIn?.outputAmount ?? ""
        const NGNAmount =
          amountOut !== ""
            ? stableCoinAmountToFiat(amountOut, dollarRate)
            : amountOut
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
  }, [sellAmount, tradeIn?.outputAmount])

  // update sellAmount when buyAmount changes
  useEffect(() => {
    if (buyAmount === "" && sellAmount === "") return

    if (
      buyAmount &&
      buyAmount.toExact() !== "0" &&
      independentField === "buy"
    ) {
      ;(async (): Promise<void> => {
        const amountIn = tradeOut?.inputAmount ?? ""
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
  }, [buyAmount, tradeOut?.inputAmount])

  return {
    sellAmount:
      sellAmount === ""
        ? sellAmount
        : removeTrailingZeros(sellAmount.toFixed()),
    sellToken,
    setSellToken,
    setSellAmount: setSellAmount1,
    sellLogo,

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
