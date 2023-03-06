import { CurrencyAmount, ERC20Token } from "@pancakeswap/sdk"
import { Interface } from "ethers/lib/utils"
import { useEffect, useMemo } from "react"
import { useAtomValue, useSetAtom } from "jotai"
import { balancesAtom, setBalancesAtom } from "./atoms"
import { useMultipleContractSingleData } from "../../utils/multicall"
import { blockNumberAtom } from "../blockAtoms"
import { activeChainId } from "../../utils/config"
import Erc20Abi from "../../utils/abis/contracts/ERC20Token.json"

const Erc20Interface = new Interface(Erc20Abi)

type Balances = {
  amount: CurrencyAmount<ERC20Token> | null
  loading: boolean
}[]

export const useBalances = (tokens: ERC20Token[]): Balances => {
  const addresses: string[] = useMemo(
    () => tokens.map((token) => (token as ERC20Token).address),
    [tokens]
  )

  const balances = useAtomValue(balancesAtom)
  const setBalances = useSetAtom(setBalancesAtom)
  const balancesMap: Balances = useMemo(
    () =>
      addresses.map((address) => ({
        amount: balances[address] ?? null,
        loading: !!balances[address],
      })),
    [addresses, balances]
  )

  const unavailable: string[] = useMemo(
    () =>
      addresses
        .map((address) => (balances[address] ? address : false))
        .filter((address) => address) as string[],
    [addresses, balances]
  )

  const blockNumber = useAtomValue(blockNumberAtom)
  const results = useMultipleContractSingleData(
    activeChainId,
    blockNumber,
    unavailable,
    Erc20Interface,
    "balance"
  )

  useEffect(() => {
    if (results.length === 0 || unavailable.length === 0) {
      return
    }
    const amountMap: { [key: string]: CurrencyAmount<ERC20Token> } = {}

    results.forEach(({ result }, i) => {
      amountMap[unavailable[i]] = CurrencyAmount.fromRawAmount(
        tokens[i],
        result?.[0] ?? 0
      )
    })

    setBalances(amountMap)
  }, [results, setBalances, tokens, unavailable])

  return balancesMap
}
