import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ReactComponent as SmilingGirl } from "../../assets/images/smiling-girl.svg"
import { useModal } from "../../hooks"
import { Modals, PageRoutes } from "../../utils/constants"
import { handleBodyScroll, toTwoDecimalPlaces } from "../../utils/functions"
import { Button, Modal } from "../general"
import useExchange from "../../state/exchange/useExchange"

export default function CashSentModal() {
  const navigate = useNavigate()
  const { hideModal, isActive, showModal } = useModal(Modals.CASH_SENT)
  const [showTransactionDetails, setShowTransactionDetails] = useState(false)
  const { buyAmount } = useExchange()

  const onClose = () => {
    hideModal()
    navigate(PageRoutes.HOME)
  }

  useEffect(() => {
    if (!isActive && showTransactionDetails) {
      setShowTransactionDetails(false)
      showModal({ modal: Modals.TRANSACTION_DETAILS })
      setTimeout(() => {
        handleBodyScroll("disable")
      }, 500)
    }
  }, [isActive, showTransactionDetails, showModal])

  return (
    <Modal
      name={Modals.CASH_SENT}
      bodyClassNames="mt-[100px] px-[30px] max-w-[386px]"
    >
      <div className="flex items-center justify-center mt-[-50px]">
        <SmilingGirl />
      </div>
      <h3 className="mt-[5px] text-primary font-bold text-[22px] leading-9 text-center">
        Transaction Successful
      </h3>
      <div className="flex mt-[11px] flex-col justify-center items-center space-y-[5.5px]">
        <span className="text-purple text-[15px] text-center leading-6">
          You received
        </span>
        <h3 className="text-center text-black text-[22px]">
          {buyAmount && toTwoDecimalPlaces(buyAmount.toExact())} NGN
        </h3>
      </div>
      <div className="mt-[50.5px] flex items-center space-x-5">
        <Button
          text="View transaction"
          className="!py-0 h-12 w-[203px]"
          onClick={() => {
            setShowTransactionDetails(true)
            hideModal(Modals.CASH_SENT)
          }}
        />
        <Button
          bordered
          className="!py-0 h-12 flex-1 !text-primary font-medium"
          text="close"
          background="transparent"
          onClick={onClose}
        />
      </div>
    </Modal>
  )
}
