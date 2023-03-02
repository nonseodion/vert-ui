import { useContext } from "react"
import ModalContext, { Modal } from "../contexts/ModalContext"
import { doNothing, handleBodyScroll } from "../utils/functions"

interface ShowModalAttributes {
  onCloseCallback?: () => void
  onConfirm?: () => void
  modal: Modal
  modalParams?: { [key: string]: any }
}

const emptyModalActions = {
  onCloseCallback: doNothing,
  onConfirm: doNothing,
  modalParams: null,
}

const useModal = (name?: Modal) => {
  const { modals, setModals } = useContext(ModalContext)

  const showModal = (attrs: ShowModalAttributes) => {
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
  }

  const hideModal = (m?: Modal) => {
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
  }

  const isActive = !name
    ? false
    : !!modals.find((activeModal) => Object.keys(activeModal)[0] === name)

  const modalValues = name
    ? modals.find((activeModal) => Object.keys(activeModal)[0] === name)?.[
        name
      ] || emptyModalActions
    : emptyModalActions

  return {
    showModal,
    hideModal,
    isActive,
    modalValues,
  }
}

export default useModal
