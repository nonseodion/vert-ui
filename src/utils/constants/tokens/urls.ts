import { TokenInfo } from "../../../state/tokens/atoms"

export const PANCAKE_EXTENDED =
  "https://tokens.pancakeswap.finance/pancakeswap-extended.json"
export const COINGECKO = "https://tokens.pancakeswap.finance/coingecko.json"
export const CMC = "https://tokens.pancakeswap.finance/cmc.json"

export interface TokenResponse {
  name: string
  timestamp: string
  version: {
    major: number
    minor: number
    patch: number
  }
  tags: {}
  logoURI: string
  keywords: string[]
  tokens: TokenInfo[]
}

export const DEFAULT_TOKEN_LIST_URLS = [PANCAKE_EXTENDED]
export const OTHER_TOKEN_LIST_URLS = [COINGECKO, CMC]
