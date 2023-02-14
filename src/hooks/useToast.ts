import { useContext } from "react"
import ToastContext from "../contexts/ToastContext"

const useToast = () => {
  const { toast: currentToast, setToast } = useContext(ToastContext)

  const toast = (message: string) => setToast(message)
  const clearToast = () => setToast(null)

  return {
    toast,
    currentToast,
    clearToast,
  }
}

export default useToast
