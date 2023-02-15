import React from "react"
import clsx from "classnames"
import { Button, Loader, Modal } from "../general"
import { ReactComponent as Exit } from "../../assets/icons/exit.svg"
import useModal from "../../hooks/useModal"

interface UnlinkWalletModalProps {
  unlinking: boolean
}

export default function UnlinkWalletModal({
  unlinking,
}: UnlinkWalletModalProps) {
  const { onConfirm, hideModal } = useModal()
  return (
    <Modal
      bodyClassNames={clsx(
        "!mt-[192px] border border-primary/[.3] rounded-2xl !lg:w-[452px] !px-[27px] !pt-[52px]",
        { "px-5 pt-[23px] !pb-[30px] lg:w-[392px] rounded-3xl": unlinking },
        { "!pb-0": !unlinking }
      )}
    >
      {unlinking ? (
        <div>
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
            <Button fullWidth onClick={hideModal} text="Close" />
          </div>
        </div>
      ) : (
        <div>
          <button
            type="button"
            onClick={hideModal}
            className="absolute top-[24.4px] right-[26.8px]"
          >
            <Exit />
          </button>
          <p className="mx-auto max-w-[340px] text-black text-center mb-[30px]">
            Unlinking this wallet will disconnect it from your account. Do you
            want to continue?
          </p>
          <div className="flex justify-center space-x-5 mb-[25px]">
            <Button text="Cancel" className="w-[181px]" onClick={hideModal} />
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
    </Modal>
  )
}
