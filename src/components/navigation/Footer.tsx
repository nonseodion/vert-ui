import React from "react"

export default function Footer() {
  return (
    <div className="flex justify-center items-center h-[100px] border-t-[1px] border-white/[.08]">
      <ul className="flex items-center space-x-5 md:space-x-[71px]">
        <li>
          <span className="text-13 md:text-sm font-medium text-white/[.6]">
            &copy; Vert finance.
          </span>
        </li>
        <li>
          <span className="text-13 md:text-sm font-medium text-white/[.6]">
            Support
          </span>
        </li>
        <li>
          <span className="text-13 md:text-sm font-medium text-white/[.6]">
            Support
          </span>
        </li>
        <li>
          <span className="text-13 md:text-sm font-medium text-white/[.6]">
            Terms of use
          </span>
        </li>
        <li>
          <span className="text-13 md:text-sm font-medium text-white/[.6]">
            Privacy policy
          </span>
        </li>
      </ul>
    </div>
  )
}
