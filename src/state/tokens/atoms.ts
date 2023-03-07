import { atom } from "jotai"
import { groupBy } from "lodash"
import { ChainId } from "../../utils/config"
import { LOADSTATE, TokenInfo } from "../../utils/types"
import { defaultTokenInfo } from "../../utils/constants/tokens"

export type TokenList = {
  [key in ChainId]: TokenInfo[]
}

const EMPTY_LIST = {
  [ChainId.BSC]: [],
  [ChainId.BSC_TESTNET]: [],
}

export const defaultTokensStateAtom = atom<LOADSTATE>(LOADSTATE.UNLOADED)

export const defaultTokensAtom = atom<TokenList>(
  groupBy(defaultTokenInfo, (tokenInfo) => tokenInfo.chainId) as TokenList
)

export const otherTokensStateAtom = atom<LOADSTATE>(LOADSTATE.UNLOADED)

export const otherTokensAtom = atom<TokenList>(EMPTY_LIST)
