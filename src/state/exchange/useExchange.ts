import { useAtomValue, useSetAtom } from "jotai"
import { useCallback, useEffect } from "react"
import { exchangeAtom, handleSetExchangeAtomCreator } from "./atoms"
import { SupportedFiat, supportedFiat } from "../../utils/constants/exchange"
import useRates from "../../hooks/useRates"

export default function useExchange() {
  const {
    preferredFiat,
    dollarRates,
    sellToken,
    sellAmount,
    buyToken,
    buyAmount,
    bankAccount,
    trade,
  } = useAtomValue(exchangeAtom)
  const set = useSetAtom(handleSetExchangeAtomCreator())

  const setPreferredFiat = useCallback(
    (fiat: SupportedFiat) => {
      set({ key: "preferredFiat", value: supportedFiat[fiat] })
    },
    [set]
  )

  const rates = useRates()
  useEffect(() => {
    if (!rates?.ngn) return

    set({
      key: "dollarRates",
      value: {
        ngn: rates.ngn,
        usd: 1,
      },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rates.ngn])

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
    bankAccount,
    trade,
  }
}
