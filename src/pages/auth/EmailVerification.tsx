import React, { useState } from "react"
import OtpInput from "react-otp-input"
import { useNavigate } from "react-router-dom"
import { ReactComponent as ArrowLeft } from "../../assets/icons/arrow-left.svg"
import { Button, Wrapper } from "../../components/general"
import { doNothing } from "../../utils/functions"

export default function EmailVerification() {
  const navigate = useNavigate()
  const [otp, setOtp] = useState("")
  return (
    <Wrapper hideTopNav>
      <div className="mt-[158px] flex items-center justify-center">
        <div className="w-[500px] bg-lightGreen rounded-3xl">
          <div className="pt-[25px] pb-8 px-[39px] border-b border-b-lightBlue">
            <h3 className="text-[#333333] text-[19px]">
              Verify your email address
            </h3>
          </div>
          <div className="px-[39px] pt-[30.5px] pb-[34px]">
            <p className="text-[#27303D] text-sm text-center leading-6 mb-[60.5px]">
              Please enter the OTP sent to the email address you provided
            </p>
            <div className="my-[50px] flex items-center justify-center">
              <OtpInput
                value={otp}
                inputStyle="!w-[49px] h-[62px] outline-none mr-[10px] rounded-[10px] border border-lightGreen focus:border-primary"
                onChange={setOtp}
                numInputs={6}
                isInputNum
                shouldAutoFocus
              />
            </div>
            <div className="mx-[13px] ">
              <Button
                text="Verify your account"
                onClick={doNothing}
                fullWidth
                className="rounded-[4px]"
              />
            </div>
            <div className="text-[13px] flex justify-center text-lightBlue mt-[31px] mb-[54px]">
              <p>Didn&apos;t receive your confirmation code?</p>
              <button type="button" className="text-primary ml-1">
                Resend code
              </button>
            </div>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="border-none bg-white rounded-lg flex px-4 h-[40px] outline-none justify-center items-center space-x-[10px]"
            >
              <ArrowLeft />
              <span className="text-primary text-sm font-medium">Back</span>
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}
