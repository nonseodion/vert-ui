import { useEffect, useMemo } from "react"
import { useBlockNumber } from "wagmi"
import { CurrencyAmount, ERC20Token } from "@pancakeswap/sdk"
import { Interface } from "ethers/lib/utils"
import { useAtomValue, useSetAtom } from "jotai"
import { balancesAtom, setBalancesAtom } from "./atoms"
import { activeChainId } from "../../utils/config"
import { useMultipleContractSingleData } from "../../utils/multicall"
import Erc20Abi from "../../utils/abis/contracts/ERC20Token.json"

const Erc20Interface = new Interface(Erc20Abi)

export type Balance = {
  amount: CurrencyAmount<ERC20Token> | undefined
  loading: boolean
}

export const useBalances = (
  tokens: ERC20Token[],
  userAddress: string | undefined
): Balance[] => {
  const addresses: string[] = useMemo(
    () => tokens.map((token) => (token as ERC20Token).address),
    [tokens]
  )

  const balances = useAtomValue(balancesAtom)
  const setBalances = useSetAtom(setBalancesAtom)
  const balancesMap: Balance[] = useMemo(
    () =>
      addresses.map((address) => ({
        amount: balances[address] ?? undefined,
        loading: !!balances[address],
      })),
    [addresses, balances]
  )

  const unavailable: string[] = useMemo(
    () =>
      addresses
        .map((address) => (balances[address] ? false : address))
        .filter((address) => address) as string[],
    [addresses, balances]
  )

  const { data: blockNumber } = useBlockNumber({
    staleTime: Infinity,
  })

  const results = useMultipleContractSingleData(
    activeChainId,
    blockNumber,
    unavailable,
    Erc20Interface,
    "balanceOf",
    [userAddress]
  )

  useEffect(() => {
    if (results.length === 0 || unavailable.length === 0) {
      return
    }
    const amountMap: { [key: string]: CurrencyAmount<ERC20Token> } = {}

    results.forEach(({ result, loading }, i) => {
      if (loading) return
      amountMap[unavailable[i]] = CurrencyAmount.fromRawAmount(
        tokens[i],
        result?.[0] ?? 0
      )
    })

    if (Object.keys(amountMap).length > 0) setBalances(amountMap)
  }, [results, tokens, unavailable, setBalances])

  return balancesMap
}
