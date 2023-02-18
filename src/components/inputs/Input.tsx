import React, { HTMLProps, useState } from "react"
import clsx from "classnames"
import { ReactComponent as Eye } from "../../assets/icons/eye.svg"
import { ReactComponent as EyeSlash } from "../../assets/icons/eye-slash.svg"

interface InputProps extends HTMLProps<HTMLInputElement> {
  outerClassName?: string
  className?: string
  label?: string
  hasError?: boolean
  value?: any
  errorMessage?: string
  [key: string]: any
}

export default function Input({
  placeholder,
  outerClassName,
  className,
  label,
  hasError,
  errorMessage,
  ...rest
}: InputProps) {
  const [isVisiblePassword, setIsVisiblePassword] = useState(false)
  const togglePasswordVisibility = () => {
    setIsVisiblePassword((visibility) => !visibility)
  }
  return (
    <div>
      {label && <p className="text-black font-medium mb-[10px]">{label}</p>}
      <div
        className={clsx(
          "flex items-center h-[40px] rounded-[5px] border-black/[.5] border px-[10px]",
          outerClassName,
          { "!border-red/[.5]": hasError }
        )}
      >
        <input
          {...rest}
          type={
            rest?.type === "password" && isVisiblePassword ? "text" : rest?.type
          }
          placeholder={placeholder}
          className={clsx(
            "flex-1 h-full w-full placeholder:text-black/[.4] bg-transparent placeholder:text-[11px] text-black border-none focus:outline-none outline-none",
            className
          )}
        />
        {rest?.type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="flex-shrink-0"
          >
            {isVisiblePassword ? <EyeSlash /> : <Eye />}
          </button>
        )}
      </div>
      {errorMessage && hasError && (
        <p className="text-center text-red mt-[14px] text-[8px]">
          {errorMessage}
        </p>
      )}
    </div>
  )
}

Input.defaultProps = {
  outerClassName: "",
  className: "",
  label: null,
  hasError: false,
  errorMessage: "",
  value: "",
}
