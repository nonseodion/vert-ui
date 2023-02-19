import React from "react"
import { ReactComponent as Exit } from "../../assets/icons/exit.svg"
import { ReactComponent as Girl } from "../../assets/images/girl.svg"
import useModal from "../../hooks/useModal"
import { Modal } from "../general"

export default function SuccessfulSignup() {
  const { hideModal } = useModal("SUCCESSFUL_SIGN_UP")
  return (
    <Modal
      name="SUCCESSFUL_SIGN_UP"
      bodyClassNames="bg-[#EFFEED] !pb-0 !lg:w-[508px]"
    >
      <button
        type="button"
        onClick={() => hideModal()}
        className="absolute top-4 right-4 lg:top-[34.1px] lg:right-[26.1px]"
      >
        <Exit />
      </button>
      <p className="text-center mt-[98px] lg:mt-[111px] text-primary font-bold text-[23px] lg:text-[26px]">
        You successfully signed up!
      </p>
      <div className="mt-[30px] flex justify-center lg:mt-[47px]">
        <Girl className="lg:h-[31vh] h-[15.5vh]" />
      </div>
    </Modal>
  )
}
