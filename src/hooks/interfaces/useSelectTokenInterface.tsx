import React, { useCallback, useMemo } from "react"
import { useAtom } from "jotai"
import { ERC20Token } from "@pancakeswap/sdk"
import { activeChainId } from "../../utils/config"
import { pinnedTokens } from "../../utils/constants/exchange"
import PinnedToken from "../../components/transactions/PinnedToken"
import { handleSetExchangeAtomCreator } from "../../state/exchange/atoms"
import useModal from "../useModal"

interface ReturnTypes {
  pinnedTokens: JSX.Element[]
  tokenList: JSX.Element[]
}

const useSelectTokenInterface = (
  tokens: ERC20Token[],
  logos: string[]
): ReturnTypes => {
  const [, setSellToken] = useAtom(
    useMemo(
      () =>
        handleSetExchangeAtomCreator<
          "sellToken",
          { token: ERC20Token; logo: string }
        >(),
      []
    )
  )
  const { hideModal } = useModal("token_modal")

  const handleSelectToken = useCallback(
    (token: ERC20Token, logo: string) => {
      setSellToken({ key: "sellToken", value: { token, logo } })
      hideModal()
    },
    [hideModal, setSellToken]
  )

  const pinnedTokensList = useMemo(
    () =>
      pinnedTokens[activeChainId].map(([token, logo]) => (
        <PinnedToken
          onClick={() => handleSelectToken(token, logo)}
          key={token.address}
          name={token.symbol}
          icon={logo}
          className="mb-1 mr-[6px] cursor-pointer"
        />
      )),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const tokenList = useMemo(
    () => {
      console.log(" loading tokens")
      return tokens.map((token, index) => (
        <li key={token.address}>
          <button
            onClick={() => handleSelectToken(token, logos[index])}
            type="button"
            className="w-full text-left flex space-x-4 items-center mb-8"
          >
            <img
              src={logos[index]}
              alt={token.name}
              className="h-10 w-10 rounded-[20px]"
            />
            <div className="flex flex-col space-y-[3.5px]">
              <h4 className="font-medium text-base text-black">{token.name}</h4>
              <span className="text-[13px] text-lightBlue">{token.symbol}</span>
            </div>
          </button>
        </li>
      ))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tokens, logos]
  )

  return {
    pinnedTokens: pinnedTokensList,
    tokenList,
  }
}

export default useSelectTokenInterface
