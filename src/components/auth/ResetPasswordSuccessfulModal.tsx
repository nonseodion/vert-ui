import React from "react"
import { useNavigate } from "react-router-dom"
import { ReactComponent as Successful } from "../../assets/icons/successful.svg"
import { useModal } from "../../hooks"
import { Modals, PageRoutes } from "../../utils/constants"
import { Button, Modal } from "../general"

export default function ResetPasswordSuccessfulModal() {
  const navigate = useNavigate()
  const { hideModal } = useModal(Modals.RESET_PASSWORD_SUCCESSFUL_MODAL)

  const returnToLogin = () => {
    hideModal()
    navigate(PageRoutes.SIGN_IN_WITH_EMAIL)
  }

  return (
    <Modal
      name={Modals.RESET_PASSWORD_SUCCESSFUL_MODAL}
      bodyClassNames="!pb-0 !lg:w-[375px] !px-7 !pt-[45.67px] !pb-[30px]"
    >
      <div>
        <div className="flex items-center justify-center">
          <Successful />
        </div>
        <h3 className="text-center mx-auto mt-[44.67px] text-dark2 font-bold text-[19px] leading-[21px]">
          Password successfully changed
        </h3>
        <p className="mt-[9px] mx-auto mb-12 text-center max-w-[313px] text-13 text-[#58667E]">
          Try logging in to your account with your new password now
        </p>
        <Button
          text="Return to login"
          fullWidth
          onClick={returnToLogin}
          className="!h-10 !py-0 text-sm font-medium"
        />
      </div>
    </Modal>
  )
}
