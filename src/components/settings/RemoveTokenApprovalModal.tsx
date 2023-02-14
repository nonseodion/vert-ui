import React from "react"
import { Button, Loader } from "../general"
import Modal, { ModalProps } from "../general/Modal"

interface RemoveTokenApprovalModalProps extends Omit<ModalProps, "children"> {
  onClose: () => void
}

export default function RemoveTokenApprovalModal({
  visible,
  onClose,
}: RemoveTokenApprovalModalProps) {
  return (
    <Modal visible={visible}>
      <div className="pt-[19vh] flex justify-center">
        <div className="bg-white relative max-w-[calc(100vw_-_30px)] lg:max-w-[392px] border border-primary/[.25] rounded-2xl py-[23px] px-5">
          <h3 className="text-black text-center font-semibold text-[21px]">
            Revoking
          </h3>
          <div className="flex items-center justify-center my-[52.5px]">
            <Loader className="h-[75px] w-[75px]" />
          </div>
          <p className="text-center text-lightBlue font-medium mb-[35px]">
            Communicating with wallet. Please, Sign message with your wallet
          </p>
          <div className="mx-[17px]">
            <Button fullWidth text="Close" onClick={onClose} />
          </div>
        </div>
      </div>
    </Modal>
  )
}
