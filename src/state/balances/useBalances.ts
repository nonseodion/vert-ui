import { useEffect, useMemo } from "react"
import { useBalance, useBlockNumber } from "wagmi"
import { Currency, CurrencyAmount, Native } from "@pancakeswap/sdk"
import { Interface } from "ethers/lib/utils"
import { useAtomValue, useSetAtom } from "jotai"
import { balancesAtom, setBalancesAtom } from "./atoms"
import { activeChainId } from "../../utils/config"
import { useMultipleContractSingleData } from "../../utils/multicall"
import Erc20Abi from "../../utils/abis/contracts/ERC20Token.json"
import { NULL_ADDRESS } from "../../utils/constants"

const Erc20Interface = new Interface(Erc20Abi)

export type Balance = {
  amount: CurrencyAmount<Currency> | undefined
  loading: boolean
}

export const useBalances = (
  tokens: Currency[],
  userAddress: string | undefined
): Balance[] => {
  const addresses: string[] = useMemo(
    () =>
      tokens.map((token) => {
        if (token.isNative) return NULL_ADDRESS
        return token.address
      }),
    [tokens]
  )

  const { data: nativeBalance } = useBalance({
    address: userAddress as `0x{string}`,
  })

  const balances = useAtomValue(balancesAtom)
  const setBalances = useSetAtom(setBalancesAtom)
  const balancesMap: Balance[] = useMemo(
    () =>
      addresses.map((address) => ({
        amount: balances[address] ?? undefined,
        loading: !balances[address],
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
    const amountMap: { [key: string]: CurrencyAmount<Currency> } = {}
    if (nativeBalance)
      amountMap[NULL_ADDRESS] = CurrencyAmount.fromRawAmount(
        Native.onChain(activeChainId),
        nativeBalance.value.toString()
      )

    results.forEach(({ result, loading }, i) => {
      if (loading) return
      amountMap[unavailable[i]] = CurrencyAmount.fromRawAmount(
        tokens[i],
        result?.[0] ?? 0
      )
    })

    if (Object.keys(amountMap).length > 0) setBalances(amountMap)
  }, [results, tokens, unavailable, setBalances, nativeBalance])

  return balancesMap
}
