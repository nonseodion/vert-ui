import React from "react"
import clsx from "classnames"

interface SettingsContentProps {
  title: string
  children: React.ReactNode
  className?: string
  outerElement?: React.ReactNode | null
}

export default function SettingsContent({
  title,
  children,
  className,
  outerElement,
}: SettingsContentProps) {
  return (
    <div className="pb-6 w-full lg:pl-[247px]">
      <h2 className="text-xl text-white font-medium">{title}</h2>
      {outerElement && outerElement}
      <div
        className={clsx(
          "mt-5 border border-primary/[.4] py-[30px] px-4 rounded-3xl xl:max-w-[660px]",
          className
        )}
      >
        {children}
      </div>
    </div>
  )
}

SettingsContent.defaultProps = {
  className: "",
  outerElement: null,
}
