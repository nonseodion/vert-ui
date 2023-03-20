import React, { HTMLProps, useEffect, useState } from "react"
import clsx from "classnames"
import { ReactComponent as Eye } from "../../assets/icons/eye.svg"
import { ReactComponent as EyeSlash } from "../../assets/icons/eye-slash.svg"

interface InputProps extends HTMLProps<HTMLInputElement> {
  outerClassName?: string
  className?: string
  labelClassName?: string
  label?: string
  hasError?: boolean
  value?: any
  errorMessage?: string
  showErrorOnlyOnBlur?: boolean
  [key: string]: any
}

export default function Input({
  placeholder,
  outerClassName,
  labelClassName,
  className,
  label,
  hasError,
  errorMessage,
  showErrorOnlyOnBlur,
  ...rest
}: InputProps) {
  const [isVisiblePassword, setIsVisiblePassword] = useState(false)
  const [canShowError, setCanShowError] = useState(!showErrorOnlyOnBlur)
  const togglePasswordVisibility = () => {
    setIsVisiblePassword((visibility) => !visibility)
  }

  const handleOnBlur = () => {
    if (!canShowError && hasError) {
      setCanShowError(true)
    }
  }

  useEffect(() => {
    if (!hasError && showErrorOnlyOnBlur) {
      setCanShowError(false)
    }
  }, [hasError, showErrorOnlyOnBlur])

  return (
    <div>
      {label && (
        <p className={clsx("text-black font-medium mb-[10px]", labelClassName)}>
          {label}
        </p>
      )}
      <div
        className={clsx(
          "flex items-center h-[40px] rounded-[5px] border-black/[.5] border px-[10px]",
          outerClassName,
          { "!border-red/[.5]": hasError && canShowError }
        )}
      >
        <input
          {...rest}
          onBlur={handleOnBlur}
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
      {errorMessage && hasError && canShowError && (
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
  labelClassName: "",
  showErrorOnlyOnBlur: false,
}
