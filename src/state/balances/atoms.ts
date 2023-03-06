import { CurrencyAmount, ERC20Token } from "@pancakeswap/sdk"
import { atom } from "jotai"

export const balancesAtom = atom<{ [key: string]: CurrencyAmount<ERC20Token> }>(
  {}
)

export const setBalancesAtom = atom(
  null,
  (get, set, balances: { [key: string]: CurrencyAmount<ERC20Token> }) => {
    const oldBalances = get(balancesAtom)
    return set(balancesAtom, { ...oldBalances, ...balances })
  }
)
