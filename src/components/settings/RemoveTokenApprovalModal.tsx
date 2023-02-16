import React from "react"
import useModal from "../../hooks/useModal"
import { modals } from "../../utils/constants"
import { WalletConfirmation } from "../general"
import Modal from "../general/Modal"

export default function RemoveTokenApprovalModal() {
  const { hideModal } = useModal()
  return (
    <Modal
      name={modals.remove_token_approval}
      bodyClassNames="!mt-[19vh] !lg:max-w-[392px] border border-primary/[.25] rounded-2xl !py-[23px] !px-5"
    >
      <WalletConfirmation
        header="Revoking"
        buttonText="Close"
        onClose={hideModal}
      />
    </Modal>
  )
}
