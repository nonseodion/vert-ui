import React from "react"
import { ReactComponent as CopyIcon } from "../../assets/icons/copy.svg"
import { ReactComponent as PurpleCopyIcon } from "../../assets/icons/copy-purple.svg"
import { useClipboard } from "../../hooks"

interface CopyProps {
  text: string
  className?: string
  onCopySuccessText?: string
  color?: "green" | "purple"
}

export default function Copy({
  text,
  className,
  onCopySuccessText,
  color,
}: CopyProps) {
  const { copyToCliboard } = useClipboard()
  return (
    <button
      type="button"
      className="flex-shrink-0"
      onClick={() => copyToCliboard(text, onCopySuccessText)}
    >
      {color === "purple" ? (
        <PurpleCopyIcon className={className} />
      ) : (
        <CopyIcon className={className} />
      )}
    </button>
  )
}

Copy.defaultProps = {
  className: "",
  onCopySuccessText: null,
  color: "green",
}
