import { useCallback, useContext, useMemo } from "react"
import ModalContext, { Modal } from "../contexts/ModalContext"
import { doNothing, handleBodyScroll } from "../utils/functions"

interface ShowModalAttributes {
  onCloseCallback?: () => void
  onConfirm?: () => void
  modal: Modal
}

const emptyModalActions = {
  onCloseCallback: doNothing,
  onConfirm: doNothing,
}

const useModal = (name?: Modal) => {
  const { modals, setModals } = useContext(ModalContext)

  const showModal = useCallback(
    (attrs: ShowModalAttributes) => {
      const { onCloseCallback, onConfirm, modal } = attrs
      const newModal = {
        [modal]: {
          onCloseCallback: onCloseCallback ?? doNothing,
          onConfirm: onConfirm ?? doNothing,
          modal,
        },
      }
      setModals([...modals, newModal])
      handleBodyScroll("disable")
    },
    [modals, setModals]
  )

  const hideModal = useCallback(
    (m?: Modal) => {
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
    [modals, name]
  )

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
  }
}

export default useModal
