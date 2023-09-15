import React from "react"

export default function Footer() {
  return (
    <div className="flex justify-center flex-col items-center h-[100px] border-t-[1px] border-white/[.08]">
      <span className="text-13 md:text-sm font-medium text-white/[.6]">
        Made with malice 😈 by{" "}
        <a
          href="https://twitter.com/nonseodion"
          target="_blank"
          rel="noreferrer"
          className="text-primary text-center text-sm font-medium underline"
        >
          nonseodion
        </a>
      </span>

      <span>
        <a
          href="https://github.com/nonseodion?tab=repositories&q=vert"
          target="_blank"
          rel="noreferrer"
          className="text-primary text-center text-sm font-medium underline"
        >
          Source Code
        </a>
      </span>
      {/* <ul className="flex flex-wrap justify-center items-center space-x-5 md:space-x-[71px] px-5">
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
            Terms of use
          </span>
        </li>
        <li>
          <span className="text-13 md:text-sm font-medium text-white/[.6]">
            Privacy policy
          </span>
        </li>
      </ul> */}
    </div>
  )
}
