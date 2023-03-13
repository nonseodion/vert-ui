import { createContext } from "react"
import { Modals } from "../utils/constants"
import { doNothing } from "../utils/functions"

export interface ActiveModalValues {
  onCloseCallback: () => void | null
  onConfirm: () => void | null
  modalParams?: { [key: string]: any }
}

export type ActiveModalsArrayValue = {
  [key in Modals]?: ActiveModalValues
}

export interface ModalContextValues {
  modals: ActiveModalsArrayValue[]
  setModals: React.Dispatch<React.SetStateAction<ActiveModalsArrayValue[]>>
}

const ModalContext = createContext<ModalContextValues>({
  modals: [],
  setModals: doNothing,
})

export default ModalContext
