import React, { useState } from "react"
import { Currency } from "@pancakeswap/sdk"
import Fiat from "../../utils/Fiat"

type CurrencyLogoProps = {
  currency: Fiat | Currency
  srcs: string[]
  resolved?: boolean
}

export const BAD_SRCS: { [imageSrc: string]: true } = {}

export default function CurrencyLogo(props: CurrencyLogoProps) {
  const { currency, resolved, srcs } = props
  const { symbol } = currency
  const [, refresh] = useState<number>(0)
  const src: string | undefined = srcs.find((s) => !BAD_SRCS[s])

  // handle error if image url does not resolve
  if (src) {
    return (
      <img
        className="h-10 w-10"
        alt={symbol.slice(0, 4)}
        src={src}
        onError={() => {
          if (src) BAD_SRCS[src] = true
          refresh((i) => i + 1)
        }}
      />
    )
  }

  return resolved ? (
    <div className="h-10 bg-[#CADAF4] w-10 p-1 rounded-full flex items-center justify-center">
      <span className="text-lightBlue text-base overflow-hidden">
        {symbol.slice(0, 4)}
      </span>
    </div>
  ) : (
    <div className="h-10 bg-tokenGrey w-10 p-1 rounded-full flex items-center justify-center">
      <span className="text-primary text-base overflow-hidden">
        {symbol.slice(0, 4)}
      </span>
    </div>
  )
}

CurrencyLogo.defaultProps = {
  resolved: false,
}
