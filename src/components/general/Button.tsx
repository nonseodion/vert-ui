import React from "react"
import clsx from "classnames"

export interface ButtonProps {
  text: string
  background?: "primary" | "transparent"
  textColor?: "white" | "dark"
  bordered?: boolean
  onClick: () => void
}

const Button: React.FC<ButtonProps> = ({
  background = "primary",
  textColor,
  text,
  bordered,
  onClick,
}) => (
  <button
    type="button"
    onClick={onClick}
    className={clsx(
      "text-white bg-primary py-[14px] px-4 rounded-xl",
      { "bg-transparent": background === "transparent" },
      { "text-black": textColor === "dark" },
      { "border border-primary": bordered }
    )}
  >
    {text}
  </button>
)

Button.defaultProps = {
  background: "primary",
  textColor: "white",
  bordered: false,
}

export default Button
