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

type ShowModalFunction = <M extends Modals>(
  attrs: ShowModalAttributes<M>
) => any

const useModal = (name?: Modals) => {
  const { modals, setModals } = useContext(ModalContext)

  const showModal: ShowModalFunction = useCallback(
    (attrs) => {
      const { onCloseCallback, onConfirm, modal, modalParams } = attrs
      const newModal = {
        [modal]: {
          onCloseCallback: onCloseCallback ?? doNothing,
          onConfirm: onConfirm ?? doNothing,
          modal,
          modalParams: modalParams ?? {},
        },
      }
      setModals([...modals, newModal])
      handleBodyScroll("disable")
    },
    [modals, setModals]
  )

  const hideModal = useCallback(
    (m?: Modals) => {
      if (m) {
        setModals(
          modals.filter((activeModal) => Object.keys(activeModal)[0] !== m)
        )
      } else {
        setModals(
          modals.filter((activeModal) => Object.keys(activeModal)[0] !== name)
        )
      }
      setTimeout(() => {
        handleBodyScroll("enable")
      }, 500)
    },
    [modals, name, setModals]
  )

  const isActive = useMemo(
    () =>
      !name
        ? false
        : !!modals.find((activeModal) => Object.keys(activeModal)[0] === name),
    [name, modals]
  )

  const modalIsOpen = (modalName: Modals) =>
    !!modals.find((activeModal) => Object.keys(activeModal)[0] === modalName)

  const modalValues = useMemo(
    () =>
      name
        ? modals.find((activeModal) => Object.keys(activeModal)[0] === name)?.[
            name
          ] || emptyModalActions
        : emptyModalActions,
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
