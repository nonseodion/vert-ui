import React from "react"
import { Wrapper } from "../../components/general"
import Converter from "../../components/transactions/Converter"

export default function Home() {
  return (
    <Wrapper hideFooter={false}>
      <div className="flex flex-col lg:flex-row pt-[50px] lg:pt-[114px] pb-[242px] px-6 lg:px-[80px] lg:justify-between">
        <div className="lg:max-w-[60%]">
          <h1 className="lg:text-left text-center text-white text-[34px] lg:text-[54px] font-bold leading-[51px] lg:leading-[81px]">
            Exchange Your <span className="text-primary">Crypto</span>{" "}
            <br className="lg:block hidden" />
            For <span className="text-primary">Fiat,</span> Fast & Easy
          </h1>
          <p className="hidden lg:block mt-10 max-w-[644px] text-grey leading-[37.5px] text-[25px]">
            Vert finance offers a fast and secure way to
            <br /> convert your digital assets into the funds you need.
            <br /> With just a few clicks, you can turn your crypto into
            <br /> cash and have it sent directly to your bank
            <br /> account.
          </p>
        </div>
        <div className="lg:block mt-[100px] lg:mt-0 flex items-center justify-center">
          <Converter />
        </div>
      </div>
    </Wrapper>
  )
}
