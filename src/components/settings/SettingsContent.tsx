import React from "react"

interface SettingsContentProps {
  title: string
  children: React.ReactNode
}

export default function SettingsContent({
  title,
  children,
}: SettingsContentProps) {
  return (
    <div className="pb-6 w-full lg:pl-[247px]">
      <h2 className="text-xl text-white font-medium">{title}</h2>
      <div className="mt-5 border border-primary/[.4] py-[30px] px-4 rounded-3xl xl:w-[660px]">
        {children}
      </div>
    </div>
  )
}
