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

export const tokensStateAtom = atom<LOADSTATE>(LOADSTATE.UNLOADED)

export const tokensAtom = atom<TokenList>(EMPTY_LIST)
