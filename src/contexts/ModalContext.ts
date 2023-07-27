import { createContext } from "react"
import { Modals } from "../utils/constants"
import { doNothing } from "../utils/functions"

export interface ActiveModalValues {
  onCloseCallback: () => void | null
  onConfirm: () => void | null
  modalParams?: { [key: string]: any }
}

export type ActiveModals = {
  [key in Modals]?: ActiveModalValues
}

export interface ModalContextValues {
  modals: ActiveModals
  setModals: React.Dispatch<React.SetStateAction<ActiveModals>>
}

const ModalContext = createContext<ModalContextValues>({
  modals: {},
  setModals: doNothing,
})

export default ModalContext
