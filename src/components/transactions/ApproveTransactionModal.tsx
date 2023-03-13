import React from "react"
import { ReactComponent as Exit } from "../../assets/icons/exit.svg"
import { useModal } from "../../hooks"
import { Modals } from "../../utils/constants"
import { Button, Loader, Modal } from "../general"

export default function ApproveTransactionModal() {
  const { hideModal } = useModal(Modals.APPROVE_TRANSACTION)
  return (
    <Modal name={Modals.APPROVE_TRANSACTION} bodyClassNames="!px-[30px] !py-5">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-25 text-black">
          Approve transaction
        </h3>
        <button type="button" onClick={() => hideModal()}>
          <Exit className="fill-[#929AA5]" />
        </button>
      </div>
      <div className="py-[62.5px] flex items-center justify-center">
        <Loader className="h-[75px] w-[75px]" />
      </div>
      <p className="text-lightBlue text-base font-medium text-center mb-[50px]">
        Please, approve transaction in your wallet
      </p>
      <Button onClick={() => hideModal()} text="Close" fullWidth />
    </Modal>
  )
}
