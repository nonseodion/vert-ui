// wraps wagmi library to conform with the Wallet interface in useWallet

import {
  useConnect,
  Connector,
  useDisconnect,
  useAccount,
  useChainId,
} from "wagmi"
import { MetaMaskConnector } from "wagmi/connectors/metaMask"
import { InjectedConnector } from "wagmi/connectors/injected"
import { WalletConnectConnector } from "wagmi/connectors/walletConnect"
// import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import trustwallet from "../../assets/icons/trustwallet.png"
import walletconnect from "../../assets/icons/walletconnect.png"
import metamask from "../../assets/icons/metamask.png"
// import binance from "../../assets/icons/binance.png"

export enum Wallets {
  METAMASK = "MetaMask",
  TRUST_WALLET = "Trust Wallet",
  WALLET_CONNECT = "WalletConnect",
  COINBASE = "COINBASE",
  BINANCE_WALLET = "Binance Chain Wallet",
}

export const walletProviders = [
  { wallet: Wallets.METAMASK, icon: metamask },
  // { wallet: Wallets., icon: binance },
  { wallet: Wallets.TRUST_WALLET, icon: trustwallet },
  { wallet: Wallets.WALLET_CONNECT, icon: walletconnect },
]

export interface Wallet {
  connected: boolean
  connect: (name: Wallets) => Promise<void>
  disconnect: () => Promise<void>
  address: `0x${string}` | undefined
  connecting: boolean
  walletProvider: { name: Wallets; icon: string }
}

const walletToConnector = new Map<Wallets, Connector>([
  [Wallets.METAMASK, new MetaMaskConnector()],
  [Wallets.TRUST_WALLET, new InjectedConnector()],
  [
    Wallets.WALLET_CONNECT,
    new WalletConnectConnector({
      options: { qrcode: true },
    }),
  ],
  // [Connectors.COINBASE, new CoinbaseWalletConnector()]
])

const useWallet = (): Wallet => {
  const chainId = useChainId()
  const { connectAsync } = useConnect({ chainId })
  const { disconnectAsync } = useDisconnect()
  const { address, isConnected, isConnecting } = useAccount()
  let walletProvider: { name: Wallets; icon: string } = {
    name: Wallets.METAMASK,
    icon: metamask,
  }

  const connectWallet = async (name: Wallets): Promise<void> => {
    try {
      await connectAsync({
        connector: walletToConnector.get(name),
      })
      walletProvider = {
        name,
        icon: walletProviders.filter((provider) => provider.wallet === name)[0]
          .icon,
      }
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
    connecting: isConnecting,
    walletProvider,
  }
}

export default useWallet
