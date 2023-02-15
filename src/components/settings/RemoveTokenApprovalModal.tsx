import React from "react"
import useModal from "../../hooks/useModal"
import { Button, Loader } from "../general"
import Modal from "../general/Modal"

export default function RemoveTokenApprovalModal() {
  const { hideModal } = useModal()
  return (
    <Modal bodyClassNames="!mt-[19vh] !lg:max-w-[392px] border border-primary/[.25] rounded-2xl !py-[23px] !px-5">
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
        <Button fullWidth text="Close" onClick={hideModal} />
      </div>
    </Modal>
  )
}
