import React, { HTMLProps, useState } from "react"
import { ReactComponent as Eye } from "../../assets/icons/eye.svg"
import { ReactComponent as EyeSlash } from "../../assets/icons/eye-slash.svg"

interface InputProps extends HTMLProps<HTMLInputElement> {
  [key: string]: any
}

export default function Input({ placeholder, ...rest }: InputProps) {
  const [isVisiblePassword, setIsVisiblePassword] = useState(false)
  const togglePasswordVisibility = () => {
    setIsVisiblePassword((visibility) => !visibility)
  }
  return (
    <div className="flex items-center h-[40px] rounded-[5px] border-black/[.5] border px-[10px]">
      <input
        type={
          rest?.type === "password" && isVisiblePassword ? "text" : rest?.type
        }
        placeholder={placeholder}
        {...rest}
        className="flex-1 h-full placeholder:text-black/[.4] bg-transparent placeholder:text-[11px] text-black border-none focus:outline-none outline-none"
      />
      {rest?.type === "password" && (
        <button type="button" onClick={togglePasswordVisibility}>
          {isVisiblePassword ? <EyeSlash /> : <Eye />}
        </button>
      )}
    </div>
  )
}

Input.defaultProps = {
  type: "text",
}
