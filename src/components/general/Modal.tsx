import React, { useEffect } from "react"
import clsx from "classnames"
import { handleBodyScroll } from "../../utils/functions"

export interface ModalProps {
  children: React.ReactNode
  visible: boolean
  onCloseCallback?: () => void
}

export default function Modal({
  children,
  visible,
  onCloseCallback,
}: ModalProps) {
  useEffect(() => {
    handleBodyScroll(visible ? "disable" : "enable")
    if (!visible && onCloseCallback) {
      onCloseCallback()
    }
  }, [visible])
  return (
    <div
      className={clsx(
        "fixed top-0 overflow-x-hidden transition-all duration-150 z-[51] left-0 h-full w-full overflow-y-auto backdrop-blur-[5px]",
        { "opacity-0 pointer-events-none": !visible }
      )}
    >
      <div className="fixed top-0 transition-all duration-150 left-0 h-screen w-screen bg-black/[.7]" />
      {children}
    </div>
  )
}

Modal.defaultProps = {
  onCloseCallback: null,
}
