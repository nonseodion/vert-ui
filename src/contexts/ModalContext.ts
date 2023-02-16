import { createContext } from "react"
import { modals } from "../utils/constants"
import { doNothing } from "../utils/functions"

export interface ModalStateValues {
  onCloseCallback: () => void | null
  onConfirm: () => void | null
  modal: keyof typeof modals | null
}

export interface ModalContextValues {
  modalState: ModalStateValues
  setModalState: React.Dispatch<React.SetStateAction<ModalStateValues>>
}

const ModalContext = createContext<ModalContextValues>({
  modalState: {
    onCloseCallback: doNothing,
    onConfirm: doNothing,
    modal: null,
  },
  setModalState: doNothing,
})

export default ModalContext
