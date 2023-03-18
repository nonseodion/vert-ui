import React from "react"
import { useForm, Controller } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { Button, Wrapper } from "../../components/general"
import { Input } from "../../components/inputs"
import { BackButton } from "../../components/navigation"
import { SettingsContent } from "../../components/settings"
import { PageRoutes } from "../../utils/constants"
import { comparePasswords } from "../../utils/functions"

interface PasswordValues {
  old_password: string
  new_password: string
  confirm_new_password: string
}

export default function ChangePassword() {
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<PasswordValues>()

  const onSubmit = handleSubmit((data) => {
    localStorage.setItem("data", JSON.stringify(data))
  })

  const newPassword = watch("new_password")

  const navigate = useNavigate()
  return (
    <Wrapper>
      <div className="px-4 pt-5 lg:pt-9 lg:px-[80px] flex flex-col space-y-[50px] lg:flex-row lg:space-y-20 lg:space-x-[77px]">
        <div className="flex flex-col space-y-[30px] lg:fixed flex-shrink-0 lg:max-w-[247px]">
          <h3 className="font-bold text-2xl text-white lg:text-[40px]">
            My Account
          </h3>
          <div className="flex flex-col space-y-[26.5px]">
            <BackButton
              onClick={() => navigate(PageRoutes.SECURITY_SETTINGS)}
              className="!bg-transparent !px-0"
            />
            <div className="flex flex-col space-y-[10px]">
              <h3 className="text-base font-semibold text-white">
                Change Password
              </h3>
              <p className="text-lightBlue leading-6 w-full">
                Change password used to sign in with your email.
              </p>
            </div>
          </div>
        </div>
        <SettingsContent title="Security settings">
          <form onSubmit={onSubmit}>
            <div className="flex flex-col space-y-[30px]">
              <div className="flex flex-col space-y-[10px]">
                <p className="text-white font-medium">Old password</p>
                <Controller
                  control={control}
                  name="old_password"
                  rules={{
                    required: true,
                    validate: (v) => v?.trim()?.length > 0,
                  }}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      placeholder="Please enter your current password"
                      type="password"
                      outerClassName="border border-white/[.5] rounded-lg"
                      className="placeholder:text-lightBlue !text-13 !text-white"
                      hasError={!!errors.old_password}
                      onChange={onChange}
                      value={value}
                    />
                  )}
                />
              </div>
              <div className="flex flex-col space-y-[10px]">
                <p className="text-white font-medium">New password</p>
                <Controller
                  control={control}
                  name="new_password"
                  rules={{
                    required: true,
                    validate: (v) => v?.trim()?.length > 0,
                  }}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      placeholder="Please enter the new password"
                      type="password"
                      outerClassName="border border-white/[.5] rounded-lg"
                      className="placeholder:text-lightBlue !text-13 !text-white"
                      hasError={!!errors.new_password}
                      onChange={onChange}
                      value={value}
                    />
                  )}
                />
              </div>
              <div className="flex flex-col space-y-[10px]">
                <p className="text-white font-medium">Confirm new password</p>
                <Controller
                  control={control}
                  name="confirm_new_password"
                  rules={{
                    required: true,
                    validate: (v) => comparePasswords(v, newPassword),
                  }}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      placeholder="Please enter the new password again"
                      type="password"
                      outerClassName="border border-white/[.5] rounded-lg"
                      className="placeholder:text-lightBlue !text-13 !text-white"
                      hasError={
                        !!errors.confirm_new_password ||
                        !comparePasswords(value, newPassword)
                      }
                      onChange={onChange}
                      value={value}
                      errorMessage={value ? "Passwords do not match!" : ""}
                    />
                  )}
                />
              </div>
            </div>
            <Button text="Confirm" type="submit" className="mt-10" />
          </form>
        </SettingsContent>
      </div>
    </Wrapper>
  )
}
