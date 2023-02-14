import { createContext } from "react"
import { doNothing } from "../utils/functions"

export type Toast = string | null

export interface ToastContextValues {
  toast: Toast
  setToast: React.Dispatch<React.SetStateAction<Toast>>
}

const ToastContext = createContext<ToastContextValues>({
  toast: null,
  setToast: doNothing,
})

export default ToastContext
