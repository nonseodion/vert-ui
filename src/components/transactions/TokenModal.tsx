import React from "react"
import { ERC20Token } from "@pancakeswap/sdk"
import { ReactComponent as ArrowLeft } from "../../assets/icons/arrow-left.svg"
import { ReactComponent as Exit } from "../../assets/icons/exit.svg"
import { doNothing } from "../../utils/functions"
import TokenImport from "./TokenImport"
import CustomTokens from "./CustomTokens"
import SelectToken from "./SelectToken"
import { Modal } from "../general"
import useModal from "../../hooks/useModal"
import useTokens from "../../state/tokens/hooks"
import useTokenModalInterface, {
  Steps,
} from "../../hooks/interfaces/useTokenModalInterface"
import { Modals } from "../../utils/constants"

export default function TokenModal() {
  const { hideModal } = useModal(Modals.TOKEN_MODAL)
  const { tokens, logoURIs, otherLogoURIs, otherTokens } = useTokens()
  const {
    pinnedTokens,
    tokenList,
    setSearchQuery,
    searchQuery,
    currentStep,
    setCurrentStep,
    resolvedToken,
    resolvedTokenElement,
    selectedInactiveToken,
    otherTokenList,
  } = useTokenModalInterface(tokens, logoURIs, otherTokens, otherLogoURIs)

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
            <Exit className="h-3 w-3 path-primary" />
          </button>
        )}
      </div>
      {currentStep === Steps.DEFAULT && (
        <SelectToken
          {...{
            setCurrentStep,
            tokenList,
            otherTokenList,
            pinnedTokens,
            searchQuery,
            setSearchQuery,
            resolvedTokenElement,
          }}
        />
      )}
      {currentStep === Steps.IMPORT_TOKEN &&
        (selectedInactiveToken !== null || resolvedToken !== null) && (
          <TokenImport
            token={
              selectedInactiveToken ||
              ([resolvedToken, ""] as [ERC20Token, string])
            }
          />
        )}
      {currentStep === Steps.CUSTOM_TOKENS && <CustomTokens />}
    </Modal>
  )
}
