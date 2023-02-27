import { ERC20Token } from "@pancakeswap/sdk"
import { ChainId, activeChainId } from "../config"
import { ChainTokenList } from "."
import { bscTokens, bscTestnetTokens } from "./tokens"

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
  activeChainId === ChainId.BSC ? bscTokens.wbnb : bscTestnetTokens.wbnb
export const defaultSellLogo =
  "https://tokens.pancakeswap.finance/images/symbol/bnb.png"

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
