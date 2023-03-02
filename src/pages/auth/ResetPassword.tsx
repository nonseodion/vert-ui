import React, { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { useLocation, useNavigate } from "react-router-dom"
import { ResetPasswordSuccessfulModal } from "../../components/auth"
import { Button, Wrapper } from "../../components/general"
import { Input } from "../../components/inputs"
import { BackButton } from "../../components/navigation"
import useModal from "../../hooks/useModal"
import { PageRoutes } from "../../utils/constants"
import { canGoBack } from "../../utils/functions"

interface ResetPasswordValues {
  password: string
  password2: string
}

export default function ResetPassword() {
  const { showModal } = useModal()
  const navigate = useNavigate()
  const location = useLocation()
  const [loading, setLoading] = useState(false)
  const {
    control,
    formState: { errors },
    setError,
    handleSubmit,
  } = useForm<ResetPasswordValues>()

  const onSubmit = (data: ResetPasswordValues) => {
    if (data.password !== data.password2) {
      const error = {
        type: "validate",
        message: "Passwords do not match",
      }
      setError("password", error)
      setError("password2", error)
      return
    }
    localStorage.setItem("data", JSON.stringify(data))
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      showModal({
        modal: "RESET_PASSWORD_SUCCESSFUL_MODAL",
      })
    }, 2000)
  }

  return (
    <Wrapper hideTopNav>
      <ResetPasswordSuccessfulModal />
      <div className="px-4">
        <div className="max-w-[375px] mt-[98px] mx-auto bg-lightGreen px-7 pt-[30px] pb-[36px] rounded-3xl">
          <h3 className="text-dark2 font-bold text-[19px] leading-[21px] mb-[18px]">
            Reset Password
          </h3>
          <p className="text-[#27303D] text-13 leading-6 mb-[22px]">
            To ensure that account is well protected, please use 8 or more
            characters with a mix of letters, numbers & symbols.
          </p>
          <form
            className="flex flex-col space-y-7"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controller
              control={control}
              name="password"
              rules={{
                required: true,
                validate: (v) => v?.trim()?.length > 0,
              }}
              render={({ field }) => (
                <Input
                  type="password"
                  placeholder="Enter new password"
                  label="New password"
                  labelClassName="text-[11px] mb-[5px]"
                  className="text-13"
                  hasError={!!errors.password}
                  autoFocus
                  errorMessage={errors?.password?.message}
                  {...field}
                />
              )}
            />

            <Controller
              control={control}
              name="password2"
              rules={{
                required: true,
                validate: (v) => v?.trim()?.length > 0,
              }}
              render={({ field }) => (
                <Input
                  type="password"
                  placeholder="Enter new password again"
                  label="Confirm new password"
                  labelClassName="text-[11px] mb-[5px]"
                  className="text-13"
                  hasError={!!errors.password2}
                  {...field}
                />
              )}
            />

            <Button
              text="Reset"
              loadingText="Resetting password"
              type="submit"
              loading={loading}
              className="!h-10 font-medium text-[14.84px] !py-0 disabled:bg-primary/[.4] !rounded-lg mb-[50px]"
            />
            <BackButton
              onClick={() => {
                if (canGoBack(location)) {
                  navigate(-1)
                } else {
                  navigate(PageRoutes.HOME)
                }
              }}
            />
          </form>
        </div>
      </div>
    </Wrapper>
  )
}
