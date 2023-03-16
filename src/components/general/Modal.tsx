import React, { useEffect } from "react"
import clsx from "classnames"
import { useModal } from "../../hooks"
import { doNothing } from "../../utils/functions"
import { Modals } from "../../utils/constants"

export interface ModalProps {
  children: React.ReactNode
  bodyClassNames?: string
  onClose?: () => void
  name: Modals
}

export default function Modal({
  children,
  bodyClassNames,
  name,
  onClose,
}: ModalProps) {
  const { isActive, hideModal } = useModal(name)

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
        role="presentation"
        onClick={() => hideModal()}
        className={clsx(
          "fixed top-0 cursor-pointer overflow-x-hidden z-[999] left-0 h-full w-full overflow-y-auto backdrop-blur-[5px]",
          { "opacity-0 pointer-events-none": !isActive }
        )}
      >
        <div className="h-screen">
          <div className="flex items-center justify-center py-10 h-full">
            <div
              onClick={(e) => e.stopPropagation()}
              role="presentation"
              className={clsx(
                "transition-all cursor-default max-w-[calc(100vw_-_30px)] lg:w-[424px] duration-200 bg-white rounded-xl px-[30px] pt-[33.5px] pb-9 relative",
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
