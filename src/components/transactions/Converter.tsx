import React, { useState, useRef, useEffect } from "react"
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { ReactComponent as Proceed } from "../../assets/icons/proceed.svg"
import { ReactComponent as Refresh } from "../../assets/icons/refresh.svg"
import { ReactComponent as Retry } from "../../assets/icons/retry.svg"
import { ReactComponent as Retry2 } from "../../assets/icons/retry-2.svg"
import ConverterSide from "./ConverterSide"
import { getRandomBoolean } from "../../utils/functions"
import { useModal } from "../../hooks"
import { Button, Info } from "../general"
import ApproveTransactionModal from "./ApproveTransactionModal"
import { Modals, PageRoutes } from "../../utils/constants"
import ConverterCurrencySelect from "./ConverterCurrencySelect"
import useConverterInterface from "../../hooks/interfaces/useConverterInferface"

export default function Converter() {
  const navigate = useNavigate()
  const { showModal, modalIsOpen, hideModal } = useModal()
  const [transactionApproved, setTransactionApproved] = useState<boolean>(false)

  const approveModalVisibility = modalIsOpen(Modals.APPROVE_TRANSACTION)
  const approveModalVisibilityRef = useRef(approveModalVisibility)
  const {
    buyToken,
    sellToken,
    sellLogos,
    buyLogos,
    typedValue,
    buyAmount,
    setSellAmount,
    setBuyAmount,
    sellAmount,
    independentField,
    sellBalance,
    fiatBuyEqv,
    fiatSellEqv,
  } = useConverterInterface()

  useEffect(() => {
    approveModalVisibilityRef.current = approveModalVisibility
  }, [approveModalVisibility])

  const startApprovalProcess = () => {
    showModal({ modal: Modals.APPROVE_TRANSACTION })
    const approvalSuccessful = getRandomBoolean()
    if (approvalSuccessful) {
      setTimeout(() => {
        if (approveModalVisibilityRef.current) {
          setTransactionApproved(true)
          toast.success("Transaction approved successfully.")
          hideModal(Modals.APPROVE_TRANSACTION)
        }
      }, 3000)
    } else {
      hideModal(Modals.APPROVE_TRANSACTION)
      toast.error("Transaction failed")
    }
  }

  const isDisabled = !sellAmount || !buyAmount

  return (
    <div className="w-[418px] rounded-3xl bg-lightGreen">
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
            <ConverterCurrencySelect />
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
            side="sell"
            onTokenSelect={() => showModal({ modal: Modals.TOKEN_MODAL })}
            token={sellToken}
            logos={sellLogos}
            amount={independentField === "sell" ? typedValue : sellAmount}
            setAmount={setSellAmount}
            fiatEqv={fiatSellEqv}
            tokenBalance={sellBalance}
          />
          <ConverterSide
            side="buy"
            token={buyToken}
            logos={buyLogos}
            amount={independentField === "buy" ? typedValue : buyAmount}
            setAmount={setBuyAmount}
            onTokenSelect={() => showModal({ modal: Modals.TOKEN_MODAL })}
            fiatEqv={fiatBuyEqv}
          />
        </div>
        <p className="mb-[30px] text-center text-[#6C7689] text-12 font-bold">
          <span className="text-primary">Rate:</span> 1 USD ≈ 760.22 NGN
        </p>
        <div className="flex flex-col space-y-[3px]">
          <Info text="Why Approve?" tooltip_id="why-approve">
            <div className="flex flex-col space-y-1 max-w-[273px]">
              <h3 className="!text-tooltip text-sm font-inter font-semibold leading-5">
                Give permission to exchange BNB
              </h3>
              <p className="!text-tooltip font-inter text-12 leading-5">
                To continue, you need to allow Vert finance contracts to use
                your BNB. This has to be done only once for each token.{" "}
                <span className="text-primary">Learn more</span>
              </p>
            </div>
          </Info>
          {transactionApproved ? (
            <Button
              className="rounded-lg !py-0 h-[48px] w-full"
              text="Proceed"
              icon={<Proceed />}
              onClick={() => navigate(PageRoutes.SELECT_BANK_ACCOUNT)}
            />
          ) : (
            <Button
              className="disabled:bg-disabled rounded-lg py-[17px] h-[48px] w-full text-white disabled:!text-[black]/[.3] text-sm font-semibold leading-[2px]"
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
