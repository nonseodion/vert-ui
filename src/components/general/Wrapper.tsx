import React, { useEffect } from "react"
import clsx from "classnames"
import { TopNav } from "../navigation"

export interface WrapperProps {
  children: React.ReactNode
  hideTopNav?: boolean
}

const Wrapper: React.FC<WrapperProps> = ({ children, hideTopNav = false }) => {
  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  return (
    <div
      className={clsx(
        { "min-h-[calc(_100vh_-_200px)]": !hideTopNav },
        { "min-h-[calc(_100vh_-_100px)]": hideTopNav }
      )}
    >
      {!hideTopNav && <TopNav />}
      {children}
    </div>
  )
}

Wrapper.defaultProps = {
  hideTopNav: false,
}

export default Wrapper
