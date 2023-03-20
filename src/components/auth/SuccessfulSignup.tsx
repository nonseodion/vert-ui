import React from "react"
import { ReactComponent as Exit } from "../../assets/icons/exit.svg"
import { ReactComponent as Girl } from "../../assets/images/girl.svg"
import { ReactComponent as ConfettiOne } from "../../assets/images/confetti1.svg"
import { ReactComponent as ConfettiTwo } from "../../assets/images/confetti2.svg"
import { ReactComponent as ConfettiThree } from "../../assets/images/confetti3.svg"
import { useModal } from "../../hooks"
import { Modals } from "../../utils/constants"
import { Modal } from "../general"

export default function SuccessfulSignup() {
  const { hideModal } = useModal(Modals.SUCCESSFUL_SIGN_UP)
  return (
    <Modal
      name={Modals.SUCCESSFUL_SIGN_UP}
      bodyClassNames="!bg-[#EFFEED] !pb-0 !lg:w-[508px] overflow-hidden"
    >
      <ConfettiOne className="absolute top-[6px] h-[334px] w-full" />
      <ConfettiTwo className="absolute top-[358px] left-[-15px] h-[334px] w-full" />
      <ConfettiThree className="absolute top-[173px] left-[1px] h-[334px] w-full" />
      <button
        type="button"
        onClick={() => hideModal()}
        className="absolute top-4 right-4 lg:top-[34.1px] lg:right-[26.1px]"
      >
        <Exit className="fill-[#929AA5]" />
      </button>
      <div className="relative w-full">
        <p className="text-center mt-[30px] text-primary font-bold text-[23px] lg:text-[26px]">
          Yah!!! You successfully signed up!
        </p>
        <div className="flex justify-center pb-[30px]">
          <Girl className="lg:h-[315.68px] h-[200px]" />
        </div>
      </div>
    </Modal>
  )
}
