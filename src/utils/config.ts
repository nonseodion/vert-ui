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

const rpcUrls = {
  97: "https://data-seed-prebsc-1-s1.binance.org:8545",
  56: "http://localhost:8545", // "https://bsc-dataseed.binance.org",
}

export const { provider, webSocketProvider } = configureChains(
  [chains.bsc, chains.bscTestnet],
  [
    jsonRpcProvider({
      rpc: (chain) => ({ http: rpcUrls[chain.id as keyof typeof rpcUrls] }),
    }),
    publicProvider(),
  ]
)

export const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
})
