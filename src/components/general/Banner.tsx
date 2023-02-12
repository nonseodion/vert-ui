import React from "react"

export default function Banner() {
  return (
    <div className="fixed top-0 w-full bg-yellow h-7 md:h-10 flex items-center justify-center z-50">
      <p className="text-white text-center font-medium text-[11px] md:text-base">
        BNB smart chain is the only supported network, other blockchain coming
        soon.
      </p>
    </div>
  )
}
