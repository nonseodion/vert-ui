import React from "react"
import { ReactComponent as Refresh } from "../../assets/icons/refresh.svg"
import { ReactComponent as Retry } from "../../assets/icons/retry.svg"
import { ReactComponent as Retry2 } from "../../assets/icons/retry-2.svg"
import ConverterSide from "./ConverterSide"
import TokenModal from "./TokenModal"
import useModal from "../../hooks/useModal"
import useConverterInterface from "../../hooks/interfaces/useConverterInferface"
import { Modals } from "../../utils/constants"

export default function Converter() {
  const { showModal } = useModal()
  const {
    buyToken,
    sellToken,
    sellLogo,
    buyLogo,
    typedValue,
    buyAmount,
    setSellAmount,
    setBuyAmount,
    sellAmount,
    independentField,
  } = useConverterInterface()
  return (
    <div className="w-[418px] rounded-3xl bg-lightGreen">
      <TokenModal />
      <div className="h-[53px] flex items-center justify-between border-b border-border">
        <div className="ml-auto flex space-x-[21.01px] items-center mr-[22px]">
          <button type="button">
            <Retry />
          </button>
          <button type="button">
            <Retry2 />
          </button>
        </div>
      </div>
      <div className="px-[18px] pt-4 pb-6">
        <div className="flex space-x-[9.28px] items-center  mb-[22px]">
          <div className="flex items-center">
            <p className="text-center text-black font-medium text-13">
              <span>1 BNB</span>
              <span> = </span>
              <span>206,611.10</span>
            </p>
            <select className="ml-1 font-bold text-13 bg-transparent mt-[-2px]">
              <option value="NGN">NGN</option>
            </select>
          </div>
          <button
            type="button"
            className="h-6 w-6 bg-primary/[.15] rounded-full flex items-center justify-center"
          >
            <Refresh className="h-4 w-4" />
          </button>
        </div>
        <div className="flex flex-col space-y-4 mb-[15px]">
          <ConverterSide
            side="sell"
            onTokenSelect={() => showModal({ modal: Modals.TOKEN_MODAL })}
            token={sellToken}
            logo={sellLogo}
            amount={independentField === "sell" ? typedValue : sellAmount}
            setAmount={setSellAmount}
          />
          <ConverterSide
            side="buy"
            token={buyToken}
            logo={buyLogo}
            amount={independentField === "buy" ? typedValue : buyAmount}
            setAmount={setBuyAmount}
            onTokenSelect={() => showModal({ modal: Modals.TOKEN_MODAL })}
          />
        </div>
        <p className="mb-[30px] text-center text-[#6C7689] text-12 font-bold">
          <span className="text-primary">Rate:</span> 1 USD ≈ 760.22 NGN
        </p>
        <button
          className="bg-disabled py-[17px] h-[48px] w-full rounded disabled:text-[black]/[.3] text-sm font-semibold leading-[2px] disabled:cursor-not-allowed"
          disabled
          type="button"
        >
          Enter amount to exchange
        </button>
      </div>
    </div>
  )
}
