import { Currency, CurrencyAmount } from "@pancakeswap/sdk"
import { atom } from "jotai"
import Fiat from "../../utils/Fiat"
import FiatAmount from "../../utils/FiatAmount"
import {
  defaultSellLogo,
  defaultSellToken,
  supportedFiat,
} from "../../utils/constants/exchange"

interface Exchange {
  sellToken: { token: Currency; logo: string }
  sellAmount: CurrencyAmount<Currency> | ""

  buyToken: { token: Fiat; logo: string }
  buyAmount: FiatAmount | ""

  dollarRate: number
  preferredFiat: { token: Fiat; logo: string }
}

export const exchangeAtom = atom<Exchange>({
  sellToken: { token: defaultSellToken, logo: defaultSellLogo },
  sellAmount: "",

  buyToken: supportedFiat.ngn,
  buyAmount: "",
  dollarRate: 1,
  preferredFiat: supportedFiat.usd,
})

export const sellAmountAtom = atom(
  null,
  (get, set, sellAmount: Exchange["sellAmount"]) => {
    set(exchangeAtom, { ...get(exchangeAtom), sellAmount })
  }
)

export const exchangeSettingsAtom = atom((get) => {
  const { preferredFiat, dollarRate } = get(exchangeAtom)
  return { preferredFiat, dollarRate }
})

export const handleSetExchangeAtomCreator = <
  T extends keyof Exchange,
  K extends Exchange[T]
>() =>
  atom<null, [{ key: T; value: K }], unknown>(
    null,
    (get, set, update: { key: T; value: K }) => {
      set(exchangeAtom, { ...get(exchangeAtom), [update.key]: update.value })
    }
  )
