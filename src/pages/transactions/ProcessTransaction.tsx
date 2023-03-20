import React, { useMemo, useState, useCallback } from "react"
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

export default function ProcessTransaction() {
  const steps = useMemo(
    () => [
      { number: 1, text: "Processing transaction" },
      { number: 2, text: "Waiting for confirmation" },
      { number: 3, text: "Sending your cash" },
    ],
    []
  )

  const [currentStep, setCurrentStep] = useState(steps[0].number)
  const proceed = () => {
    const activeStepIndex = steps.findIndex(
      (step) => step.number === currentStep
    )
    setCurrentStep(steps[activeStepIndex + 1].number)
  }

  const onConfirmTransaction = useCallback(() => {
    toast(<ViewOnBsc />)
  }, [])

  return (
    <Wrapper>
      <div className="flex flex-col pt-[45px] mb-4 space-y-[60.3px] items-center px-2">
        <TransactionProgress steps={steps} currentStep={currentStep} />
        {currentStep === 1 && <ConfirmTransaction proceed={proceed} />}
        {currentStep === 2 && (
          <WaitingForConfirmation
            proceed={proceed}
            onConfirm={onConfirmTransaction}
          />
        )}
        {currentStep === 3 && <SuccessfulTransaction />}
      </div>
      <CashSentModal />
      <TransactionDetailsModal />
      <TransactionCancelledModal />
    </Wrapper>
  )
}
