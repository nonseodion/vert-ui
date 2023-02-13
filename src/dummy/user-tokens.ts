import binance from "../assets/icons/binance.png"
import bnb from "../assets/icons/bnb.png"
import usdc from "../assets/icons/usdc.png"
import usdt from "../assets/icons/usdt.png"
import dai from "../assets/icons/dai.png"
import btcb from "../assets/icons/btcb.png"
import rkv from "../assets/icons/rkv.png"
import wkd from "../assets/icons/wkd.png"
import frl from "../assets/icons/frl.png"

const userTokens = [
  { token: "BNB", icon: bnb },
  { token: "WBNB", icon: bnb },
  { token: "USDC", icon: usdc },
  { token: "DAI", icon: dai },
  { token: "USDT", icon: usdt },
  { token: "BTCB", icon: btcb },
]

export const availableTokens = [
  { icon: bnb, token: "BNB", token_name: "BNB" },
  { icon: bnb, token: "WBNB", token_name: "Wrapped BNB" },
  { icon: usdc, token: "USDC", token_name: "USD Coin" },
  { icon: dai, token: "DAI", token_name: "Dai Token" },
  { icon: usdt, token: "USDT", token_name: "Tether USD" },
]

export const importedTokens = [
  {
    icon: frl,
    token: "FRL",
    source: "Binance Smart Chain Mainnet",
    source_icon: binance,
  },
  {
    icon: wkd,
    token: "WKD",
    source: "Binance Smart Chain Mainnet",
    source_icon: binance,
  },
  {
    icon: rkv,
    token: "RKV",
    source: "Binance Smart Chain Mainnet",
    source_icon: binance,
  },
]

export default userTokens
