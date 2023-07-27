import { createContext } from "react"
import { Rates } from "./RatesContext"

export enum FiatTxEvents {
  SWAP = "swap",
  ARG_VALIDITY = "argValidity",
  SWAP_VALIDITY = "swapValidity",
  TX_CONFIRMATIONS = "txConfirmations",
  TX_CONFIRMATIONS_STATUS = "txConfirmationsStatus",
  EXCHANGE_STATUS = "exchangeStatus",
}

export const SupportedNetworks = {
  56: "bsc",
  97: "bscTestnet",
}

export type TxEventsSwapParams = {
  txHash: `0x${string}`
  sender: `0x${string}`
  bankCode: string
  accountName: string
  accountNumber: string
  rates: Rates
  network: (typeof SupportedNetworks)[56 | 97]
}

export type FiatTxValues = {
  sendSwapDetails?: (params: TxEventsSwapParams) => void
  txConfirmations: number
  argValidity?: boolean
  swapValidity?: boolean
  txConfirmationStatus?: boolean
  exchangeStatus?: "failed" | "fullfiled"
  reset?: () => void
}

const FiatTxContext = createContext<FiatTxValues>({
  txConfirmations: 0,
})

export default FiatTxContext
