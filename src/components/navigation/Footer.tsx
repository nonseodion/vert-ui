import React from "react"

const Footer: React.FC = () => (
  <div className="flex justify-center items-center h-[100px] border-t-[1px] border-white/[.08]">
    <ul className="flex items-center space-x-[71px]">
      <li>
        <span className="text-sm font-medium text-white/[.6]">
          &copy; Vert finance.
        </span>
      </li>
      <li>
        <span className="text-sm font-medium text-white/[.6]">Support</span>
      </li>
      <li>
        <span className="text-sm font-medium text-white/[.6]">Support</span>
      </li>
      <li>
        <span className="text-sm font-medium text-white/[.6]">
          Terms of use
        </span>
      </li>
      <li>
        <span className="text-sm font-medium text-white/[.6]">
          Privacy policy
        </span>
      </li>
    </ul>
  </div>
)

export default Footer
