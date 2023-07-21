import { Currency, CurrencyAmount, Trade, TradeType } from "@pancakeswap/sdk"
import { atom } from "jotai"
import Fiat from "../../utils/Fiat"
import FiatAmount from "../../utils/FiatAmount"
import { supportedFiat } from "../../utils/constants/exchange"
import { BankAccount } from "../../services/banks"

interface Exchange {
  sellToken: { token?: Currency; logo?: string }
  sellAmount: CurrencyAmount<Currency> | ""

  buyToken: { fiat: Fiat; logo: string }
  buyAmount: FiatAmount | ""

  trade?: Trade<Currency, Currency, TradeType>

  dollarRate: number
  preferredFiat: { fiat: Fiat; logo: string }

  dollarRates: { [key in keyof typeof supportedFiat]: number }

  bankAccount?: BankAccount
  txHash: `0x${string}`
}

export const exchangeAtom = atom<Exchange>({
  sellToken: {},
  sellAmount: "",

  trade: undefined,
  buyToken: supportedFiat.ngn,
  buyAmount: "",
  dollarRate: 1,
  preferredFiat: supportedFiat.usd,

  dollarRates: { usd: 1, ngn: 745 },

  bankAccount: undefined,
  txHash: "0x",
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
