import { Currency, CurrencyAmount, JSBI, Token } from "@pancakeswap/sdk"
import { constants } from "ethers"
import { useRef, useEffect, useMemo } from "react"
import toast from "react-hot-toast"
import {
  useContractRead,
  erc20ABI,
  usePrepareContractWrite,
  RpcError,
  useContractWrite,
  useContractEvent,
  useFeeData,
} from "wagmi"
import useWallet from "../../state/auth/useWallet"
import { Modals } from "../../utils/constants"
import walletErrorMessages from "../../utils/constants/walletErrorsMessages"
import useModal from "../useModal"
import getContracts from "../../utils/getContracts"
import { Balance } from "../../state/balances/useBalances"

interface UseApproveProps {
  sellAmount?: CurrencyAmount<Currency>
  sellBalance: Balance
}

interface UseApproveReturns {
  approve?: () => void
  allowance?: JSBI
  approving: boolean
  approvalFee?: JSBI
}

const { vertRouter } = getContracts()

export default function useApprove(props: UseApproveProps): UseApproveReturns {
  const { sellAmount } = props
  const { modalIsOpen, hideModal, showModal } = useModal()
  const { address: walletAddress } = useWallet()
  // used to ensure approve tx modal shows only once
  const shownApproveTxModal = useRef(false)
  const tokenAddress = (sellAmount?.currency as Token)?.address as `0x{string}`
  const { data: allowance, refetch } = useContractRead({
    address: tokenAddress,
    abi: erc20ABI,
    functionName: "allowance",
    args: [walletAddress ?? "0x", vertRouter.address as `0x{string}`],
  })

  const { data: feeData } = useFeeData()

  // watch for Approval event
  useContractEvent({
    address: tokenAddress,
    abi: erc20ABI,
    eventName: "Approval",
    listener(owner, spender) {
      if (owner === walletAddress && spender === vertRouter.address) {
        refetch()
      }
    },
  })

  const { config, data: preparedWriteData } = usePrepareContractWrite({
    address: tokenAddress,
    abi: erc20ABI,
    functionName: "approve",
    args: [vertRouter.address as `0x{string}`, constants.MaxUint256],
  })

  const {
    write,
    isError,
    isLoading,
    isSuccess,
    reset,
    error,
    data: tx,
  } = useContractWrite({
    ...config,
    onSettled() {
      // allow modal show up again after tx is successful
      shownApproveTxModal.current = false
    },
  })

  // tx fee for approval
  const approvalFee = useMemo(() => {
    if (preparedWriteData && feeData?.gasPrice)
      return JSBI.BigInt(
        feeData.gasPrice.mul(preparedWriteData.request.gasLimit).toString()
      )
    return undefined
  }, [feeData?.gasPrice, preparedWriteData])

  // modal effects
  useEffect(() => {
    // close modal when tx is approved/sent
    if ((tx?.hash || isError) && modalIsOpen(Modals.APPROVE_TRANSACTION)) {
      hideModal(Modals.APPROVE_TRANSACTION)
    }
    // open modal when tx isn't sent and modal hasn't been shown
    if (
      isLoading &&
      !modalIsOpen(Modals.APPROVE_TRANSACTION) &&
      !tx?.hash &&
      !shownApproveTxModal.current
    ) {
      showModal({
        modal: Modals.APPROVE_TRANSACTION,
      })
      shownApproveTxModal.current = true
    }
  }, [
    hideModal,
    isError,
    isLoading,
    isSuccess,
    showModal,
    modalIsOpen,
    tx?.hash,
    tx,
  ])

  // toast effects
  useEffect(() => {
    if (isSuccess) {
      toast.success(`Approved ${sellAmount?.currency.symbol} successfully`)
      reset()
    }
    if (isError) {
      const message = walletErrorMessages({
        code: (error as RpcError)?.code as keyof typeof walletErrorMessages,
      })
      toast.error(message ?? `${sellAmount?.currency.symbol} approval failed`)
      reset()
    }
  }, [error, isError, isSuccess, reset, sellAmount?.currency.symbol])

  return {
    approve: write,
    allowance: allowance && JSBI.BigInt(allowance?.toString()),
    approving: isLoading,
    approvalFee,
  }
}
