import React, { useMemo } from "react"
import { ReactComponent as Search } from "../../assets/icons/search.svg"
import { ReactComponent as Settings } from "../../assets/icons/settings.svg"
import { ReactComponent as Exit } from "../../assets/icons/exit.svg"
import userTokens, { availableTokens } from "../../dummy/user-tokens"
import UserToken from "./UserToken"
import { Button } from "../general"

interface SelectTokenProps {
  setCurrentStep: React.Dispatch<React.SetStateAction<string>>
  setAddress: React.Dispatch<React.SetStateAction<string>>
  steps: { [key: string]: string }
  address: string
}

export default function SelectToken({
  address,
  setAddress,
  setCurrentStep,
  steps,
}: SelectTokenProps) {
  const addressIsEmpty = useMemo(() => address.trim().length === 0, [address])

  return (
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
            key={token.token}
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
            <div className="flex space-x-4 items-center mb-8" key={token.token}>
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
  )
}
