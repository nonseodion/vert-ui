import { createContext } from "react"
import { doNothing } from "../utils/functions"

export interface ModalStateValues {
  onCloseCallback: () => void | null
  onConfirm: () => void | null
  isVisible: boolean
}

export interface ModalContextValues {
  modalState: ModalStateValues
  setModalState: React.Dispatch<React.SetStateAction<ModalStateValues>>
}

const ModalContext = createContext<ModalContextValues>({
  modalState: {
    onCloseCallback: doNothing,
    isVisible: false,
    onConfirm: doNothing,
  },
  setModalState: doNothing,
})

export default ModalContext
