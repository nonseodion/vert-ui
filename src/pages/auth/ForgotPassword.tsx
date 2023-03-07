import React, { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { useLocation, useNavigate } from "react-router-dom"
import isEmail from "validator/lib/isEmail"
import { ResetPasswordModal } from "../../components/auth"
import { Button, Wrapper } from "../../components/general"
import { Input } from "../../components/inputs"
import { BackButton } from "../../components/navigation"
import { useModal } from "../../hooks"
import { PageRoutes } from "../../utils/constants"
import { goBackConditionally } from "../../utils/functions"

interface ForgotPasswordValues {
  email: string
}

export default function ForgotPassword() {
  const { showModal, hideModal } = useModal()
  const navigate = useNavigate()
  const location = useLocation()
  const [loading, setLoading] = useState<boolean>(false)
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<ForgotPasswordValues>()

  const onSubmit = (data: ForgotPasswordValues) => {
    localStorage.setItem("email", JSON.stringify(data))
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      showModal({
        modal: "RESET_PASSWORD_MODAL",
        modalParams: { email: data.email },
        onConfirm: () => {
          hideModal()
          navigate(PageRoutes.RESET_PASSWORD)
        },
      })
    }, 2000)
  }

  return (
    <Wrapper hideTopNav>
      <ResetPasswordModal />
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
                  className="text-13"
                  hasError={!!errors.email}
                  autoFocus
                  {...field}
                  ref={null}
                />
              )}
            />

            <Button
              text="Reset"
              loadingText="Resetting"
              type="submit"
              disabled={!!errors.email}
              loading={loading}
              className="!h-10 font-medium text-[14.84px] !py-0 disabled:bg-primary/[.4] !rounded-lg mb-[50px]"
            />
            <BackButton
              onClick={() =>
                goBackConditionally(navigate, location, PageRoutes.HOME)
              }
            />
          </form>
        </div>
      </div>
    </Wrapper>
  )
}
