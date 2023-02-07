import React from "react"
import { ReactComponent as Retry } from "../../assets/icons/retry.svg"
import { ReactComponent as Retry2 } from "../../assets/icons/retry-2.svg"
import ConverterSide from "./ConverterSide"

const Converter: React.FC = () => (
  <div className="w-[418px] rounded-3xl bg-lightGreen">
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
      <p className="text-center text-primary font-bold text-[13px] mb-4">
        <span>1 BNB</span>
        <span> = </span>
        <span>206,611.10 NGN</span>
      </p>
      <div className="flex flex-col space-y-4 mb-[30px]">
        <ConverterSide side="sell" />
        <ConverterSide side="buy" />
      </div>
      <button
        className="bg-cta py-[17px] h-[48px] w-full rounded disabled:text-[black]/[.3] text-sm font-semibold leading-[2px] disabled:cursor-not-allowed"
        disabled
        type="button"
      >
        Enter amount to exchange
      </button>
    </div>
  </div>
)

export default Converter
