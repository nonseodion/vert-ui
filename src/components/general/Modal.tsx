import React, { useEffect } from "react"
import clsx from "classnames"
import useModal from "../../hooks/useModal"
import { doNothing } from "../../utils/functions"
import { Modal as ModalType } from "../../contexts/ModalContext"

export interface ModalProps {
  children: React.ReactNode
  bodyClassNames?: string
  onClose?: () => void
  name: ModalType
}

export default function Modal({
  children,
  bodyClassNames,
  name,
  onClose,
}: ModalProps) {
  const { isActive } = useModal(name)

  useEffect(() => {
    if (!isActive && onClose) {
      if (typeof onClose === "function") {
        onClose()
      }
    }
  }, [isActive, onClose])

  return (
    <>
      {isActive && (
        <div className="fixed top-0 transition-all duration-150 bg-black/[.7] overflow-y-hidden left-0 h-screen w-screen " />
      )}
      <div
        className={clsx(
          "fixed top-0 overflow-x-hidden z-[999] left-0 h-full w-full overflow-y-auto backdrop-blur-[5px]",
          { "opacity-0 pointer-events-none": !isActive }
        )}
      >
        <div className="h-screen">
          <div className="flex items-center justify-center">
            <div
              className={clsx(
                "transition-all max-w-[calc(100vw_-_30px)] lg:w-[424px] mt-[150px] mb-[176px] duration-200 bg-white rounded-xl px-[30px] pt-[33.5px] pb-9 relative",
                { "opacity-0 pointer-events-none": !isActive },
                bodyClassNames
              )}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

Modal.defaultProps = {
  bodyClassNames: "",
  onClose: doNothing,
}
