import React, { useEffect, useMemo, useState } from "react"
import clsx from "classnames"
import { ReactComponent as ArrowLeft } from "../../assets/icons/arrow-left.svg"
import { ReactComponent as Settings } from "../../assets/icons/settings.svg"
import { ReactComponent as Exit } from "../../assets/icons/exit.svg"
import { ReactComponent as Search } from "../../assets/icons/search.svg"
import { doNothing } from "../../utils/functions"
import userTokens, { availableTokens } from "../../dummy/user-tokens"
import UserToken from "./UserToken"
import { Button } from "../general"
import TokenImport from "./TokenImport"
import CustomTokens from "./CustomTokens"

const steps = {
  IMPORT_TOKEN: "IMPORT_TOKEN",
  DEFAULT: "DEFAULT",
  CUSTOM_TOKENS: "CUSTOM_TOKENS",
}

interface TokenModalProps {
  visible: boolean
  onClose: () => void
}

export default function TokenModal({ visible, onClose }: TokenModalProps) {
  const [address, setAddress] = useState<string>("")
  const [currentStep, setCurrentStep] = useState<string>(steps.DEFAULT)
  const addressIsEmpty = useMemo(() => address.trim().length === 0, [address])
  useEffect(() => {
    if (visible) {
      document.body.style.overflowY = "hidden"
    } else {
      document.body.style.overflowY = "visible"
      setAddress("")
    }
  }, [visible])
  return (
    <div
      className={clsx(
        "fixed top-0 transition-all duration-150 z-[51] left-0 h-full w-full overflow-y-scroll backdrop-blur-[5px]",
        { "opacity-0 pointer-events-none": !visible }
      )}
    >
      <div className="mx-auto transition-all duration-150 mt-[80px] mb-6 bg-white rounded-3xl w-[434px] pt-[30px]">
        <div className="flex items-center justify-between mb-[21px] px-6">
          <button
            type="button"
            onClick={() =>
              currentStep === steps.DEFAULT
                ? onClose()
                : setCurrentStep(steps.DEFAULT)
            }
          >
            <ArrowLeft />
          </button>
          <h3 className="text-xl text-black font-medium">
            {currentStep === steps.DEFAULT
              ? "Select a token"
              : currentStep === steps.IMPORT_TOKEN
              ? "Import Tokens"
              : "Custom Tokens"}
          </h3>
          {currentStep !== steps.IMPORT_TOKEN ? (
            <button
              type="button"
              onClick={doNothing}
              className="pointer-events-none opacity-0"
            >
              <ArrowLeft />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setCurrentStep(steps.DEFAULT)}
              className="border-none outline-none"
            >
              <Exit className="h-3 w-3 path-primary" />
            </button>
          )}
        </div>

        {currentStep === steps.DEFAULT ? (
          <div>
            <div className="h-12 mb-6 bg-[#E9FFE5] token-modal-wallet-search mx-6 rounded-xl flex items-center px-[18.8px]">
              <div className="flex-shrink-0 mr-[17.12px]">
                <Search />
              </div>
              <input
                className="h-12 flex-1 text-sm text-lightBlue bg-transparent outline-none border-none"
                placeholder="Search name or paste address"
                value={address}
                onChange={({ target: { value } }) => setAddress(value)}
              />
              {!addressIsEmpty && (
                <button
                  type="button"
                  onClick={() => setAddress("")}
                  className="outline-none border-none flex-shrink-0 ml-[3.05px]"
                >
                  <Exit className="h-3 w-3" />
                </button>
              )}
            </div>
            <div className="mx-6 flex flex-wrap pb-[9px]">
              {userTokens.map((token) => (
                <UserToken
                  token={token.token}
                  icon={token.icon}
                  className="mb-1 mr-[6px]"
                />
              ))}
            </div>
            <div className="mx-2 h-[1px] bg-lightBlue" />
            {addressIsEmpty ? (
              <ul className="px-6 pt-6 max-h-[320px] overflow-y-scroll scrollbar-hide">
                {availableTokens.map((token) => (
                  <div
                    className="flex space-x-4 items-center mb-8"
                    key={token.token}
                  >
                    <img
                      src={token.icon}
                      alt={token.token_name}
                      className="h-10 w-10 rounded-[20px]"
                    />
                    <div className="flex flex-col space-y-[3.5px]">
                      <h4 className="font-medium text-base text-black">
                        {token.token_name}
                      </h4>
                      <span className="text-[13px] text-lightBlue">
                        {token.token}
                      </span>
                    </div>
                  </div>
                ))}
              </ul>
            ) : (
              <div className="pt-6 h-[320px] px-6">
                <div className="justify-between flex items-center">
                  <div className="flex space-x-4 items-center">
                    <div className="h-10 bg-[#CADAF4] w-10 rounded-full flex items-center justify-center">
                      <span className="text-lightBlue text-base">W</span>
                    </div>
                    <div className="flex flex-col space-y-[3.5px]">
                      <h4 className="font-medium text-base text-black">
                        Wakanda Inu Token
                      </h4>
                      <span className="text-[13px] text-lightBlue">WKD</span>
                    </div>
                  </div>
                  <Button
                    text="Import"
                    onClick={() => setCurrentStep(steps.IMPORT_TOKEN)}
                    className="h-8 p-0 w-[72px] flex items-center justify-center text-[13px]"
                  />
                </div>
              </div>
            )}
            <div className="pb-[11px] flex items-center justify-center">
              <button
                type="button"
                onClick={() => setCurrentStep(steps.CUSTOM_TOKENS)}
                className="flex items-center space-x-[12.95px]"
              >
                <Settings />
                <span className="text-primary font-semibold text-base">
                  Custom Tokens
                </span>
              </button>
            </div>
          </div>
        ) : currentStep === steps.IMPORT_TOKEN ? (
          <TokenImport />
        ) : (
          <CustomTokens />
        )}
      </div>
    </div>
  )
}
