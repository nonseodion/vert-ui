import { configureChains, createClient } from "wagmi"
import { jsonRpcProvider } from "wagmi/providers/jsonRpc"
import { publicProvider } from "wagmi/providers/public"
import { bscTestnet, bsc } from "wagmi/chains"

export const chains = { bsc, bscTestnet }
export const activeChainId: ChainId =
  process.env.NODE_ENV === "development" ? chains.bscTestnet.id : 56

export enum ChainId {
  BSC = bsc.id,
  BSC_TESTNET = bscTestnet.id,
}

export const chain = activeChainId === 56 ? bsc : bscTestnet

export const rpcUrl =
  activeChainId === 56
    ? `https://bsc-dataseed.binance.org`
    : `https://data-seed-prebsc-1-s1.binance.org:8545`

export const { provider, webSocketProvider } = configureChains(
  [chain],
  [
    jsonRpcProvider({
      rpc: () => ({
        http: rpcUrl,
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
