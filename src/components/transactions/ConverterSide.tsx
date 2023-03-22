import React, { useCallback, useMemo } from "react"
import { Currency } from "@pancakeswap/sdk"
import { ReactComponent as DropdownIcon } from "../../assets/icons/arrow-down.svg"
import Fiat from "../../utils/Fiat"
import TokenImage from "./CurrencyLogo"
import FiatAmount from "../../utils/FiatAmount"
import removeTrailingZeros from "../../utils/removeTrailingZeros"
import useWallet from "../../state/auth/useWallet"
import { Balance } from "../../state/balances/useBalances"
import { maxAmountSpend } from "../../utils/maxAmountSpend"
import BalanceSkeleton from "../skeletons/BalanceSkeleton"

export interface ConverterSideProps {
  side: "sell" | "buy"
  token: Fiat | Currency
  amount: string
  logos: string[]
  setAmount: (amount: string) => void
  onTokenSelect: (_: any) => void
  fiatEqv?: FiatAmount
  tokenBalance?: Balance
}

export default function ConverterSide({
  side,
  onTokenSelect,
  token,
  amount,
  logos,
  setAmount,
  fiatEqv,
  tokenBalance,
}: ConverterSideProps) {
  const { connected } = useWallet()
  const decimals = useMemo(
    () =>
      (tokenBalance?.amount?.currency.decimals ?? 0) <= 4
        ? tokenBalance?.amount?.currency.decimals
        : 4,
    [tokenBalance?.amount?.currency.decimals]
  )

  const max = useCallback(() => {
    const maxAmount = maxAmountSpend(tokenBalance?.amount)
    setAmount(maxAmount?.toExact() ?? "")
  }, [setAmount, tokenBalance?.amount])

  return (
    <div className="bg-white min-h-[104px] rounded-xl py-[13.5px] px-4">
      <div className="flex justify-between items-center mb-[25.5px]">
        <p className="uppercase text-12">you {side}</p>
        {side === "sell" && (
          <div className="flex items-center space-x-[3.52px]">
            <div className="text-purple text-12 flex items-center">
              {connected && "Balance: "}
              {tokenBalance?.amount ? (
                `${tokenBalance?.amount?.toSignificant(decimals)}`
              ) : (
                <>
                  <span>&nbsp;</span>{" "}
                  <BalanceSkeleton className="h-[14px] w-8" />
                </>
              )}
            </div>
            {connected && tokenBalance?.amount?.greaterThan(0) && (
              <button
                type="button"
                className="bg-[#1AFF91]/[.13] rounded-[4px] px-[3px] py-[2px] text-[#1AFF91] font-medium text-12"
                onClick={max}
              >
                MAX
              </button>
            )}
          </div>
        )}
      </div>
      <div className="flex items-center">
        <div className="flex flex-col space-y-[5px]">
          <div className="flex-1">
            <input
              className="w-full border-none outline-none focus:outline-none placeholder:text-placeholder text-xl"
              placeholder="0.0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          {fiatEqv ? (
            <span className="leading-none text-[9px] text-purple font-medium">
              ~{removeTrailingZeros(fiatEqv.toExact({ groupSeparator: "," }))}{" "}
              {fiatEqv.fiat.symbol}
            </span>
          ) : (
            <div className="h-[9px] w-4" />
          )}
        </div>
        <button
          type="button"
          className="flex-shrink-0 ml-3"
          onClick={onTokenSelect}
        >
          <div className="w-[130px] h-[40px] flex space-x-[10.1px] justify-center items-center rounded border border-borderLight">
            <div className="flex space-x-4 items-center converter-side">
              <TokenImage currency={token} srcs={logos} />
              <span className="font-semibold text-black text-base">
                {token.symbol}
              </span>
            </div>
            {side === "sell" && <DropdownIcon />}
          </div>
        </button>
      </div>
    </div>
  )
}

ConverterSide.defaultProps = {
  fiatEqv: undefined,
  tokenBalance: undefined,
}
