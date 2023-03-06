import React from "react"
import clsx from "classnames"
import { Button, Modal, WalletConfirmation } from "../general"
import { ReactComponent as Exit } from "../../assets/icons/exit.svg"
import useModal from "../../hooks/useModal"
import { Modals } from "../../utils/constants"

interface UnlinkWalletModalProps {
  unlinking: boolean
}

export default function UnlinkWalletModal({
  unlinking,
}: UnlinkWalletModalProps) {
  const { modalValues, hideModal } = useModal(Modals.UNLINK_WALLET)
  return (
    <Modal
      name={Modals.UNLINK_WALLET}
      bodyClassNames={clsx(
        "!mt-[192px] border border-primary/[.3] rounded-2xl !lg:w-[452px] !px-[27px] !pt-[52px]",
        { "px-5 pt-[23px] !pb-[30px] lg:w-[392px] rounded-3xl": unlinking },
        { "!pb-0": !unlinking }
      )}
    >
      {unlinking ? (
        <WalletConfirmation
          header="Unlinking wallet"
          buttonText="Close"
          onClose={() => hideModal()}
        />
      ) : (
        <div>
          <button
            type="button"
            onClick={() => hideModal()}
            className="absolute top-[24.4px] right-[26.8px]"
          >
            <Exit />
          </button>
          <p className="mx-auto max-w-[340px] text-black text-center mb-[30px]">
            Unlinking this wallet will disconnect it from your account. Do you
            want to continue?
          </p>
          <div className="flex justify-center space-x-5 mb-[25px]">
            <Button
              text="Cancel"
              className="w-[181px]"
              onClick={() => hideModal()}
            />
            <Button
              text="Continue"
              bordered
              onClick={modalValues?.onConfirm}
              className="w-[199px] text-primary"
              background="transparent"
            />
          </div>
        </div>
      )}
    </Modal>
  )
}
