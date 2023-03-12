import { useAtomValue, useSetAtom } from "jotai"
import { useCallback, useMemo } from "react"
import { exchangeSettingsAtom, handleSetExchangeAtomCreator } from "./atoms"
import { SupportedFiat, supportedFiat } from "../../utils/constants/exchange"

export default function useExchangeSettings() {
  const { preferredFiat, dollarRate } = useAtomValue(exchangeSettingsAtom)
  const set = useSetAtom(handleSetExchangeAtomCreator())

  const setPreferredFiat = useCallback(
    (fiat: SupportedFiat) => {
      set({ key: "preferredFiat", value: supportedFiat[fiat] })
    },
    [set]
  )

  const fiatDollarRate = useMemo(
    () => (preferredFiat.token.symbol === "NGN" ? dollarRate : 1),
    [dollarRate, preferredFiat.token.symbol]
  )

  return {
    preferredFiat,
    setPreferredFiat,
    dollarRate: fiatDollarRate,
  }
}
