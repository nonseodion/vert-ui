import React from "react"
import { useNavigate } from "react-router-dom"
import { ReactComponent as Exit } from "../../assets/icons/exit.svg"
import { useModal } from "../../hooks"
import { Modals, PageRoutes } from "../../utils/constants"
import { Button, Modal } from "../general"

export default function CreateAccountModal() {
  const navigate = useNavigate()
  const { hideModal } = useModal(Modals.CREATE_ACCOUNT)

  return (
    <Modal
      name={Modals.CREATE_ACCOUNT}
      bodyClassNames="!md:w-[517px] !p-[30px]"
    >
      <div>
        <button
          type="button"
          className="absolute top-[16.05px] right-[31.05px]"
          onClick={() => hideModal()}
        >
          <Exit className="h-5 w-5 fill-[#929AA5]" />
        </button>
        <p className="mt-[83px] mb-[70px] text-center max-w-[456px] text-[19px] text-black font-medium leading-[28.5px]">
          This wallet is not connected to any vert finance account, create an
          account with your wallet.
        </p>
        <div className="flex items-center space-x-4">
          <Button
            text="Close"
            className="!w-[103px] !py-0 !h-12 flex-shrink-0 !text-primary hidden md:block"
            bordered
            background="transparent"
          />
          <Button
            text="Create account with Wallet"
            fullWidth
            onClick={() => {
              hideModal()
              navigate(PageRoutes.SIGN_UP_WITH_WALLET)
            }}
            className="!py-0 !h-12 flex-1"
          />
        </div>
      </div>
    </Modal>
  )
}
