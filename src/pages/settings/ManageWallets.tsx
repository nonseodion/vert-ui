import React from "react"
import { ReactComponent as MetaMask } from "../../assets/icons/metamask.svg"
import { ReactComponent as Copy } from "../../assets/icons/copy.svg"
import { Button, Wrapper } from "../../components/general"
import { Navigator } from "../../components/navigation"
import SettingsContent from "../../components/settings/SettingsContent"

export default function ManageWallets() {
  return (
    <Wrapper>
      <div className="px-4 pt-5 lg:pt-[60px] lg:px-[80px] flex flex-col space-y-[50px] lg:flex-row lg:space-y-20 lg:space-x-[77px]">
        <div className="flex flex-col space-y-[30px]">
          <h3 className="font-bold text-2xl text-white lg:text-[40px]">
            My Account
          </h3>
          <Navigator currPage="Wallet" />
        </div>
        <SettingsContent title="Manage Wallets">
          <div className="flex flex-col space-y-[14px] mb-[85px]">
            <div className="bg-white rounded-xl h-[83px] flex items-center justify-between px-[20.85px]">
              <div className="flex space-x-3 items-center">
                <div className="flex items-center justify-center h-7 w-7 bg-[#FFD3A2] rounded-full">
                  <MetaMask />
                </div>
                <div className="flex flex-col space-y-[9.5px]">
                  <div className="flex items-center space-x-[3.68px]">
                    <span className="font-medium text-base text-black underline">
                      0x6810...9568
                    </span>
                    <button type="button">
                      <Copy />
                    </button>
                  </div>
                  <div className="flex space-x-1 items-center">
                    <div className="h-[9px] w-[9px] rounded-full bg-primary" />
                    <span className="text-black text-[11.13px]">connected</span>
                  </div>
                </div>
              </div>
              <Button
                text="Unlink"
                bordered
                background="transparent"
                className="border-dark h-10 py-0 text-[#010304] font-semibold text-sm"
              />
            </div>
            <div className="bg-white rounded-xl h-[83px] flex items-center justify-between px-[20.85px]">
              <div className="flex space-x-3 items-center">
                <div className="flex flex-col space-y-[9.5px]">
                  <div className="flex items-center space-x-[3.68px]">
                    <span className="font-medium text-base text-black underline">
                      0x6810...9568
                    </span>
                    <button type="button">
                      <Copy />
                    </button>
                  </div>
                </div>
              </div>
              <Button
                text="Unlink"
                bordered
                background="transparent"
                className="border-dark h-10 py-0 text-[#010304] font-semibold text-sm"
              />
            </div>
            <div className="bg-white rounded-xl h-[83px] flex items-center justify-between px-[20.85px]">
              <div className="flex space-x-3 items-center">
                <div className="flex flex-col space-y-[9.5px]">
                  <div className="flex items-center space-x-[3.68px]">
                    <span className="font-medium text-base text-black underline">
                      0x6810...9568
                    </span>
                    <button type="button">
                      <Copy />
                    </button>
                  </div>
                </div>
              </div>
              <Button
                text="Unlink"
                bordered
                background="transparent"
                className="border-dark h-10 py-0 text-[#010304] font-semibold text-sm"
              />
            </div>
          </div>
        </SettingsContent>
      </div>
    </Wrapper>
  )
}
