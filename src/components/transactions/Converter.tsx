import React, { useState, useRef, useEffect } from "react"
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { ReactComponent as Proceed } from "../../assets/icons/proceed.svg"
import { ReactComponent as Refresh } from "../../assets/icons/refresh.svg"
import { ReactComponent as Retry } from "../../assets/icons/retry.svg"
import { ReactComponent as Retry2 } from "../../assets/icons/retry-2.svg"
import { ReactComponent as Question } from "../../assets/icons/question.svg"
import ConverterSide from "./ConverterSide"
import TokenModal from "./TokenModal"
import { doNothing } from "../../utils/functions"
import useModal from "../../hooks/useModal"
import { Button } from "../general"
import ApproveTransactionModal from "./ApproveTranasactionModal"
import { PageRoutes } from "../../utils/constants"

export default function Converter() {
  const navigate = useNavigate()
  const { showModal, modalIsOpen, hideModal } = useModal()
  const [amountToSell, setAmountToSell] = useState<number | null>(null)
  const [amountToBuy, setAmountToBuy] = useState<number | null>(null)
  const [transactionApproved, setTransactionApproved] = useState<boolean>(false)

  const approveModalVisibility = modalIsOpen("APPROVE_TRANSACTION")
  const approveModalVisibilityRef = useRef(approveModalVisibility)

  useEffect(() => {
    approveModalVisibilityRef.current = approveModalVisibility
  }, [approveModalVisibility])

  const startApprovalProcess = () => {
    showModal({ modal: "APPROVE_TRANSACTION" })
    setTimeout(() => {
      if (approveModalVisibilityRef.current) {
        setTransactionApproved(true)
        toast.success("Transaction approved successfully.")
        hideModal("APPROVE_TRANSACTION")
      }
    }, 3000)
  }

  const isDisabled = !amountToBuy || !amountToSell

  return (
    <div className="w-[418px] rounded-3xl bg-lightGreen">
      <TokenModal />
      <ApproveTransactionModal />
      <div className="h-[53px] flex items-center justify-between border-b border-border">
        <div className="ml-auto flex space-x-[21.01px] items-center mr-[22px]">
          <button type="button">
            <Retry />
          </button>
          <button type="button">
            <Retry2 />
          </button>
        </div>
      </div>
      <div className="px-[18px] pt-4 pb-6">
        <div className="flex space-x-[9.28px] items-center  mb-[22px]">
          <div className="flex items-center">
            <p className="text-center text-black font-medium text-13">
              <span>1 BNB</span>
              <span> = </span>
              <span>206,611.10</span>
            </p>
            <select className="ml-1 font-bold text-13 bg-transparent mt-[-2px]">
              <option value="NGN">NGN</option>
            </select>
          </div>
          <button
            type="button"
            className="h-6 w-6 bg-primary/[.15] rounded-full flex items-center justify-center"
          >
            <Refresh className="h-4 w-4" />
          </button>
        </div>
        <div className="flex flex-col space-y-4 mb-[15px]">
          <ConverterSide
            onValueChange={setAmountToBuy}
            side="sell"
            value={amountToBuy}
            onTokenSelect={() => showModal({ modal: "TOKEN_MODAL" })}
          />
          <ConverterSide
            onValueChange={setAmountToSell}
            value={amountToSell}
            side="buy"
            onTokenSelect={doNothing}
          />
        </div>
        <p className="mb-[30px] text-center text-[#6C7689] text-12 font-bold">
          <span className="text-primary">Rate:</span> 1 USD ≈ 760.22 NGN
        </p>
        <div className="flex flex-col space-y-[3px]">
          <div className="flex space-x-[3px] items-center">
            <span className="text-[8px] text-purple font-medium">
              Why Approve?{" "}
            </span>
            <Question />
          </div>
          {transactionApproved ? (
            <Button
              className="rounded-lg !py-0 h-[48px] w-full"
              text="Proceed"
              icon={<Proceed />}
              onClick={() => navigate(PageRoutes.SELECT_BANK_ACCOUNT)}
            />
          ) : (
            <Button
              className="disabled:bg-disabled rounded-lg py-[17px] h-[48px] w-full text-white disabled:!text-[black]/[.3] text-sm font-semibold leading-[2px] disabled:cursor-not-allowed"
              text={isDisabled ? "Enter amount to change" : "Approve BNB"}
              fullWidth
              disabled={isDisabled}
              onClick={() => startApprovalProcess()}
            />
          )}
        </div>
      </div>
    </div>
  )
}
