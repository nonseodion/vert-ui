import { ERC20Token, JSBI, Percent } from "@pancakeswap/sdk"
import { ChainId, activeChainId } from "../config"
import { ChainTokenList } from "."
import { bscTokens, bscTestnetTokens } from "./tokens"
import ngnLogo from "../../assets/icons/ngn.png"
import usdLogo from "../../assets/icons/usd.svg"
import Fiat, { NGN, USD } from "../Fiat"

export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
  [ChainId.BSC]: [
    bscTokens.wbnb,
    bscTokens.cake,
    bscTokens.busd,
    bscTokens.usdt,
    bscTokens.btcb,
    bscTokens.eth,
    bscTokens.usdc,
  ],
  [ChainId.BSC_TESTNET]: [
    bscTestnetTokens.wbnb,
    bscTestnetTokens.cake,
    bscTestnetTokens.busd,
  ],
}

export const stableCoin =
  activeChainId === ChainId.BSC ? bscTokens.busd : bscTestnetTokens.busd
export const defaultSellToken =
  activeChainId === ChainId.BSC ? bscTokens.busd : bscTestnetTokens.busd
export const defaultSellLogo =
  "https://tokens.pancakeswap.finance/images/symbol/bnb.png"

export type SupportedFiat = "ngn" | "usd"

export const supportedFiat: {
  [key in SupportedFiat]: { fiat: Fiat; logo: string }
} = {
  usd: {
    fiat: USD,
    logo: usdLogo,
  },
  ngn: {
    fiat: NGN,
    logo: ngnLogo,
  },
}

export const pinnedTokens: { [key in ChainId]: [ERC20Token, string][] } = {
  [ChainId.BSC]: [
    [
      bscTokens.wbnb,
      "https://tokens.pancakeswap.finance/images/symbol/bnb.png",
    ],
    [
      bscTokens.busd,
      "https://tokens.pancakeswap.finance/images/symbol/busd.png",
    ],
    [
      bscTokens.usdt,
      "https://tokens.pancakeswap.finance/images/symbol/usdt.png",
    ],
    [
      bscTokens.usdc,
      "https://tokens.pancakeswap.finance/images/symbol/usdc.png",
    ],
    [bscTokens.dai, "https://tokens.pancakeswap.finance/images/symbol/dai.png"],
    [
      bscTokens.btcb,
      "https://tokens.pancakeswap.finance/images/symbol/wbtc.png",
    ],
  ],
  [ChainId.BSC_TESTNET]: [
    [
      bscTestnetTokens.wbnb,
      "https://tokens.pancakeswap.finance/images/symbol/bnb.png",
    ],
    [
      bscTestnetTokens.busd,
      "https://tokens.pancakeswap.finance/images/symbol/busd.png",
    ],
  ],
}

export const BIG_INT_TEN = JSBI.BigInt(10)
export const BIG_INT_ZERO = JSBI.BigInt(0)

// used to ensure the user doesn't send so much BNB so they end up with <.01
export const MIN_BNB: JSBI = JSBI.exponentiate(BIG_INT_TEN, JSBI.BigInt(16)) // .01 BNB

export const BIPS_BASE = JSBI.BigInt(10000)
export const BETTER_TRADE_LESS_HOPS_THRESHOLD = new Percent(
  JSBI.BigInt(50),
  BIPS_BASE
)
