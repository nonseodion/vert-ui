import { CurrencyAmount, ERC20Token, JSBI, TEN } from "@pancakeswap/sdk"
import { useEffect, useMemo, useState } from "react"
import { parseUnits } from "ethers/lib/utils"
import useTokens from "../useTokens"
import ngn from "../../assets/icons/ngn.png"
import busd from "../../assets/icons/busd.png"
import bnb from "../../assets/icons/bnb.png"
import { USD, NGN } from "../../utils/Fiat"
import FiatAmount from "../../utils/FiatAmount"
import { getAmountIn, getAmountOut } from "../../utils/swap"
import validateUserInput from "../../utils/validateConverterInput"
import removeTrailingZeros from "../../utils/removeTrailingZeros"

let independentField: "sell" | "buy"

const useConverterInterface = () => {
  const tokens = useTokens()
  const buyToken = NGN
  const dollarRate = 745
  const BUSD = useMemo(
    () => tokens.filter((token) => token.symbol === "BUSD")[0],
    [tokens]
  )

  const [sellToken, setSellToken] = useState<ERC20Token>(tokens[1])
  const [buyAmount, setBuyAmount] = useState<FiatAmount | "">("")
  const [sellAmount, setSellAmount] = useState<CurrencyAmount<ERC20Token> | "">(
    ""
  )

  const [typedValue, setTypedValue] = useState<string>("")
  const logos = [busd, bnb]

  // validate and format inputted buyAmount before updating state
  const setBuyAmount1 = (amount: string) => {
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
  }

  // validate and format inputted sellAmount before updating state
  const setSellAmount1 = (amount: string) => {
    independentField = "sell"
    const valid = validateUserInput(amount, sellToken.decimals)
    if (valid) {
      setTypedValue(amount)
      const newAmount =
        amount === ""
          ? amount
          : CurrencyAmount.fromRawAmount<ERC20Token>(
              sellToken,
              parseUnits(amount, sellToken.decimals).toString()
            )

      setSellAmount(newAmount)
    }
  }

  // update buyAmount when sellAmount or sellToken changes
  useEffect(() => {
    if (sellAmount === "" && buyAmount === "") return

    if (
      sellAmount &&
      sellAmount.toExact() !== "0" &&
      independentField === "sell"
    ) {
      let amountOut: string
      ;(async (): Promise<void> => {
        amountOut = await getAmountOut(sellAmount)

        const busdAmount = CurrencyAmount.fromRawAmount(BUSD, amountOut)
        const USDAmount = FiatAmount.fromFractionalAmount(
          USD,
          busdAmount.multiply(100).numerator,
          JSBI.exponentiate(TEN, JSBI.BigInt(busdAmount.currency.decimals))
        )
        const NGNAmount = FiatAmount.fromOtherAmount(NGN, USDAmount, dollarRate)
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
  }, [sellToken, sellAmount])

  // update sellAmount when buyAmount changes
  useEffect(() => {
    if (buyAmount === "" && sellAmount === "") return

    if (
      buyAmount &&
      buyAmount.toExact() !== "0" &&
      independentField === "buy"
    ) {
      let amountIn: string
      ;(async (): Promise<void> => {
        const usdAmount = buyAmount.toDollarAmount(dollarRate)
        const rawBUSDAmount = usdAmount
          .multiply(
            JSBI.exponentiate(TEN, JSBI.BigInt(BUSD.decimals)).toString()
          )
          .toFixed(0)
        const busdAmount = CurrencyAmount.fromRawAmount(BUSD, rawBUSDAmount)
        amountIn = await getAmountIn(busdAmount)

        const tokenAmount = CurrencyAmount.fromRawAmount<ERC20Token>(
          sellToken,
          amountIn
        )
        setSellAmount(tokenAmount)
      })()
    } else if (
      (buyAmount === "" || buyAmount.toExact() === "0") &&
      independentField === "buy"
    ) {
      setSellAmount("")
    } else if (independentField !== "buy" && typedValue === "") {
      setBuyAmount("")
    }
  }, [buyAmount])

  return {
    sellAmount:
      sellAmount === ""
        ? sellAmount
        : removeTrailingZeros(sellAmount.toFixed()),
    sellToken,
    setSellToken,
    setSellAmount: setSellAmount1,
    sellLogo: bnb,

    buyToken,
    buyAmount:
      buyAmount === "" ? buyAmount : removeTrailingZeros(buyAmount.toFixed()),
    buyLogo: ngn,
    setBuyAmount: setBuyAmount1,

    typedValue,
    independentField: independentField ?? "sell",
    tokens,
    logos,
  }
}

export default useConverterInterface
