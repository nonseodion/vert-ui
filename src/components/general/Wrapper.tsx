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
    <div
      className={clsx(
        {
          "min-h-[calc(_100vh_-_160px)] md:min-h-[calc(_100vh_-_200px)]":
            !hideTopNav,
        },
        { "min-h-[calc(_100vh_-_100px)]": hideTopNav }
      )}
    >
      {!hideTopNav && <TopNav />}
      <div className={clsx({ "pt-[60px] lg:pt-[100px]": !hideTopNav })}>
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
