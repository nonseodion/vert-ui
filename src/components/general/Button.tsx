import React from "react"
import clsx from "classnames"

interface ButtonProps {
  text: string
  background?: "primary" | "transparent"
  textColor?: "white" | "dark"
  bordered?: boolean
  onClick: () => void
  fullWidth?: boolean
  className?: string
}

export default function Button({
  background = "primary",
  textColor,
  text,
  bordered,
  onClick,
  fullWidth,
  className,
}: ButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "text-white bg-primary py-[14px] px-4 rounded-xl",
        { "bg-transparent": background === "transparent" },
        { "text-black": textColor === "dark" },
        { "border border-primary": bordered },
        { "w-full": fullWidth },
        className
      )}
    >
      {text}
    </button>
  )
}

Button.defaultProps = {
  background: "primary",
  textColor: "white",
  bordered: false,
  fullWidth: false,
  className: "",
}
