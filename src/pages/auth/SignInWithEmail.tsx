import React from "react"
import { useForm, Controller } from "react-hook-form"
import isEmail from "validator/lib/isEmail"
import { Link, useNavigate } from "react-router-dom"
import { ReactComponent as LoneLogo } from "../../assets/icons/logo-lone.svg"
import { Button, Glow, Wrapper } from "../../components/general"
import { Input } from "../../components/inputs"
import useAuth from "../../state/auth/useAuth"
import { useModal } from "../../hooks"
import { Modals, PageRoutes } from "../../utils/constants"

interface SignInWithEmailValues {
  email: string
  password: string
}

export default function SignInWithEmail() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignInWithEmailValues>()
  const { showModal } = useModal()
  const { authenticateUser } = useAuth()
  const navigate = useNavigate()

  const onSubmit = handleSubmit((data) => {
    localStorage.setItem("data", JSON.stringify(data))
    authenticateUser()
    navigate(PageRoutes.HOME)
  })

  return (
    <Wrapper hideTopNav>
      <Glow />
      <div className="flex justify-center pt-[50px] pb-[30px]">
        <div className="flex flex-col justify-center items-center space-y-[50.75px]">
          <button type="button" onClick={() => navigate(PageRoutes.HOME)}>
            <LoneLogo />
          </button>
          <div className="flex flex-col space-y-8">
            <p className="text-white text-center text-lg">
              Sign in to Vert finance
            </p>
            <div className="bg-lightGreen rounded-xl w-[349px] p-7">
              <form className="flex flex-col space-y-4" onSubmit={onSubmit}>
                <Controller
                  control={control}
                  name="email"
                  rules={{
                    required: true,
                    validate: (v) => isEmail(v?.trim()),
                  }}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      placeholder="Enter your email"
                      autoFocus
                      errorMessage="The email you entered is not in the correct format. Please check."
                      type="email"
                      hasError={!!errors.email}
                      onChange={onChange}
                      value={value}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="password"
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      placeholder="Enter password"
                      type="password"
                      hasError={!!errors.password}
                      onChange={onChange}
                      value={value}
                    />
                  )}
                />

                <div className="mt-[30px]">
                  <Button
                    text="Sign In"
                    type="submit"
                    fullWidth
                    className="text-[14.48px]"
                  />
                  <div className="mt-[6px] mb-[15px] flex items-center justify-between">
                    <div />
                    <Link
                      className="text-primary underline text-[10px]"
                      to={PageRoutes.FORGOT_PASSWORD}
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <h4 className="text-black text-[13px] text-center font-semibold mb-[35px]">
                    OR
                  </h4>
                  <Button
                    text="Connect Wallet"
                    background="transparent"
                    onClick={() => showModal({ modal: Modals.CONNECT_WALLET })}
                    fullWidth
                    className="text-[14.48px] font-semibold"
                    textColor="dark"
                    bordered
                  />
                </div>
              </form>
            </div>
            <p className="text-center text-white text-[15px] mt-8">
              Don&apos;t have an account?{" "}
              <Link
                className="text-[15px] text-primary underline"
                to={PageRoutes.SIGN_UP_WITH_EMAIL}
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}
