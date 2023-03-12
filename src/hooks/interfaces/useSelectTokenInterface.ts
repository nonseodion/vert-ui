import { Currency, CurrencyAmount } from "@pancakeswap/sdk"
import { useAtom } from "jotai"
import { useMemo, useState, useCallback, useEffect } from "react"
import useWallet from "../../state/auth/useWallet"
import { Balance, useBalances } from "../../state/balances/useBalances"
import { handleSetExchangeAtomCreator } from "../../state/exchange/atoms"
import { Modals } from "../../utils/constants"
import useModal from "../useModal"
import useTokenPrices from "../useTokenPrices"
import FiatAmount from "../../utils/FiatAmount"
import useTokens from "../../state/tokens/hooks"
import useExchangeSettings from "../../state/exchange/useExchangeSettings"
import { stableCoinAmountToFiat } from "../../utils/swap"

interface UseSelectInterfaceReturnType {
  tokens: Currency[]
  fiatBalances: (FiatAmount | undefined)[]
  tokenBalances: Balance[]
  logos: string[]

  searchQuery: string
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>
  handleSelectToken: (token: Currency, logo: string) => void

  otherTokens: Currency[]
  otherLogos: string[]
}

const useSelectTokenInterface = (): UseSelectInterfaceReturnType => {
  const {
    tokens,
    logoURIs: logos,
    otherLogoURIs: otherLogos,
    otherTokens,
  } = useTokens()
  const [, setSellToken] = useAtom(
    useMemo(
      () =>
        handleSetExchangeAtomCreator<
          "sellToken",
          { token: Currency; logo: string }
        >(),
      []
    )
  )

  const { address } = useWallet()
  const balances: Balance[] = useBalances(tokens, address)
  const currencyAmounts = useMemo(
    () => balances.map((balance) => balance.amount),
    [balances]
  )
  const pricesInStable = useTokenPrices(currencyAmounts)
  const { preferredFiat, dollarRate } = useExchangeSettings()
  const fiatBalances = useMemo(() => {
    const prices = pricesInStable.map((tokenPriceInStable, index) => {
      if (balances[index].amount) {
        const dollarBalance = (
          balances[index].amount as CurrencyAmount<Currency>
        )
          .multiply(tokenPriceInStable || "0")
          .multiply(tokenPriceInStable?.scalar || "0")
        console.log(
          dollarBalance.toExact(),
          tokenPriceInStable?.baseCurrency.symbol
        )
        const amount = stableCoinAmountToFiat(
          dollarBalance,
          dollarRate,
          preferredFiat.token
        )
        return amount
      }
      return undefined
    })
    return prices
  }, [balances, dollarRate, preferredFiat.token, pricesInStable])

  const { hideModal, isActive } = useModal(Modals.TOKEN_MODAL)
  const [searchQuery, setSearchQuery] = useState("")

  const handleSelectToken = useCallback(
    (token: Currency, logo: string) => {
      setSellToken({ key: "sellToken", value: { token, logo } })
      hideModal()
    },
    [hideModal, setSellToken]
  )

  // clear searchQuery when modal closes
  useEffect(() => {
    if (!isActive) {
      setSearchQuery("")
    }
  }, [isActive])

  return {
    tokens,
    tokenBalances: balances,
    fiatBalances,
    logos,

    handleSelectToken,
    searchQuery,
    setSearchQuery,

    otherTokens,
    otherLogos,
  }
}

export default useSelectTokenInterface
