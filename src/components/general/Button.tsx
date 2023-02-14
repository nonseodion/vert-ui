import React from "react"
import clsx from "classnames"
import Loader from "./Loader"
import { doNothing } from "../../utils/functions"

interface ButtonProps {
  text: string
  background?: "primary" | "transparent"
  textColor?: "white" | "dark"
  bordered?: boolean
  onClick?: (_: any) => void
  fullWidth?: boolean
  className?: string
  loading?: boolean
  type?: "button" | "submit"
  disabled?: boolean
  showLoadingText?: boolean
}

export default function Button({
  background,
  type,
  textColor,
  text,
  bordered,
  onClick,
  fullWidth,
  className,
  loading,
  disabled,
  showLoadingText,
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      type={type === "submit" ? "submit" : "button"}
      onClick={onClick}
      className={clsx(
        "text-white disabled:cursor-pointer bg-primary py-[14px] px-4 rounded-xl",
        { "bg-transparent": background === "transparent" },
        { "text-black": textColor === "dark" },
        { "border border-primary": bordered },
        { "w-full": fullWidth },
        className
      )}
    >
      <div>
        {loading ? (
          <div className="flex items-center space-x-[5px] justify-center">
            {showLoadingText && (
              <span className="text-black/[.4]">Loading...</span>
            )}
            <Loader className="h-4 w-4" />
          </div>
        ) : (
          <span>{text}</span>
        )}
      </div>
    </button>
  )
}

Button.defaultProps = {
  background: "primary",
  textColor: "white",
  bordered: false,
  fullWidth: false,
  className: "",
  loading: false,
  onClick: doNothing,
  type: "button",
  disabled: false,
  showLoadingText: true,
}
