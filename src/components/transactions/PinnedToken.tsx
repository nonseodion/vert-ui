import React from "react"
import { useChainId } from "wagmi"
import clsx from "classnames"
import { ERC20Token } from "@pancakeswap/sdk"
import { getTokenLogoURL } from "../../utils"
import CurrencyLogo from "./CurrencyLogo"

interface PinnedTokenProps {
  icon: string
  token: ERC20Token
  className?: string
  onClick: () => void
}

export default function PinnedToken({
  onClick,
  token,
  icon,
  className,
}: PinnedTokenProps) {
  const chainId = useChainId()

  return (
    <button
      className={clsx(
        "border-lightBlue border outline-none flex items-center h-[42px] rounded-lg px-3 space-x-2 pinnedToken",
        className
      )}
      type="button"
      onClick={onClick}
    >
      <CurrencyLogo
        currency={token}
        srcs={[icon, getTokenLogoURL(token, chainId) ?? ""]}
      />
      <span className="text-[13px] text-black">{token.symbol}</span>
    </button>
  )
}

PinnedToken.defaultProps = {
  className: "",
}
