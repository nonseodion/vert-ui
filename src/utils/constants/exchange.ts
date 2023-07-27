import { ERC20Token, JSBI, Percent } from "@pancakeswap/sdk"
import { ChainId } from "../config"
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

export const stableCoins = {
  [ChainId.BSC]: bscTokens.busd,
  [ChainId.BSC_TESTNET]: bscTestnetTokens.busd,
}
export const defaultSellTokens = {
  [ChainId.BSC]: bscTokens.busd,
  [ChainId.BSC_TESTNET]: bscTestnetTokens.busd,
}
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

export const ONE_HUNDRED_PERCENT = new Percent("1")

export const BASE_FEE = new Percent(JSBI.BigInt(25), BIPS_BASE)
export const INPUT_FRACTION_AFTER_FEE = ONE_HUNDRED_PERCENT.subtract(BASE_FEE)

// used for warning states
export const ALLOWED_PRICE_IMPACT_LOW: Percent = new Percent(
  JSBI.BigInt(100),
  BIPS_BASE
) // 1%
export const ALLOWED_PRICE_IMPACT_MEDIUM: Percent = new Percent(
  JSBI.BigInt(300),
  BIPS_BASE
) // 3%
export const ALLOWED_PRICE_IMPACT_HIGH: Percent = new Percent(
  JSBI.BigInt(500),
  BIPS_BASE
) // 5%
// if the price slippage exceeds this number, force the user to type 'confirm' to execute
export const PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN: Percent = new Percent(
  JSBI.BigInt(1000),
  BIPS_BASE
) // 10%
// for non expert mode disable swaps above this
export const BLOCKED_PRICE_IMPACT_NON_EXPERT: Percent = new Percent(
  JSBI.BigInt(1500),
  BIPS_BASE
) // 15%

export enum Field {
  SELL = "SELL",
  BUY = "BUY",
}
