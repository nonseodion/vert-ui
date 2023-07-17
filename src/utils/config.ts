import { configureChains, createClient } from "wagmi"
import { jsonRpcProvider } from "wagmi/providers/jsonRpc"
import { publicProvider } from "wagmi/providers/public"
import { bscTestnet, bsc } from "wagmi/chains"

export const chains = { bsc, bscTestnet }
export const defaultChainId: 56 | 97 =
  process.env.NODE_ENV === "development" ? chains.bscTestnet.id : chains.bsc.id

export enum ChainId {
  BSC = bsc.id,
  BSC_TESTNET = bscTestnet.id,
}

export const defaultChain = defaultChainId === 56 ? bsc : bscTestnet

export const { provider, webSocketProvider } = configureChains(
  [chains.bsc, chains.bscTestnet],
  [
    jsonRpcProvider({
      rpc: () => ({
        http: "https://bsc-dataseed.binance.org",
      }),
    }),
    jsonRpcProvider({
      rpc: () => ({
        http: "https://data-seed-prebsc-1-s1.binance.org:8545",
      }),
    }),
    publicProvider(),
  ]
)

export const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
})
