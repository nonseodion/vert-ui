import { configureChains, createClient } from "wagmi"
import { jsonRpcProvider } from "wagmi/providers/jsonRpc"
import { publicProvider } from "wagmi/providers/public"
import { bscTestnet, bsc } from "wagmi/chains"

const chains = { bsc, bscTestnet }
const activeChainId: ChainId =
  process.env.NODE_ENV === "development" ? chains.bscTestnet.id : 56

const chainIds = { bsc: bsc.id, bscTestnet: bscTestnet.id }
const chain = activeChainId === 56 ? bsc : bscTestnet

const rpcUrl =
  activeChainId === 56
    ? `https://bsc-dataseed.binance.org`
    : `https://data-seed-prebsc-1-s1.binance.org:8545`

const { provider, webSocketProvider } = configureChains(
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

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
})

export type ChainId = (typeof chainIds)[keyof typeof chainIds]

export { client, chains, activeChainId, chainIds }
