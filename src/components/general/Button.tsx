import React from "react"
import clsx from "classnames"
import { ButtonProps } from "../../interfaces/buttons"

const Button: React.FC<ButtonProps> = ({
  background,
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

export default Button
