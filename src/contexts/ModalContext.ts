import { createContext } from "react"
import { modals } from "../utils/constants"
import { doNothing } from "../utils/functions"

export interface ActiveModalValues {
  onCloseCallback: () => void | null
  onConfirm: () => void | null
}

export type Modal = keyof typeof modals

export type ActiveModalsArrayValue = {
  [key in Modal]?: ActiveModalValues
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
