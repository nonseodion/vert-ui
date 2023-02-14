import React from "react"
import { Button, Loader, Modal } from "../general"
import { ModalProps } from "../general/Modal"
import { ReactComponent as Exit } from "../../assets/icons/exit.svg"

interface UnlinkWalletModalProps extends Omit<ModalProps, "children"> {
  onConfirm: () => void
  onClose: () => void
  unlinking: boolean
}

export default function UnlinkWalletModal({
  visible,
  onConfirm,
  onClose,
  unlinking,
}: UnlinkWalletModalProps) {
  return (
    <Modal visible={visible}>
      <div className="pt-[192px] justify-center flex">
        {unlinking ? (
          <div className="bg-white relative px-5 pt-[23px] pb-[30px] w-[392px] rounded-3xl border border-primary/[.3]">
            <h3 className="text-black font-semibold text-[21px] text-center">
              Unlinking wallet
            </h3>
            <div className="flex items-center justify-center  my-[52.5px]">
              <Loader className="h-[75px] w-[75px]" />
            </div>
            <p className="mb-[35px] text-center max-w-[351px] font-medium text-lightBlue leading-6">
              Communicating with wallet. Please, Sign message with your wallet
            </p>
            <div className="flex items-center justify-center mx-[17px]">
              <Button fullWidth onClick={onClose} text="Close" />
            </div>
          </div>
        ) : (
          <div className="relative px-[27px] pt-[52px] bg-white w-[452px] rounded-2xl border border-primary/[.3]">
            <button
              type="button"
              onClick={onClose}
              className="absolute top-[24.4px] right-[26.8px]"
            >
              <Exit />
            </button>
            <p className="mx-auto max-w-[340px] text-black text-center mb-[30px]">
              Unlinking this wallet will disconnect it from your account. Do you
              want to continue?
            </p>
            <div className="flex justify-center space-x-5 mb-[25px]">
              <Button text="Cancel" className="w-[181px]" onClick={onClose} />
              <Button
                text="Continue"
                bordered
                onClick={onConfirm}
                className="w-[199px] text-primary"
                background="transparent"
              />
            </div>
          </div>
        )}
      </div>
    </Modal>
  )
}
