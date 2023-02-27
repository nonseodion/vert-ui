import { CurrencyAmount, ERC20Token } from "@pancakeswap/sdk"
import { atom } from "jotai"
import Fiat, { NGN } from "../../utils/Fiat"
import FiatAmount from "../../utils/FiatAmount"
import {
  defaultSellLogo,
  defaultSellToken,
} from "../../utils/constants/exchange"
import ngnLogo from "../../assets/icons/ngn.png"

interface Exchange {
  sellToken: { token: ERC20Token; logo: string }
  sellAmount: CurrencyAmount<ERC20Token> | ""

  buyToken: { token: Fiat; logo: string }
  buyAmount: FiatAmount | ""

  dollarRate: string
}

export const exchangeAtom = atom<Exchange>({
  sellToken: { token: defaultSellToken, logo: defaultSellLogo },
  sellAmount: "",

  buyToken: { token: NGN, logo: ngnLogo },
  buyAmount: "",
  dollarRate: "",
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
