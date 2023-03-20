import React, { useMemo, useState } from "react"
import { Fraction } from "@pancakeswap/sdk"
import { ReactComponent as InvertIcon } from "../../assets/icons/refresh.svg"
import useExchange from "../../state/exchange/useExchange"
import removeTrailingZeros from "../../utils/removeTrailingZeros"

interface TradePriceProps {
  exchangeRate: Fraction
}

export function TradePrice({ exchangeRate }: TradePriceProps) {
  const { preferredFiat, sellToken } = useExchange()
  const [invert, setInvert] = useState<boolean>(false)
  const [base, quote] = useMemo(() => {
    const rate = invert ? exchangeRate.invert() : exchangeRate
    const [baseSymbol, quoteSymbol] = invert
      ? [preferredFiat.fiat.symbol, sellToken.token.symbol]
      : [sellToken.token.symbol, preferredFiat.fiat.symbol]
    const A = `1`
    const B = `${removeTrailingZeros(rate.toSignificant(4))}`
    return [`${A} ${baseSymbol}`, `${B} ${quoteSymbol}`]
  }, [sellToken.token.symbol, exchangeRate, preferredFiat.fiat.symbol, invert])

  return (
    <div className="flex space-x-[9.28px] items-center  mb-[22px]">
      <div className="flex items-center">
        <p className="text-center text-black font-medium text-13">
          <span>{base}</span>
          <span> = </span>
          <span>{quote}</span>
        </p>
      </div>
      <button
        type="button"
        className="h-6 w-6 bg-primary/[.15] rounded-full flex items-center justify-center"
      >
        <InvertIcon className="h-4 w-4" onClick={() => setInvert((i) => !i)} />
      </button>
    </div>
  )
}
