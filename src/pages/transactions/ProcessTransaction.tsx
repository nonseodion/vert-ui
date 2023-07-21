import React, { useMemo, useState, useCallback, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { Wrapper } from "../../components/general"
import {
  ConfirmTransaction,
  SuccessfulTransaction,
  TransactionProgress,
  WaitingForConfirmation,
  ViewOnBsc,
  CashSentModal,
  TransactionDetailsModal,
  TransactionCancelledModal,
} from "../../components/transactions"
import useFiatTx from "../../hooks/useFiatTx"
import { useModal } from "../../hooks"
import { Modals, PageRoutes } from "../../utils/constants"

export default function ProcessTransaction() {
  const steps = useMemo(
    () => [
      { number: 1, text: "Processing transaction" },
      { number: 2, text: "Waiting for confirmation" },
      { number: 3, text: "Sending your cash" },
    ],
    []
  )
  const { showModal } = useModal()
  const {
    argValidity,
    swapValidity,
    reset,
    exchangeStatus,
    txConfirmationStatus,
  } = useFiatTx()
  const navigate = useNavigate()

  const [currentStep, setCurrentStep] = useState(steps[0].number)
  const proceed = () => {
    const activeStepIndex = steps.findIndex(
      (step) => step.number === currentStep
    )
    setCurrentStep(steps[activeStepIndex + 1].number)
  }

  const onConfirmTransaction = useCallback((hash: `0x${string}`) => {
    toast(<ViewOnBsc hash={hash} />)
  }, [])

  useEffect(() => {
    if (
      argValidity === false ||
      swapValidity === false ||
      exchangeStatus === "failed" ||
      txConfirmationStatus === false
    ) {
      showModal({
        modal: Modals.TRANSACTION_CANCELLED,
        modalParams: { text: "Transaction Failed" },
        onCloseCallback: () => {
          reset?.()
          navigate(PageRoutes.HOME)
        },
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [argValidity, exchangeStatus, swapValidity, txConfirmationStatus])

  useEffect(() => {
    if (exchangeStatus === "fullfiled") {
      showModal({
        modal: Modals.CASH_SENT,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exchangeStatus])

  return (
    <Wrapper>
      <div className="flex flex-col pt-[45px] mb-4 space-y-[60.3px] items-center px-2">
        <TransactionProgress steps={steps} currentStep={currentStep} />
        {currentStep === 1 && (
          <ConfirmTransaction
            proceed={proceed}
            onConfirm={onConfirmTransaction}
          />
        )}
        {currentStep === 2 && <WaitingForConfirmation proceed={proceed} />}
        {currentStep === 3 && <SuccessfulTransaction />}
      </div>
      <CashSentModal />
      <TransactionDetailsModal />
      <TransactionCancelledModal />
    </Wrapper>
  )
}
