import React from "react"
import { useNavigate } from "react-router-dom"
import { ReactComponent as PadLock } from "../../assets/icons/padlock.svg"
import { ReactComponent as Security } from "../../assets/icons/security-2.svg"
import { Button, Wrapper } from "../../components/general"
import { Navigator } from "../../components/navigation"
import { SettingsContent } from "../../components/settings"
import { routes } from "../../utils/constants"

export default function SecuritySettings() {
  const navigate = useNavigate()
  const isWalletUser = true
  return (
    <Wrapper>
      <div className="px-4 pt-5 lg:pt-[60px] lg:px-[80px] flex flex-col space-y-[50px] lg:flex-row lg:space-y-20 lg:space-x-[77px]">
        <Navigator />
        <SettingsContent title="Security settings">
          <div className="flex flex-col space-y-5">
            <div className="min-h-[92px] px-[18px] py-[21px] bg-white rounded-xl flex items-center justify-between">
              <div className="flex space-x-[10px] items-center">
                <div className="flex-shrink-0 h-[50px] w-[50px] rounded-full bg-primary/[.15] flex items-center justify-center">
                  <PadLock />
                </div>
                <div className="flex flex-col space-y-[7px]">
                  <h3 className="text-sm font-medium text-[#0F172A]">
                    {isWalletUser ? "Set Password" : "Change Password"}
                  </h3>
                  <p className="text-12 text-lightBlue">
                    {isWalletUser
                      ? "Protect your account with a password"
                      : "Change password used to sign in with your email."}
                  </p>
                </div>
              </div>
              <Button
                text={isWalletUser ? "Set" : "Change"}
                className="h-[37px] py-0 min-w-[89px]"
                onClick={() =>
                  navigate(
                    isWalletUser ? routes.set_password : routes.change_password
                  )
                }
              />
            </div>
            <div className="min-h-[92px] px-[18px] py-[21px] bg-white rounded-xl flex items-center justify-between">
              <div className="flex space-x-[10px] items-center">
                <div className="flex-shrink-0 h-[50px] w-[50px] rounded-full bg-primary/[.15] flex items-center justify-center">
                  <Security />
                </div>
                <div className="flex flex-col space-y-[7px]">
                  <h3 className="text-sm font-medium text-[#0F172A]">
                    Manage Token Approval
                  </h3>
                  <p className="text-12 text-lightBlue">
                    Manage & revoke your token approvals
                  </p>
                </div>
              </div>
              <Button
                text="Manage"
                className="h-[37px] py-0"
                onClick={() => navigate(routes.manage_token_approvals)}
              />
            </div>
          </div>
        </SettingsContent>
      </div>
    </Wrapper>
  )
}
