import React from "react"
import clsx from "classnames"
import { useLocation } from "react-router-dom"
import { ReactComponent as USD } from "../../assets/icons/usd.svg"
import { PageRoutes } from "../../utils/constants"

export default function ActiveCurrency() {
  const { pathname } = useLocation()
  return (
    <div
      className={clsx(
        "px-[6px] h-6 bg-white/[.15] rounded-lg flex items-center border border-transparent space-x-[2px]",
        {
          "!border-primary bg-primary/[.15]":
            pathname === PageRoutes.default_currency,
        }
      )}
    >
      <USD />
      <span className="text-[#B0B0B0] text-[8px] font-semibold">USD</span>
    </div>
  )
}
