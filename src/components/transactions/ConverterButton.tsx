import React, { useCallback, useMemo } from "react"
import { useQuery } from "react-query"
import { useBalance, useChainId } from "wagmi"
import { useNavigate } from "react-router-dom"
import {
  Currency,
  CurrencyAmount,
  JSBI,
  Trade,
  TradeType,
} from "@pancakeswap/sdk"
import { Modals, PageRoutes } from "../../utils/constants"
import { Info, Button } from "../general"
import { useModal } from "../../hooks"
import { ReactComponent as Proceed } from "../../assets/icons/proceed.svg"
import FiatAmount from "../../utils/FiatAmount"
import { Balance } from "../../state/balances/useBalances"
import { maxAmountSpend } from "../../utils/maxAmountSpend"
import useWallet from "../../state/auth/useWallet"
import { ButtonLoader } from "../general/Loader"
import useApprove from "../../hooks/transactions.ts/useApprove"
import { computeTradePriceBreakdown, warningSeverity } from "../../utils/swap"
import useExchange from "../../state/exchange/useExchange"
import { getLiquidity, reactQueryWrapper } from "../../services/banks"
import { SupportedNetworks } from "../../contexts/FiatTx"

interface ConverterButtonProps {
  trade?: Trade<
    Currency,
    Currency,
    TradeType.EXACT_INPUT | TradeType.EXACT_OUTPUT
  >
  sellAmount?: CurrencyAmount<Currency>
  buyAmount?: FiatAmount
  sellBalance: Balance
}

function getButton(
  text: string,
  onClick?: () => void,
  icon?: JSX.Element,
  disabled: boolean = true
) {
  return (
    <Button
      className={
        disabled
          ? `disabled:bg-disabled rounded-lg py-[12px] h-[48px] w-full text-white disabled:!text-[black]/[.3] text-sm font-semibold leading-[2px]`
          : `rounded-lg !py-0 h-[48px] w-full`
      }
      text={text}
      fullWidth={disabled}
      disabled={disabled}
      onClick={onClick}
      icon={icon}
    />
  )
}

export default function ConverterButton(props: ConverterButtonProps) {
  const navigate = useNavigate()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { trade, sellAmount, buyAmount, sellBalance } = props
  const { showModal } = useModal(Modals.CONNECT_WALLET)
  const { connected, address } = useWallet()
  const chainId = useChainId()
  const { data: liquidity } = useQuery({
    queryKey: ["network", SupportedNetworks[chainId as 56 | 97]],
    queryFn: reactQueryWrapper(getLiquidity),
  })

  const { approve, allowance, approving, approvalFee } = useApprove({
    sellBalance,
    sellAmount,
  })
  const { data: nativeBalance } = useBalance({
    address: address as `0x{string}`,
  })
  const { priceImpactWithoutFee } = useMemo(
    () => computeTradePriceBreakdown(trade ?? null),
    [trade]
  )
  const { setExchange } = useExchange()

  const proceed = useCallback(() => {
    setExchange({ key: "sellAmount", value: sellAmount })
    setExchange({ key: "buyAmount", value: buyAmount })
    setExchange({ key: "trade", value: trade })
    navigate(PageRoutes.SELECT_BANK_ACCOUNT)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buyAmount, sellAmount])

  const button = useMemo(() => {
    // no amounts entered/generated
    if (!sellAmount || !buyAmount) {
      return getButton("Enter amount to exchange")
    }
    // connect wallet
    if (!connected) {
      return getButton(
        "Connect Wallet",
        () => {
          showModal({ modal: Modals.CONNECT_WALLET })
        },
        undefined,
        false
      )
    }
    // insufficient balance
    if (
      (sellBalance &&
        sellAmount &&
        maxAmountSpend(sellBalance.amount)?.lessThan(sellAmount)) ||
      !sellBalance.amount
    ) {
      return getButton(`Insufficient ${sellAmount.currency.symbol} balance`)
    }
    // check if approving
    if (!sellAmount.currency.isNative && approving) {
      return getButton(
        `Approving ${sellAmount.currency.symbol}`,
        undefined,
        <ButtonLoader className="h-6 w-6" />
      )
    }
    // check if sufficient funds to approve token
    if (
      !sellAmount.currency.isNative &&
      allowance &&
      sellAmount.greaterThan(allowance) &&
      nativeBalance &&
      approvalFee &&
      // ERC2O token
      JSBI.lessThan(JSBI.BigInt(nativeBalance?.value.toString()), approvalFee)
    ) {
      return getButton(
        `Insufficient ${nativeBalance.symbol} to approve ${sellAmount.currency.symbol}`
      )
    }
    // checks for approval
    if (
      !sellAmount.currency.isNative &&
      ((allowance && sellAmount.greaterThan(allowance)) || !allowance)
    ) {
      return getButton(
        `Approve ${sellAmount.currency.symbol}`,
        () => {
          approve?.()
        },
        undefined,
        false
      )
    }

    // TODO: Price impact too high
    if (warningSeverity(priceImpactWithoutFee) > 3) {
      return getButton(`Can't complete swap`)
    }

    if (liquidity && buyAmount.greaterThan(liquidity - 50)) {
      return getButton("Insufficient Naira Liquidity")
    }

    // buy amount cannot exceed #500
    if (buyAmount.greaterThan(50000) || buyAmount.lessThan(50000)) {
      return getButton(`You can only buy 500 NGN`)
    }

    // TODO: Check if sufficient funds to exchange
    // if (
    //   nativeBalance &&
    //   approvalFee &&
    //   // ERC2O token
    //   ((!sellAmount.currency.isNative &&
    //     JSBI.lessThan(
    //       JSBI.BigInt(nativeBalance?.value.toString()),
    //       approvalFee
    //     )) ||
    //     // native token
    //     (sellAmount.currency.isNative &&
    //       sellBalance.amount &&
    //       sellBalance.amount
    //         .subtract(maxAmountSpend(sellBalance.amount))
    //         .lessThan(approvalFee)))
    // ) {
    //   return getButton(``)
    // }

    // proceeds to exchange
    return getButton("Proceed", proceed, <Proceed />, false)
  }, [
    sellAmount,
    buyAmount,
    connected,
    sellBalance,
    approving,
    allowance,
    nativeBalance,
    approvalFee,
    priceImpactWithoutFee,
    showModal,
    approve,
    proceed,
    liquidity,
  ])

  return (
    <div className="flex flex-col space-y-[3px]">
      <Info text="Why Approve?" tooltip_id="why-approve">
        <div className="flex flex-col space-y-1 max-w-[273px]">
          <h3 className="!text-tooltip text-sm font-inter font-semibold leading-5">
            Give permission to exchange BNB
          </h3>
          <p className="!text-tooltip font-inter text-12 leading-5">
            To continue, you need to allow Vert finance contracts to use your
            BNB. This has to be done only once for each token.{" "}
            <span className="text-primary">Learn more</span>
          </p>
        </div>
      </Info>
      {button}
    </div>
  )
}

ConverterButton.defaultProps = {
  trade: undefined,
  sellAmount: undefined,
  buyAmount: undefined,
}
