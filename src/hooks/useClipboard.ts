import { toast } from "react-hot-toast"

const useClipboard = () => {
  const copyToCliboard = (text: string, onCopyText?: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success(onCopyText ?? "Copied to clipboard successfully!")
      })
      .catch(() => {
        toast.error("Failed to copy to cliboard")
      })
  }

  return {
    copyToCliboard,
  }
}

export default useClipboard
