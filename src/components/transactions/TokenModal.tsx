import React, { useState } from "react"
import { ReactComponent as ArrowLeft } from "../../assets/icons/arrow-left.svg"
import { ReactComponent as Exit } from "../../assets/icons/exit.svg"
import { doNothing } from "../../utils/functions"
import TokenImport from "./TokenImport"
import CustomTokens from "./CustomTokens"
import SelectToken from "./SelectToken"
import { Modal } from "../general"

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
  const [currentStep, setCurrentStep] = useState<string>(steps.DEFAULT)
  const [address, setAddress] = useState<string>("")

  return (
    <Modal visible={visible} onCloseCallback={() => setAddress("")}>
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
      </div>
    </Modal>
  )
}
