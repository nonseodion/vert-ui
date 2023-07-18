import {
  Currency,
  CurrencyAmount,
  ERC20Token,
  Fraction,
  JSBI,
  TEN,
  Trade,
  TradeType,
} from "@pancakeswap/sdk"
import { useChainId, useNetwork } from "wagmi"
import { useCallback, useEffect, useMemo, useState } from "react"
import { useAtom } from "jotai"
import { parseUnits } from "ethers/lib/utils"
import useTokens from "../../state/tokens/hooks"
import ngnLogo from "../../assets/icons/ngn.png"
import Fiat, { NGN } from "../../utils/Fiat"
import FiatAmount from "../../utils/FiatAmount"
import validateUserInput from "../../utils/validateConverterInput"
import { useTradeExactIn, useTradeExactOut } from "../useTrades"
import {
  fiatToStableCoinAmount,
  stableCoinAmountToFiat,
} from "../../utils/swap"
import {
  defaultSellLogo,
  defaultSellTokens,
  stableCoins,
  supportedFiat,
} from "../../utils/constants/exchange"
import { handleSetExchangeAtomCreator } from "../../state/exchange/atoms"
import { getTokenLogoURL, setCurrencyAmountCurrency } from "../../utils"
import { wrappedCurrency } from "../../utils/wrappedCurrency"
import useTokenPrices from "../useTokenPrices"
import { Balance, useBalances } from "../../state/balances/useBalances"
import useExchange from "../../state/exchange/useExchange"

let independentField: "sell" | "buy"
let exchangeRate: Fraction | undefined

interface ReturnTypes {
  sellAmount?: CurrencyAmount<Currency>
  sellToken: Currency
  setSellToken: (arg: {
    key: "sellToken"
    value: { token: ERC20Token; logo: string }
  }) => void
  setSellAmount: (_: string) => void
  sellLogos: string[]
  fiatSellEqv?: FiatAmount
  sellBalance: Balance

  buyToken: Fiat
  buyAmount?: FiatAmount
  buyLogos: string[]
  setBuyAmount: (_: string) => void
  fiatBuyEqv?: FiatAmount

  typedValue: string
  independentField: "sell" | "buy"
  tokens: Currency[]

  dollarRates: { [key in keyof typeof supportedFiat]: number }
  preferredFiat: { fiat: Fiat; logo: string }
  exchangeRate: Fraction | undefined
  trade?: Trade<
    Currency,
    Currency,
    TradeType.EXACT_INPUT | TradeType.EXACT_OUTPUT
  >
}

const useConverterInterface = (): ReturnTypes => {
  const chainId = useChainId()
  const { tokens } = useTokens()
  const buyToken = NGN
  const {
    sellToken: { token: sellTokenPlaceholder, logo: sellLogo },
    dollarRate,
    preferredFiat,
    dollarRates,
  } = useExchange()

  const sellToken = useMemo(
    () => sellTokenPlaceholder ?? defaultSellTokens[chainId],
    [chainId, sellTokenPlaceholder]
  )

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
  const [buyAmount, setBuyAmount] = useState<FiatAmount | undefined>()
  const [sellAmount, setSellAmount] = useState<
    CurrencyAmount<Currency> | undefined
  >()

  const amountToFetchPrice = useMemo(
    () => (sellAmount ? [sellAmount] : undefined),
    [sellAmount]
  )
  const sellTokenPrice = useTokenPrices(amountToFetchPrice)[0]
  const useBalancesInput = useMemo(() => [sellToken], [sellToken])
  const sellBalance = useBalances(useBalancesInput)[0]

  const tradeIn = useTradeExactIn(
    sellAmount ||
      CurrencyAmount.fromRawAmount(
        sellToken,
        JSBI.exponentiate(TEN, JSBI.BigInt(sellToken.decimals))
      ),
    stableCoins[chainId]
  )

  const stableCoinAmount = useMemo(
    () =>
      fiatToStableCoinAmount(
        buyAmount || FiatAmount.fromRawAmount(NGN, "1"),
        stableCoins[chainId],
        dollarRates.ngn
      ),
    [buyAmount, chainId, dollarRates.ngn]
  )
  const { chain } = useNetwork()

  const tradeOut = useTradeExactOut(
    sellToken,
    buyAmount
      ? stableCoinAmount
      : CurrencyAmount.fromRawAmount(
          stableCoins[chainId],
          JSBI.exponentiate(TEN, JSBI.BigInt(stableCoins[chainId]?.decimals))
        )
  )

  const trade = useMemo(
    () => (independentField === "sell" ? tradeIn : tradeOut),
    [tradeIn, tradeOut]
  )

  const [typedValue, setTypedValue] = useState<string>("")

  // validate and format inputted buyAmount before updating state
  const setBuyAmount1 = useCallback(
    (amount: string) => {
      independentField = "buy"
      const valid = validateUserInput(amount, buyToken.decimals)
      if (valid) {
        setTypedValue(amount)
        const newAmount =
          amount === ""
            ? undefined
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
            ? undefined
            : CurrencyAmount.fromRawAmount<Currency>(
                sellToken,
                parseUnits(amount, sellToken.decimals).toString()
              )

        setSellAmount(newAmount)
      }
    },
    [sellToken]
  )

  // get the fiat equivalent of the sellAmount
  const fiatSellEqv: FiatAmount | undefined = useMemo(() => {
    let amount
    if (sellTokenPrice && sellAmount) {
      const dollarBalance = sellAmount
        .multiply(sellTokenPrice)
        .multiply(sellTokenPrice.scalar)
      amount = stableCoinAmountToFiat(
        dollarBalance,
        dollarRate,
        preferredFiat.fiat
      )
    }
    return amount
  }, [sellTokenPrice, dollarRate, preferredFiat.fiat, sellAmount])

  // get the fiat equivalent of the buyAmount
  const fiatBuyEqv: FiatAmount | undefined = useMemo(() => {
    let amount

    if (buyAmount) {
      amount = FiatAmount.fromOtherAmount(
        preferredFiat.fiat,
        buyAmount,
        preferredFiat.fiat.symbol.toLowerCase() === "usd"
          ? new Fraction(1, dollarRates.ngn * 100).multiply(100)
          : 1
      )
    }
    return amount
  }, [buyAmount, dollarRates, preferredFiat.fiat])

  // exchange rate of buyToken and sellToken, updates with amount change
  exchangeRate = useMemo(() => {
    if (buyAmount && sellAmount) {
      if (sellAmount.equalTo(0)) return undefined
      return new Fraction(
        buyAmount
          .toDollarAmount(
            dollarRates[
              preferredFiat.fiat.symbol.toLowerCase() === "usd" ? "ngn" : "usd"
            ] * 100
          )
          .multiply(sellAmount.decimalScale)
          .multiply(100)
          .divide(buyAmount.decimalScale)
          .toFixed(0),
        sellAmount
          .multiply(sellAmount.decimalScale)
          .divide(buyAmount.decimalScale)
          .toFixed(0)
      )
    }

    return undefined
  }, [buyAmount, sellAmount, dollarRates, preferredFiat.fiat.symbol])

  // set default sell token
  useEffect(() => {
    setSellToken({
      key: "sellToken",
      value: { token: defaultSellTokens[chainId], logo: defaultSellLogo },
    })
  }, [chainId, setSellToken])

  // update sellAmount when sellToken changes
  useEffect(() => {
    setSellAmount((oldAmount) =>
      oldAmount ? setCurrencyAmountCurrency(oldAmount, sellToken) : undefined
    )
  }, [sellToken])

  // update buyAmount when sellAmount or sellToken changes
  useEffect(() => {
    if (!sellAmount && !buyAmount) return

    if (
      sellAmount &&
      sellAmount.toExact() !== "0" &&
      independentField === "sell"
    ) {
      ;(async (): Promise<void> => {
        const amountOut =
          sellToken.symbol === stableCoins[chainId].symbol
            ? sellAmount
            : tradeIn?.outputAmount ?? ""

        const NGNAmount = amountOut
          ? stableCoinAmountToFiat(amountOut, dollarRates.ngn, NGN)
          : undefined
        setBuyAmount(NGNAmount)
      })()
    } else if (
      (!sellAmount || sellAmount.toExact() === "0") &&
      independentField === "sell"
    ) {
      setBuyAmount(undefined)
    } else if (independentField !== "sell" && typedValue === "") {
      setSellAmount(undefined)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sellAmount, tradeIn?.outputAmount, dollarRates.ngn])

  // update sellAmount when buyAmount changes
  useEffect(() => {
    if (!buyAmount && !sellAmount) return

    if (
      buyAmount &&
      buyAmount.toExact() !== "0" &&
      independentField === "buy"
    ) {
      ;(async (): Promise<void> => {
        const amountIn =
          sellToken.symbol === stableCoins[chainId].symbol
            ? fiatToStableCoinAmount(
                buyAmount,
                stableCoins[chainId],
                dollarRates.ngn
              )
            : tradeOut?.inputAmount ?? undefined
        setSellAmount(amountIn)
      })()
    } else if (
      (!buyAmount || buyAmount.toExact() === "0") &&
      independentField === "buy"
    ) {
      setSellAmount(undefined)
    } else if (independentField !== "buy" && typedValue === "") {
      setBuyAmount(undefined)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buyAmount, tradeOut?.inputAmount])

  return {
    sellAmount,
    sellToken,
    setSellToken,
    setSellAmount: setSellAmount1,
    sellLogos: [
      sellLogo || defaultSellLogo,
      getTokenLogoURL(wrappedCurrency(sellToken, chain?.id)) ?? "",
    ],
    fiatSellEqv,
    sellBalance,

    buyToken,
    buyAmount,
    buyLogos: [ngnLogo],
    setBuyAmount: setBuyAmount1,
    fiatBuyEqv,

    typedValue,
    independentField: independentField ?? "sell",
    tokens,

    dollarRates,
    preferredFiat,
    exchangeRate,
    trade,
  }
}

export default useConverterInterface
