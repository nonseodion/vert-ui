import React from "react"
import clsx from "classnames"

interface PinnedTokenProps {
  name: string
  icon: string
  className?: string
  onClick: () => void
}

export default function PinnedToken({
  onClick,
  name,
  icon,
  className,
}: PinnedTokenProps) {
  return (
    <button
      className={clsx(
        "border-lightBlue border outline-none flex items-center h-[42px] rounded-lg px-3 space-x-2",
        className
      )}
      type="button"
      onClick={onClick}
    >
      <img alt={name} src={icon} className="no-select h-6 w-6 rounded-xl" />
      <span className="text-[13px] text-black">{name}</span>
    </button>
  )
}

PinnedToken.defaultProps = {
  className: "",
}
