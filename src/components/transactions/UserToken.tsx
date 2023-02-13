import React from "react"
import clsx from "classnames"

interface UserTokenProps {
  token: string
  icon: string
  className?: string
}

export default function UserToken({ token, icon, className }: UserTokenProps) {
  return (
    <button
      className={clsx(
        "border-lightBlue border outline-none flex items-center h-[42px] rounded-lg px-3 space-x-2",
        className
      )}
      type="button"
    >
      <img alt={token} src={icon} className="no-select h-6 w-6 rounded-xl" />
      <span className="text-[13px] text-black">{token}</span>
    </button>
  )
}

UserToken.defaultProps = {
  className: "",
}
