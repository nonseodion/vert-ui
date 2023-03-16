import React from "react"
import { Button, Wrapper } from "../../components/general"
import { Input } from "../../components/inputs"
import { Navigator } from "../../components/navigation"
import { SettingsContent } from "../../components/settings"

export default function ProfileSettings() {
  return (
    <Wrapper>
      <div className="px-4 pt-5 lg:pt-9 lg:px-[80px] flex flex-col space-y-[50px] lg:flex-row lg:space-y-20 lg:space-x-[77px]">
        <Navigator />
        <SettingsContent title="Profile settings">
          <div className="flex flex-col space-y-[30px]">
            <div className="flex flex-col space-y-[10px]">
              <p className="text-white font-medium">Username</p>
              <Input
                placeholder="@    enter your username"
                outerClassName="border border-white/[.5] rounded-lg"
                className="placeholder:text-lightBlue !text-13 !text-white"
              />
              <p className="text-13 text-lightBlue">
                The username will be used as your display name
              </p>
            </div>
            <div className="flex flex-col space-y-[10px]">
              <p className="text-white font-medium">Email</p>
              <Input
                placeholder="sketchydesigns50@gmail.com"
                outerClassName="border border-white/[.5] rounded-lg"
                className="placeholder:text-lightBlue !text-13 !text-white"
                disabled
              />
              <p className="text-13 text-lightBlue">
                Your email addresss cannot be changed once your account has been
                created.
              </p>
            </div>
          </div>
          <Button text="Save changes" className="mt-10" />
        </SettingsContent>
      </div>
    </Wrapper>
  )
}
