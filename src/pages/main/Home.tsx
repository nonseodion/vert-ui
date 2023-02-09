import React from "react"
import { Wrapper } from "../../components/general"
import Converter from "../../components/transactions/Converter"

export default function Home() {
  return (
    <Wrapper>
      <div className="flex pt-[114px] pb-[242px] px-[80px]  space-x-[100px]">
        <div className="max-w-[60%]">
          <h1 className="text-white text-[54px] font-bold leading-[81px]">
            Exchange Your <span className="text-primary">Crypto</span> <br />
            For <span className="text-primary">Fiat,</span> Fast & Easy
          </h1>
          <p className="mt-10 max-w-[644px] text-grey leading-[37.5px] text-[25px]">
            Vert finance offers a fast and secure way to
            <br /> convert your digital assets into the funds you need.
            <br /> With just a few clicks, you can turn your crypto into
            <br /> cash and have it sent directly to your bank
            <br /> account.
          </p>
        </div>
        <div>
          <Converter />
        </div>
      </div>
    </Wrapper>
  )
}
