import React from "react"
import { ReactComponent as Exit } from "../../assets/icons/exit.svg"
import useModal from "../../hooks/useModal"
import { Button, Modal } from "../general"

export default function ResetPasswordModal() {
  const {
    hideModal,
    modalValues: { modalParams, onConfirm },
  } = useModal("RESET_PASSWORD_MODAL")

  return (
    <Modal
      name="RESET_PASSWORD_MODAL"
      bodyClassNames="!pb-0 !lg:w-[375px] !px-[31.05px] !py-[16.05px]"
    >
      <div>
        <button
          type="button"
          className="absolute top-[16.05px] right-[31.05px]"
          onClick={() => hideModal()}
        >
          <Exit className="h-5 w-5" />
        </button>
        <h3 className="text-center mx-auto mt-[13.95px] text-dark2 font-bold text-[19px] leading-[21px]">
          Forgot Password
        </h3>
        <p className="mt-[30px] mx-auto mb-[60px] text-center max-w-[319px] text-13 text-black">
          A password reset email has been sent to: {modalParams?.email}
        </p>
        <Button
          text="Okay"
          fullWidth
          onClick={onConfirm}
          className="mb-[30px] !h-10 py-0 text-sm"
        />
      </div>
    </Modal>
  )
}
