import { Currency, CurrencyAmount } from "@pancakeswap/sdk"
import { atom } from "jotai"

export const balancesAtom = atom<{ [key: string]: CurrencyAmount<Currency> }>(
  {}
)

export const setBalancesAtom = atom(
  null,
  (get, set, balances: { [key: string]: CurrencyAmount<Currency> }) => {
    const oldBalances = get(balancesAtom)
    return set(balancesAtom, { ...oldBalances, ...balances })
  }
)
