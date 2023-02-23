// wraps wagmi library to conform with the Wallet interface in useWallet

import { useConnect, Connector, useDisconnect, useAccount } from "wagmi"
import { MetaMaskConnector } from "wagmi/connectors/metaMask"
import { InjectedConnector } from "wagmi/connectors/injected"
import { WalletConnectConnector } from "wagmi/connectors/walletConnect"
// import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { activeChainId } from "../utils/config"

export enum Wallets {
  METAMASK = "metamask",
  INJECTED = "injected",
  WALLETCONNECT = "walletconnect",
  COINBASE = "COINBASE",
}

export interface Wallet {
  connected: boolean
  connect: (name: Wallets) => Promise<void>
  disconnect: () => Promise<void>
  address: `0x${string}` | undefined
}

const walletToConnector = new Map<Wallets, Connector>([
  [Wallets.METAMASK, new MetaMaskConnector()],
  [Wallets.INJECTED, new InjectedConnector()],
  [
    Wallets.WALLETCONNECT,
    new WalletConnectConnector({
      options: { qrcode: true },
    }),
  ],
  // [Connectors.COINBASE, new CoinbaseWalletConnector()]
])

const useWrapWagmi = (): Wallet => {
  const { connectAsync } = useConnect({ chainId: activeChainId })
  const { disconnectAsync } = useDisconnect()
  const { address, isConnected } = useAccount()

  const connectWallet = async (name: Wallets): Promise<void> => {
    try {
      await connectAsync({
        connector: walletToConnector.get(name),
      })
    } catch (err) {
      throw Error((err as Error).message)
    }
  }

  const disconnectWallet = async () => {
    try {
      await disconnectAsync()
    } catch (err) {
      throw Error((err as Error).message)
    }
  }

  return {
    connect: connectWallet,
    disconnect: disconnectWallet,
    address,
    connected: isConnected,
  }
}

export default useWrapWagmi
