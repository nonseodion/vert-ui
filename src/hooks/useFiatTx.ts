/* eslint-disable react-hooks/exhaustive-deps */
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"
import FiatTxContext, {
  TxEventsSwapParams,
  FiatTxEvents,
  FiatTxValues,
} from "../contexts/FiatTx"
import { txSocket } from "../services/socket.setup"

const sendSwapDetails = (params: TxEventsSwapParams) => {
  txSocket.emit(FiatTxEvents.SWAP, params)
}

export function useGetFiatTxDetails(): FiatTxValues {
  const [confirmations, setConfirmations] = useState<number>(0)
  const [isValidArgs, setIsValidArgs] = useState<boolean | undefined>()
  const [isValidSwap, setIsValidSwap] = useState<boolean | undefined>()
  const [txConfirmationComplete, setTxConfirmationComplete] = useState<
    boolean | undefined
  >()
  const [exchangeStatus, setExchangeStatus] = useState<
    "failed" | "fullfiled" | undefined
  >()
  const listener = useCallback(
    (cb: Dispatch<SetStateAction<any>>, confirmations0: number) =>
      cb(confirmations0),
    []
  )

  const reset = useCallback(() => {
    setConfirmations(0)
    setIsValidArgs(undefined)
    setIsValidSwap(undefined)
    setTxConfirmationComplete(undefined)
    setExchangeStatus(undefined)
  }, [])

  // swap validity
  useEffect(() => {
    txSocket.on(FiatTxEvents.SWAP_VALIDITY, (valid) => {
      listener(setIsValidSwap, valid)
    })

    return () => {
      txSocket.off(FiatTxEvents.SWAP_VALIDITY, listener)
    }
  }, [])

  // args validity
  useEffect(() => {
    txSocket.on(FiatTxEvents.ARG_VALIDITY, (valid) => {
      listener(setIsValidArgs, valid)
    })

    return () => {
      txSocket.off(FiatTxEvents.ARG_VALIDITY, listener)
    }
  }, [])

  // confirmations
  useEffect(() => {
    txSocket.on(FiatTxEvents.TX_CONFIRMATIONS, (confirmations0) => {
      listener(setConfirmations, confirmations0)
    })

    return () => {
      txSocket.off(FiatTxEvents.TX_CONFIRMATIONS, listener)
    }
  }, [])

  // confirmationsStatus
  useEffect(() => {
    txSocket.on(FiatTxEvents.TX_CONFIRMATIONS_STATUS, (valid) => {
      listener(setTxConfirmationComplete, valid)
    })

    return () => {
      txSocket.off(FiatTxEvents.TX_CONFIRMATIONS_STATUS, listener)
    }
  }, [])

  // exchangeStatus
  useEffect(() => {
    txSocket.on(FiatTxEvents.EXCHANGE_STATUS, (valid) => {
      listener(setExchangeStatus, valid)
    })

    return () => {
      txSocket.off(FiatTxEvents.EXCHANGE_STATUS, listener)
    }
  }, [])

  return {
    sendSwapDetails,
    txConfirmations: confirmations,
    argValidity: isValidArgs,
    swapValidity: isValidSwap,
    txConfirmationStatus: txConfirmationComplete,
    exchangeStatus,
    reset,
  }
}

function useFiatTx(): FiatTxValues {
  const data = useContext(FiatTxContext)

  return data
}

export default useFiatTx
