import React from "react"
import { ReactComponent as Exit } from "../../assets/icons/exit.svg"
import { ReactComponent as Girl } from "../../assets/images/girl.svg"
import useModal from "../../hooks/useModal"
import { Modal } from "../general"
import { Modals } from "../../utils/constants"

export default function SuccessfulSignup() {
  const { hideModal } = useModal(Modals.SUCCESSFUL_SIGN_UP)
  return (
    <Modal
      name={Modals.SUCCESSFUL_SIGN_UP}
      bodyClassNames="bg-[#EFFEED] !pb-0 !lg:w-[508px]"
    >
      <button
        type="button"
        onClick={() => hideModal()}
        className="absolute top-4 right-4 lg:top-[34.1px] lg:right-[26.1px]"
      >
        <Exit />
      </button>
      <p className="text-center mt-[30px] text-primary font-bold text-[23px] lg:text-[26px]">
        You successfully signed up!
      </p>
      <div className="flex justify-center pb-[30px]">
        <Girl className="lg:h-[315.68px] h-[200px]" />
      </div>
    </Modal>
  )
}
