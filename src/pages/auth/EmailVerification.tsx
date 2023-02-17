import React, { useState, useEffect } from "react"
import OtpInput from "react-otp-input"
import { useNavigate } from "react-router-dom"
import { ReactComponent as ArrowLeft } from "../../assets/icons/arrow-left.svg"
import { Button, Loader, Wrapper } from "../../components/general"
import useModal from "../../hooks/useModal"
import { routes } from "../../utils/constants"
import { doNothing } from "../../utils/functions"

export default function EmailVerification() {
  const navigate = useNavigate()
  const { showModal } = useModal()
  const [otp, setOtp] = useState<string>("")
  const [counter, setCounter] = useState<number>(60)
  const [resending, setResending] = useState<boolean>(false)
  const [validating, setValidating] = useState<boolean>(false)

  useEffect(() => {
    if (counter > 0) {
      setTimeout(() => setCounter(counter - 1), 1000)
    }
  }, [counter])

  const validateOtp = () => {
    setValidating(true)
    setTimeout(() => {
      setValidating(false)
      showModal({ modal: "successful_sign_up" })
      navigate(routes.home)
    }, 2000)
  }

  useEffect(() => {
    if (otp.length === 6) {
      validateOtp()
    }
  }, [otp])

  const getSeconds = () => {
    if (counter < 10) return `0${counter}`
    if (counter === 60) return `00`
    return counter
  }

  const resendCode = () => {
    setResending(true)
    setTimeout(() => {
      setResending(false)
      setCounter(60)
    }, 2000)
  }

  return (
    <Wrapper hideTopNav>
      <div className="pt-[158px] flex items-center justify-center">
        <div className="mx-auto max-w-[calc(100vw_-_40px)] lg:w-[432px] bg-lightGreen rounded-3xl px-[19px] py-6">
          <div className="flex items-center justify-between">
            <button type="button" onClick={() => navigate(-1)}>
              <ArrowLeft />
            </button>
            <h3 className="text-[#333333] text-[19px] font-bold">
              Verify your email address
            </h3>
            <button
              type="button"
              onClick={doNothing}
              className="opacity-0 pointer-events-none"
            >
              <ArrowLeft />
            </button>
          </div>
          <p className="mt-[34px] mb-[50px] text-sm text-[#27303D] max-w-[339px] mx-auto text-center">
            Please enter the OTP sent to the email address you provided
          </p>
          <div className="otp-input-container flex items-center justify-center">
            <OtpInput
              value={otp}
              inputStyle="!w-[49px] h-[62px] outline-none mr-[10px] rounded-[10px] border border-lightGreen focus:border-primary"
              onChange={setOtp}
              numInputs={6}
              isInputNum
              shouldAutoFocus
            />
          </div>
          {validating && (
            <div className="mt-[33.75px] flex items-center justify-center">
              <Loader className="h-[22.5px] w-[22.5px]" />
            </div>
          )}
          {!validating && (
            <div>
              {counter > 0 ? (
                <p className="mt-[30px] text-center font-regular text-13">
                  Resend code in{" "}
                  <span className="text-primary font-semibold">
                    {counter === 60 ? "01" : "00"}:{getSeconds()}
                  </span>
                </p>
              ) : (
                <div className="flex items-center justify-center mx-[9px] mt-[34px]">
                  <Button
                    background="transparent"
                    bordered
                    fullWidth
                    text="Resend Code"
                    onClick={resendCode}
                    loading={resending}
                    className="h-10 py-0  text-primary text-13 font-medium"
                  />
                </div>
              )}
            </div>
          )}
          {/* <div className="mt-[13px] ">
            <Button
              text="Verify your account"
              onClick={doNothing}
              fullWidth
              className="rounded-[4px]"
            />
          </div> */}
        </div>
      </div>
    </Wrapper>
  )
}
