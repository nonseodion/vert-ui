import { useAtomValue, useSetAtom } from "jotai"
import { useCallback } from "react"
import { exchangeAtom, handleSetExchangeAtomCreator } from "./atoms"
import { SupportedFiat, supportedFiat } from "../../utils/constants/exchange"

export default function useExchange() {
  const {
    preferredFiat,
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

  return {
    preferredFiat,
    setPreferredFiat,
    dollarRate:
      dollarRates[preferredFiat.fiat.symbol.toLowerCase() as SupportedFiat],
    dollarRates,
    sellToken,
    sellAmount,
    buyAmount,
    buyToken,
    setExchange: set,
  }
}
