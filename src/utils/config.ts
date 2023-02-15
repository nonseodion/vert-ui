import { configureChains, createClient } from "wagmi"
import { jsonRpcProvider } from "wagmi/providers/jsonRpc"
import { publicProvider } from "wagmi/providers/public"
import { bsc, bscTestnet } from "wagmi/chains"

const chains = [bsc, bscTestnet]
const { provider, webSocketProvider } = configureChains(chains, [
  jsonRpcProvider({
    rpc: () => ({
      http: `https://bsc-dataseed.binance.org`,
    }),
  }),
  jsonRpcProvider({
    rpc: () => ({
      http: `https://data-seed-prebsc-1-s1.binance.org:8545`,
    }),
  }),
  publicProvider(),
])

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
})

const chainId = process.env.NODE_ENV === "test" ? chains[1].id : chains[0].id

export { client, chains, chainId }
