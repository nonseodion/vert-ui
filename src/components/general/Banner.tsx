import React from "react"

export default function Banner() {
  return (
    <div className="fixed top-0 w-full  bg-yellow h-7 md:h-10 flex items-center justify-center z-50 px-4">
      <p className="text-white text-center font-medium text-[11px] md:text-base whitespace-nowrap lg:whitespace-normal text-ellipsis w-full overflow-hidden">
        BNB smart chain is the only supported network, other blockchain coming
        soon.
      </p>
    </div>
  )
}
