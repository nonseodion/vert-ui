import React, { useState } from "react"
import { ERC20Token } from "@pancakeswap/sdk"
import { ReactComponent as ArrowLeft } from "../../assets/icons/arrow-left.svg"
import { ReactComponent as Exit } from "../../assets/icons/exit.svg"
import { doNothing } from "../../utils/functions"
import TokenImport from "./TokenImport"
import CustomTokens from "./CustomTokens"
import SelectToken from "./SelectToken"
import { Modal } from "../general"
import useModal from "../../hooks/useModal"
import { Modals } from "../../utils/constants"
import { Steps } from "../../utils/types"

export default function TokenModal() {
  const { hideModal } = useModal(Modals.TOKEN_MODAL)
  const [currentStep, setCurrentStep] = useState<Steps>(Steps.DEFAULT)
  const [importingToken, importToken] = useState<{
    token: ERC20Token | undefined
    logo: string
  }>({ token: undefined, logo: "" })

  const startImportingToken = (token: ERC20Token, logo: string) => {
    importToken({ token, logo })
    setCurrentStep(Steps.IMPORT_TOKEN)
  }

  return (
    <Modal
      name={Modals.TOKEN_MODAL}
      bodyClassNames="mt-[68px] lg:mt-[80px] mb-6 rounded-3xl !lg:w-[434px] pt-[30px] !px-0 !pb-0"
    >
      <div className="flex items-center justify-between mb-[21px] px-6">
        <button
          type="button"
          onClick={() =>
            currentStep === Steps.DEFAULT
              ? hideModal()
              : setCurrentStep(Steps.DEFAULT)
          }
        >
          <ArrowLeft />
        </button>
        <h3 className="text-xl text-black font-medium">
          {currentStep === Steps.DEFAULT && "Select a token"}
          {currentStep === Steps.IMPORT_TOKEN && "Import Tokens"}
          {currentStep === Steps.CUSTOM_TOKENS && "Custom Tokens"}
        </h3>
        {currentStep !== Steps.IMPORT_TOKEN ? (
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
            onClick={() => setCurrentStep(Steps.DEFAULT)}
            className="border-none outline-none"
          >
            <Exit className="h-3 w-3 path-primary fill-[#929AA5]" />
          </button>
        )}
      </div>
      {currentStep === Steps.DEFAULT && (
        <SelectToken
          {...{
            setCurrentStep,
            startImportingToken,
          }}
        />
      )}
      {currentStep === Steps.IMPORT_TOKEN && importingToken.token && (
        <TokenImport token={importingToken.token} logo={importingToken.logo} />
      )}
      {currentStep === Steps.CUSTOM_TOKENS && <CustomTokens />}
    </Modal>
  )
}
