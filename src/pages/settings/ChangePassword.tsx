import React from "react"
import { useNavigate } from "react-router-dom"
import { Button, Wrapper } from "../../components/general"
import Input from "../../components/inputs/Input"
import { BackButton } from "../../components/navigation"
import SettingsContent from "../../components/settings/SettingsContent"
import { PageRoutes } from "../../utils/constants"

export default function ChangePassword() {
  const navigate = useNavigate()
  return (
    <Wrapper>
      <div className="px-4 pt-5 lg:pt-[60px] lg:px-[80px] flex flex-col space-y-[50px] lg:flex-row lg:space-y-20 lg:space-x-[77px]">
        <div className="flex flex-col space-y-[30px] lg:fixed flex-shrink-0 lg:max-w-[247px]">
          <h3 className="font-bold text-2xl text-white lg:text-[40px]">
            My Account
          </h3>
          <div className="flex flex-col space-y-[26.5px]">
            <BackButton
              onClick={() => navigate(PageRoutes.SECURITY_SETTINGS)}
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
          <div className="flex flex-col space-y-[30px]">
            <div className="flex flex-col space-y-[10px]">
              <p className="text-white font-medium">Old password</p>
              <Input
                placeholder="Please enter your current password"
                type="password"
                outerClassName="border border-white/[.5] rounded-lg"
                className="placeholder:text-lightBlue !text-13 !text-white"
              />
            </div>
            <div className="flex flex-col space-y-[10px]">
              <p className="text-white font-medium">New password</p>
              <Input
                placeholder="Please enter the new password"
                type="password"
                outerClassName="border border-white/[.5] rounded-lg"
                className="placeholder:text-lightBlue !text-13 !text-white"
              />
            </div>
            <div className="flex flex-col space-y-[10px]">
              <p className="text-white font-medium">Confirm new password</p>
              <Input
                placeholder="Please enter the new password again"
                type="password"
                outerClassName="border border-white/[.5] rounded-lg"
                className="placeholder:text-lightBlue !text-13 !text-white"
              />
            </div>
          </div>
          <Button text="Confirm" className="mt-10" />
        </SettingsContent>
      </div>
    </Wrapper>
  )
}
