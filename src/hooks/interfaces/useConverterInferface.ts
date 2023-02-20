import { CurrencyAmount, ERC20Token } from "@pancakeswap/sdk"
import { useEffect, useState } from "react"
import { parseUnits } from "ethers/lib/utils"
import { VertRouter } from "../../utils/abis/types"
import blockClient from "../../utils/blockClient"
import useContracts from "../useContracts"
import useTokens from "../useTokens"
import busd from "../../assets/icons/busd.png"
import bnb from "../../assets/icons/bnb.png"

const useConverterInterface = () => {
  const { vertRouter, VertRouterAbi } = useContracts()
  const { call } = blockClient()
  const tokens = useTokens()
  const [sellToken, setSellToken] = useState<ERC20Token>(tokens[1])
  const [buyToken, setBuyToken] = useState<ERC20Token>(tokens[0])
  const [buyAmount, setBuyAmount1] = useState<CurrencyAmount<ERC20Token> | "">(
    ""
  )
  const [sellAmount, setSellAmount1] = useState<
    CurrencyAmount<ERC20Token> | ""
  >("")
  const [typedValue, setTypedValue] = useState<string>("")
  const logos = [busd, bnb]

  const setBuyAmount = (amount: string) => {
    const newAmount =
      amount === ""
        ? amount
        : CurrencyAmount.fromRawAmount<ERC20Token>(buyToken, amount)
    setBuyAmount1(newAmount)
  }

  const setSellAmount = (amount: string) => {
    // eslint-disable-next-line prefer-regex-literals
    const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`) // match escaped "." characters via in a non-capturing group
    const escapeRegex = /[.*+?^${}()|[\]\\]/g

    // ensure amount does not exceed token decimals
    const decimalPortion = amount.split(".")[1]
    const decimalSafe = decimalPortion
      ? decimalPortion.length <= sellToken.decimals
      : true

    if (
      (amount === "" || inputRegex.test(amount.replace(escapeRegex, "\\$&"))) && // test for unwanted characters
      decimalSafe
    ) {
      setTypedValue(amount)
      const newAmount =
        amount === ""
          ? amount
          : CurrencyAmount.fromRawAmount<ERC20Token>(
              sellToken,
              parseUnits(amount, sellToken.decimals).toString()
            )

      setSellAmount1(newAmount)
    }
  }

  useEffect(() => {
    if (sellAmount && buyToken) {
      const getAmountOut = async () => {
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

        setBuyAmount(amountOut)
      }

      getAmountOut()
    } else if (sellAmount === "") {
      setBuyAmount("")
    }
  }, [sellToken, sellAmount])

  // unset buyAmount if typedValue is empty
  useEffect(() => {
    if (buyAmount === "") return
    if (typedValue === "") {
      setBuyAmount("")
    }
  }, [buyAmount])

  return {
    sellAmount: sellAmount === "" ? sellAmount : sellAmount.toExact(),
    sellToken,
    setSellToken,
    setSellAmount,
    sellLogo: bnb,

    buyToken,
    buyAmount: buyAmount === "" ? buyAmount : buyAmount.toFixed(6),
    setBuyToken,
    buyLogo: busd,
    typedValue,

    tokens,
    logos,
  }
}

export default useConverterInterface
