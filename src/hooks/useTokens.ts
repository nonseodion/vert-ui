import { ERC20Token } from "@pancakeswap/sdk"
import { chainId } from "../utils/config"

type ChainTokens = [number, string, number, string, string]

const bscTokens: ChainTokens[] = [
  [
    56,
    "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
    18,
    "BUSD",
    "Binance-Pegged BUSD",
  ],
  [56, "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c", 18, "WBNB", "Wrapped BNB"],
]

const bscTestnetTokens: ChainTokens[] = [
  [
    97,
    "0xaB1a4d4f1D656d2450692D237fdD6C7f9146e814",
    18,
    "BUSD",
    "Binance-Pegged BUSD",
  ],
  [97, "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd", 18, "WBNB", "Wrapped BNB"],
]

const chainIdTokens = {
  56: bscTokens,
  97: bscTestnetTokens,
}

const useTokens = () => {
  const tokens = chainIdTokens[chainId].map((token) => new ERC20Token(...token))
  return tokens
}

export default useTokens
