import React, { useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { ReactComponent as History } from "../../assets/icons/retry.svg"
import ConverterSide from "./ConverterSide"
import { useModal } from "../../hooks"
import { Modals, PageRoutes } from "../../utils/constants"
import useConverterInterface from "../../hooks/interfaces/useConverterInferface"
import { TradePrice } from "./TradePrice"
import ConverterButton from "./ConverterButton"
import useWallet from "../../state/auth/useWallet"

export default function Converter() {
  const navigate = useNavigate()
  const { showModal, modalIsOpen } = useModal()

  const approveModalVisibility = modalIsOpen(Modals.APPROVE_TRANSACTION)
  const approveModalVisibilityRef = useRef(approveModalVisibility)
  const { connected } = useWallet()
  const {
    buyToken,
    sellToken,
    sellLogos,
    buyLogos,
    typedValue,
    buyAmount,
    setSellAmount,
    setBuyAmount,
    sellAmount,
    independentField,
    sellBalance,
    fiatBuyEqv,
    fiatSellEqv,
    dollarRates,
    exchangeRate,
    trade,
  } = useConverterInterface()

  useEffect(() => {
    approveModalVisibilityRef.current = approveModalVisibility
  }, [approveModalVisibility])

  return (
    <div className="w-[418px] rounded-3xl bg-lightGreen">
      <div className="h-[53px] flex items-center justify-between border-b border-border">
        <div className="ml-auto flex space-x-[21.01px] items-center mr-[19px]">
          {connected && (
            <button
              type="button"
              onClick={() => navigate(PageRoutes.TRANSACTIONS)}
            >
              <History />
            </button>
          )}
        </div>
      </div>
      <div className="px-[18px] pt-4 pb-6">
        {exchangeRate?.greaterThan(0) && (
          <TradePrice exchangeRate={exchangeRate} />
        )}
        <div className="flex flex-col space-y-4 mb-[15px]">
          <ConverterSide
            side="sell"
            onTokenSelect={() => showModal({ modal: Modals.TOKEN_MODAL })}
            token={sellToken}
            logos={sellLogos}
            amount={independentField === "sell" ? typedValue : sellAmount}
            setAmount={setSellAmount}
            fiatEqv={fiatSellEqv}
            tokenBalance={sellBalance}
          />
          <ConverterSide
            side="buy"
            token={buyToken}
            logos={buyLogos}
            amount={independentField === "buy" ? typedValue : buyAmount}
            setAmount={setBuyAmount}
            onTokenSelect={() => showModal({ modal: Modals.TOKEN_MODAL })}
            fiatEqv={fiatBuyEqv}
          />
        </div>
        <p className="mb-[30px] text-center text-[#6C7689] text-12 font-bold">
          <span className="text-primary">Rate:</span>{" "}
          {`1 USD ≈ ${dollarRates.ngn} NGN`}
        </p>
        <ConverterButton {...{ trade, sellAmount, buyAmount, sellBalance }} />
      </div>
    </div>
  )
}
