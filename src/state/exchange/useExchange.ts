import { useAtomValue, useSetAtom } from "jotai"
import { useCallback, useMemo } from "react"
import { exchangeAtom, handleSetExchangeAtomCreator } from "./atoms"
import { SupportedFiat, supportedFiat } from "../../utils/constants/exchange"

export default function useExchange() {
  const {
    preferredFiat,
    dollarRate,
    dollarRates,
    sellToken,
    sellAmount,
    buyToken,
    buyAmount,
  } = useAtomValue(exchangeAtom)
  const set = useSetAtom(handleSetExchangeAtomCreator())

  const setPreferredFiat = useCallback(
    (fiat: SupportedFiat) => {
      set({ key: "preferredFiat", value: supportedFiat[fiat] })
    },
    [set]
  )

  const fiatDollarRate = useMemo(
    () => (preferredFiat.fiat.symbol === "NGN" ? dollarRate : 1),
    [dollarRate, preferredFiat.fiat.symbol]
  )

  return {
    preferredFiat,
    setPreferredFiat,
    dollarRate: fiatDollarRate,
    dollarRates,
    sellToken,
    sellAmount,
    buyAmount,
    buyToken,
  }
}
