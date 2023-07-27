import React from "react"
import { ReactComponent as Exit } from "../../assets/icons/exit.svg"
import { useModal } from "../../hooks"
import { Modals } from "../../utils/constants"
import { Button, Modal } from "../general"

export default function TransactionCancelledModal() {
  const { hideModal, modalValues } = useModal(Modals.TRANSACTION_CANCELLED)
  return (
    <Modal
      name={Modals.TRANSACTION_CANCELLED}
      bodyClassNames="!max-w-[430px] px-[30px] py-5"
    >
      <button
        onClick={() => {
          modalValues?.onCloseCallback()
          hideModal()
        }}
        type="button"
        className="absolute top-[31.57px] right-[27.58px]"
      >
        <Exit className="fill-[#929AA5]" />
      </button>
      <h3 className="font-semibold text-25 leading-[37.5px] text-black">
        {modalValues.modalParams?.text}
      </h3>
      <div className="flex items-center justify-center mt-[51px] mb-[70px]">
        <div className="h-20 w-20 rounded-full flex items-center justify-center border-danger border-2">
          <Exit className="fill-danger h-[30px] w-[30px]" />
        </div>
      </div>
      <Button
        text="Close"
        onClick={() => {
          modalValues?.onCloseCallback()
          hideModal()
        }}
        fullWidth
        className="!h-[52px] !py-0"
      />
    </Modal>
  )
}
