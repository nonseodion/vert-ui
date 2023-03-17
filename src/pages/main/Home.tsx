import React from "react"
import { CreateAccountModal, SuccessfulSignup } from "../../components/auth"
import { Wrapper } from "../../components/general"
import { Converter } from "../../components/transactions"

export default function Home() {
  return (
    <Wrapper hideFooter={false}>
      <CreateAccountModal />
      <SuccessfulSignup />
      <div className="flex flex-col large:flex-row pt-[50px] large:pt-[114px] pb-[242px] px-6 large:px-[80px] large:justify-between">
        <div className="large:max-w-[60%]">
          <h1 className="large:text-left text-center text-white text-[34px] large:text-[54px] font-bold leading-[51px] large:leading-[81px]">
            Exchange Your <span className="text-primary">Crypto</span>{" "}
            <br className="large:block hidden" />
            For <span className="text-primary">Fiat,</span> Fast & Easy
          </h1>
          <p className="hidden large:block mt-10 max-w-[644px] text-grey leading-[37.5px] text-25">
            Vert finance offers a fast and secure way to
            <br /> convert your digital assets into the funds you need.
            <br /> With just a few clicks, you can turn your crypto into
            <br /> cash and have it sent directly to your bank
            <br /> account.
          </p>
        </div>
        <div className="large:block mt-[70px] large:mt-0 flex items-center justify-center">
          <Converter />
        </div>
      </div>
    </Wrapper>
  )
}
