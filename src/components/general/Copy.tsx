import React from "react"
import { ReactComponent as CopyIcon } from "../../assets/icons/copy.svg"
import { useClipboard } from "../../hooks"

interface CopyProps {
  text: string
  className?: string
  onCopySuccessText?: string
}

export default function Copy({
  text,
  className,
  onCopySuccessText,
}: CopyProps) {
  const { copyToCliboard } = useClipboard()
  return (
    <button
      type="button"
      onClick={() => copyToCliboard(text, onCopySuccessText)}
    >
      <CopyIcon className={className} />
    </button>
  )
}

Copy.defaultProps = {
  className: "",
  onCopySuccessText: null,
}
