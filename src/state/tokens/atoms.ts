import { atom } from "jotai"

import { ChainId } from "../../utils/config"
import { LOADSTATE } from "../../utils/types"

export interface TokenInfo {
  readonly chainId: number
  readonly address: `0x${string}`
  readonly name: string
  readonly decimals: number
  readonly symbol: string
  readonly logoURI?: string
}

export type TokenList = {
  [key in ChainId]: TokenInfo[]
}

const EMPTY_LIST = {
  [ChainId.BSC]: [],
  [ChainId.BSC_TESTNET]: [],
}

export const defaultTokensStateAtom = atom<LOADSTATE>(LOADSTATE.UNLOADED)

export const defaultTokensAtom = atom<TokenList>(EMPTY_LIST)

export const otherTokensStateAtom = atom<LOADSTATE>(LOADSTATE.UNLOADED)

export const otherTokensAtom = atom<TokenList>(EMPTY_LIST)
