import { useCallback, useContext, useMemo } from "react"
import ModalContext from "../contexts/ModalContext"
import { BankAccountDetails } from "../dummy/currencies"
import { Modals } from "../utils/constants"
import { doNothing, handleBodyScroll } from "../utils/functions"

type ModalParamsMapping = {
  [Modals.RESET_PASSWORD_MODAL]: { email: string }
  [Modals.BANK_ACCOUNT]: BankAccountDetails
  [key: string]: {}
}

type ModalParamsMap = {
  [M in Modals]: ModalParamsMapping[M]
}

interface ShowModalAttributes<M extends Modals> {
  onCloseCallback?: () => void
  onConfirm?: () => void
  modal: M
  modalParams?: ModalParamsMap[M]
}

const emptyModalActions = {
  onCloseCallback: doNothing,
  onConfirm: doNothing,
  modalParams: null,
}

export type ShowModalFunction = <M extends Modals>(
  attrs: ShowModalAttributes<M>
) => any

const useModal = (name?: Modals) => {
  const { modals, setModals } = useContext(ModalContext)

  const showModal: ShowModalFunction = useCallback(
    (attrs) => {
      const { onCloseCallback, onConfirm, modal, modalParams } = attrs
      const newModal = {
        onCloseCallback: onCloseCallback ?? doNothing,
        onConfirm: onConfirm ?? doNothing,
        modal,
        modalParams: modalParams ?? {},
      }
      setModals({ ...modals, [modal]: newModal })
      handleBodyScroll("disable")
    },
    [modals, setModals]
  )

  const hideModal = useCallback(
    (m?: Modals) => {
      const modal = m ?? name
      if (modal) {
        modals[modal]?.onCloseCallback()
        delete modals[modal]
        const newModals = { ...modals }
        setModals(newModals)
      }

      setTimeout(() => {
        handleBodyScroll("enable")
      }, 500)
    },
    [modals, name, setModals]
  )

  const isActive = useMemo(
    () => (!name ? false : !!modals[name]),
    [name, modals]
  )

  const modalIsOpen = (modalName: Modals) => !!modals[modalName]

  const modalValues = useMemo(
    () => (name ? modals[name] || emptyModalActions : emptyModalActions),
    [modals, name]
  )

  return {
    showModal,
    hideModal,
    isActive,
    modalValues,
    modalIsOpen,
  }
}

export default useModal
