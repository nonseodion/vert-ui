import React, { HTMLProps, useState } from "react"
import clsx from "classnames"
import { ReactComponent as Eye } from "../../assets/icons/eye.svg"
import { ReactComponent as EyeSlash } from "../../assets/icons/eye-slash.svg"

interface InputProps extends HTMLProps<HTMLInputElement> {
  outerClassName?: string
  className?: string
  label?: string
  [key: string]: any
}

export default function Input({
  placeholder,
  outerClassName,
  className,
  label,
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
          outerClassName
        )}
      >
        <input
          type={
            rest?.type === "password" && isVisiblePassword ? "text" : rest?.type
          }
          placeholder={placeholder}
          {...rest}
          className={clsx(
            "flex-1 h-full placeholder:text-black/[.4] bg-transparent placeholder:text-[11px] text-black border-none focus:outline-none outline-none",
            className
          )}
        />
        {rest?.type === "password" && (
          <button type="button" onClick={togglePasswordVisibility}>
            {isVisiblePassword ? <EyeSlash /> : <Eye />}
          </button>
        )}
      </div>
    </div>
  )
}

Input.defaultProps = {
  outerClassName: "",
  className: "",
  label: null,
}
