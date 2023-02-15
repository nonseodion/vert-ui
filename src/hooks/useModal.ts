import { useContext } from "react"
import ModalContext from "../contexts/ModalContext"
import { doNothing, handleBodyScroll } from "../utils/functions"

interface ShowModalAttributes {
  onCloseCallback?: () => void
  onConfirm?: () => void
}

const useModal = () => {
  const { modalState, setModalState } = useContext(ModalContext)

  const showModal = (attrs?: ShowModalAttributes) => {
    if (attrs) {
      const { onCloseCallback, onConfirm } = attrs
      setModalState({
        isVisible: true,
        onCloseCallback: onCloseCallback ?? doNothing,
        onConfirm: onConfirm ?? doNothing,
      })
    } else {
      setModalState({
        isVisible: true,
        onCloseCallback: doNothing,
        onConfirm: doNothing,
      })
    }
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
      isVisible: false,
      onCloseCallback: doNothing,
      onConfirm: doNothing,
    })
    setTimeout(() => {
      handleBodyScroll("enable")
    }, 500)
  }

  return {
    showModal,
    hideModal,
    isVisible: modalState.isVisible,
    onConfirm: modalState.onConfirm,
  }
}

export default useModal
