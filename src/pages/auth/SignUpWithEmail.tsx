import React from "react"
import { useForm, Controller } from "react-hook-form"
import isEmail from "validator/lib/isEmail"
import { Link, useNavigate } from "react-router-dom"
import { ReactComponent as LoneLogo } from "../../assets/icons/logo-lone.svg"
import { Button, Glow, Wrapper } from "../../components/general"
import { Input } from "../../components/inputs"
import { PageRoutes } from "../../utils/constants"

interface SignUpWithEmailValues {
  email: string
  username: string
  password: String
}

export default function SignUpWithEmail() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignUpWithEmailValues>()
  const navigate = useNavigate()
  const onSubmit = handleSubmit((data) => {
    localStorage.setItem("data", JSON.stringify(data))
    navigate(PageRoutes.EMAIL_VERIFICATION)
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
            <p className="text-white text-center text-lg">Sign up</p>
            <div className="bg-lightGreen rounded-xl w-[349px] p-7">
              <form
                className="flex flex-col space-y-4"
                onSubmit={onSubmit}
                method="post"
              >
                <Controller
                  control={control}
                  name="email"
                  rules={{
                    required: true,
                    validate: (v) => isEmail(v?.trim()),
                  }}
                  render={({ field }) => (
                    <Input
                      placeholder="Email Address"
                      autoFocus
                      type="email"
                      hasError={!!errors.email}
                      errorMessage="The email you entered is not in the correct format. Please check."
                      {...field}
                      ref={null}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="username"
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Input
                      placeholder="Username"
                      hasError={!!errors.username}
                      {...field}
                      ref={null}
                    />
                  )}
                />
                <Controller
                  control={control}
                  rules={{ required: true }}
                  name="password"
                  render={({ field }) => (
                    <Input
                      placeholder="Enter password"
                      type="password"
                      hasError={!!errors.password}
                      {...field}
                      ref={null}
                    />
                  )}
                />

                <p className="mt-[10px] text-grey text-[10px] mb-[30px]">
                  By signing up, you agree to our{" "}
                  <a
                    href="https://www.google.com"
                    className="text-primary underline"
                  >
                    Terms and Conditions
                  </a>{" "}
                  and{" "}
                  <a
                    href="https://www.google.com"
                    className="text-primary underline"
                  >
                    Privacy Policy
                  </a>{" "}
                  and to receive periodic updates.
                </p>
                <Button
                  type="submit"
                  text="Sign Up"
                  fullWidth
                  className="text-[14.48px]"
                />
                <h4 className="text-black text-[13px] text-center font-semibold my-[25px]">
                  OR
                </h4>
                <Button
                  text="Sign up with Wallet"
                  background="transparent"
                  onClick={() => navigate(PageRoutes.SIGN_UP_WITH_WALLET)}
                  fullWidth
                  className="text-[14.48px] font-semibold"
                  textColor="dark"
                  bordered
                />
              </form>
            </div>
            <p className="text-center text-white text-[15px] mt-8">
              Already have an account?{" "}
              <Link
                className="text-[15px] text-primary underline"
                to={PageRoutes.SIGN_IN_WITH_EMAIL}
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}
