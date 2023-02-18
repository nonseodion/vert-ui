import React, { useState } from "react"
import { ReactComponent as ArrowLeft } from "../../assets/icons/arrow-left.svg"
import { ReactComponent as Exit } from "../../assets/icons/exit.svg"
import { doNothing } from "../../utils/functions"
import TokenImport from "./TokenImport"
import CustomTokens from "./CustomTokens"
import SelectToken from "./SelectToken"
import { Modal } from "../general"
import useModal from "../../hooks/useModal"

const steps = {
  IMPORT_TOKEN: "IMPORT_TOKEN",
  DEFAULT: "DEFAULT",
  CUSTOM_TOKENS: "CUSTOM_TOKENS",
}

export default function TokenModal() {
  const { hideModal } = useModal("token_modal")
  const [currentStep, setCurrentStep] = useState<string>(steps.DEFAULT)
  const [address, setAddress] = useState<string>("")

  return (
    <Modal
      name="token_modal"
      onClose={() => setAddress("")}
      bodyClassNames="mt-[68px] lg:mt-[80px] mb-6 rounded-3xl !lg:w-[434px] pt-[30px] !px-0 !pb-0"
    >
      <div className="flex items-center justify-between mb-[21px] px-6">
        <button
          type="button"
          onClick={() =>
            currentStep === steps.DEFAULT
              ? hideModal()
              : setCurrentStep(steps.DEFAULT)
          }
        >
          <ArrowLeft />
        </button>
        <h3 className="text-xl text-black font-medium">
          {currentStep === steps.DEFAULT && "Select a token"}
          {currentStep === steps.IMPORT_TOKEN && "Import Tokens"}
          {currentStep === steps.CUSTOM_TOKENS && "Custom Tokens"}
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
      {currentStep === steps.DEFAULT && (
        <SelectToken {...{ setAddress, address, steps, setCurrentStep }} />
      )}
      {currentStep === steps.IMPORT_TOKEN && <TokenImport />}
      {currentStep === steps.CUSTOM_TOKENS && <CustomTokens />}
    </Modal>
  )
}
