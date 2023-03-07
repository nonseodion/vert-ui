import React, { useEffect, useState } from "react"
import { ReactComponent as SmilingGirl } from "../../assets/images/smiling-girl.svg"
import { useModal } from "../../hooks"
import { handleBodyScroll } from "../../utils/functions"
import { Button, Modal } from "../general"

export default function CashSentModal() {
  const { hideModal, isActive, showModal } = useModal("CASH_SENT")
  const [showTransactionDetails, setShowTransactionDetails] = useState(false)

  useEffect(() => {
    if (!isActive && showTransactionDetails) {
      setShowTransactionDetails(false)
      showModal({ modal: "TRANSACTION_DETAILS" })
      setTimeout(() => {
        handleBodyScroll("disable")
      }, 500)
    }
  }, [isActive, showTransactionDetails, showModal])

  return (
    <Modal name="CASH_SENT" bodyClassNames="mt-[100px] px-[30px] max-w-[386px]">
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
        <h3 className="text-center text-black text-[22px]">100,800.90 NAIRA</h3>
      </div>
      <div className="mt-[50.5px] flex items-center space-x-5">
        <Button
          text="View transaction"
          className="!py-0 h-12 w-[203px]"
          onClick={() => {
            setShowTransactionDetails(true)
            hideModal("CASH_SENT")
          }}
        />
        <Button
          bordered
          className="!py-0 h-12 flex-1 !text-primary font-medium"
          text="close"
          background="transparent"
          onClick={() => hideModal("CASH_SENT")}
        />
      </div>
    </Modal>
  )
}
