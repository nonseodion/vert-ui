import React, { useEffect } from "react"
import clsx from "classnames"
import { Footer, TopNav } from "../navigation"

interface WrapperProps {
  children: React.ReactNode
  hideTopNav?: boolean
  hideFooter?: boolean
}

export default function Wrapper({
  children,
  hideTopNav,
  hideFooter,
}: WrapperProps) {
  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  return (
    <div>
      {!hideTopNav && <TopNav />}
      <div
        className={clsx(
          "max-w-[1500px] mx-auto",
          { "pt-[60px] md:pt-[100px]": !hideTopNav },
          {
            "min-h-[calc(100vh_-_150px)]": !hideTopNav && !hideFooter,
          },
          {
            "h-full": !hideTopNav && hideFooter,
          },
          {
            "min-h-[calc(100vh_-_150px)]": hideTopNav && !hideFooter,
          },
          {
            "h-full": hideTopNav && hideFooter,
          }
        )}
      >
        {children}
      </div>
      {!hideFooter && <Footer />}
    </div>
  )
}

Wrapper.defaultProps = {
  hideTopNav: false,
  hideFooter: true,
}
