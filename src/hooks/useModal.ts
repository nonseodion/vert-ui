import { useContext } from "react"
import ModalContext from "../contexts/ModalContext"
import { modals } from "../utils/constants"
import { doNothing, handleBodyScroll } from "../utils/functions"

interface ShowModalAttributes {
  onCloseCallback?: () => void
  onConfirm?: () => void
  modal: keyof typeof modals
}

const useModal = () => {
  const { modalState, setModalState } = useContext(ModalContext)

  const showModal = (attrs: ShowModalAttributes) => {
    const { onCloseCallback, onConfirm, modal } = attrs
    setModalState({
      onCloseCallback: onCloseCallback ?? doNothing,
      onConfirm: onConfirm ?? doNothing,
      modal,
    })
    handleBodyScroll("disable")
  }

  const hideModal = () => {
    if (
      modalState.onCloseCallback &&
      typeof modalState.onCloseCallback === "function"
    ) {
      modalState.onCloseCallback()
    }
    setModalState({
      onCloseCallback: doNothing,
      onConfirm: doNothing,
      modal: null,
    })
    setTimeout(() => {
      handleBodyScroll("enable")
    }, 500)
  }

  return {
    showModal,
    hideModal,
    modal: modalState.modal,
    onConfirm: modalState.onConfirm,
  }
}

export default useModal
