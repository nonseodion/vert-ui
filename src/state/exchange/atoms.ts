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

  buyToken: { fiat: Fiat; logo: string }
  buyAmount: FiatAmount | ""

  dollarRate: number
  preferredFiat: { fiat: Fiat; logo: string }

  dollarRates: { [key in keyof typeof supportedFiat]: number }
}

export const exchangeAtom = atom<Exchange>({
  sellToken: { token: defaultSellToken, logo: defaultSellLogo },
  sellAmount: "",

  buyToken: supportedFiat.ngn,
  buyAmount: "",
  dollarRate: 1,
  preferredFiat: supportedFiat.usd,

  dollarRates: { usd: 1, ngn: 745 },
})

export const sellAmountAtom = atom(
  null,
  (get, set, sellAmount: Exchange["sellAmount"]) => {
    set(exchangeAtom, { ...get(exchangeAtom), sellAmount })
  }
)

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
