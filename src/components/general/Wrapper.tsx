import React from "react"
import clsx from "classnames"

export interface WrapperProps {
  children: React.ReactNode
  hideTopNav?: boolean
}

const Wrapper: React.FC<WrapperProps> = ({ children, hideTopNav = false }) => (
  <div
    className={clsx(
      { "min-h-[calc(_100vh_-_200px)]": !hideTopNav },
      { "min-h-[calc(_100vh_-_100px)]": hideTopNav }
    )}
  >
    {children}
  </div>
)

Wrapper.defaultProps = {
  hideTopNav: false,
}

export default Wrapper
