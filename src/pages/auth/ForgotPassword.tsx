import React from "react"
import { useForm, Controller } from "react-hook-form"
import isEmail from "validator/lib/isEmail"
import { Button, Wrapper } from "../../components/general"
import { Input } from "../../components/inputs"
import { BackButton } from "../../components/navigation"

interface ForgotPasswordValues {
  email: string
}

export default function ForgotPassword() {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<ForgotPasswordValues>()

  const onSubmit = (data: ForgotPasswordValues) => {
    localStorage.setItem("email", JSON.stringify(data))
  }

  return (
    <Wrapper hideTopNav>
      <div className="px-4">
        <div className="max-w-[375px] mt-[98px] mx-auto bg-lightGreen px-7 pt-[23px] pb-[34px] rounded-3xl">
          <h3 className="text-dark2 font-bold text-[19px] leading-[21px] mb-[18px]">
            Forgot Password?
          </h3>
          <p className="text-[#27303D] text-13 leading-6 mb-[22px]">
            Please type in the email address linked to your vert finance account
            to reset your password.
          </p>
          <form
            className="flex flex-col space-y-7"
            onSubmit={handleSubmit(onSubmit)}
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
                  type="email"
                  placeholder="example@gmail.com"
                  label="Email"
                  labelClassName="text-[11px] mb-[5px]"
                  hasError={!!errors.email}
                  {...field}
                />
              )}
            />

            <Button
              text="Reset"
              type="submit"
              disabled={!!errors.email}
              className="!h-10 font-medium text-[14.84px] py-0 disabled:bg-primary/[.4] !rounded-lg mb-[50px]"
            />
            <BackButton />
          </form>
        </div>
      </div>
    </Wrapper>
  )
}
