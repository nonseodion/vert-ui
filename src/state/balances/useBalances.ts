import { useEffect, useMemo } from "react"
import { useBalance, useBlockNumber, useChainId } from "wagmi"
import { Currency, CurrencyAmount, Native } from "@pancakeswap/sdk"
import { Interface } from "ethers/lib/utils"
import { useAtomValue, useSetAtom } from "jotai"
import { balancesAtom, setBalancesAtom } from "./atoms"
import { useMultipleContractSingleData } from "../../utils/multicall"
import Erc20Abi from "../../utils/abis/contracts/ERC20Token.json"
import { NULL_ADDRESS } from "../../utils/constants"
import useWallet from "../auth/useWallet"

const Erc20Interface = new Interface(Erc20Abi)

export type Balance = {
  amount: CurrencyAmount<Currency> | undefined
  loading: boolean
}

export const useBalances = (tokens: Currency[]): Balance[] => {
  const { address } = useWallet()
  const chainId = useChainId()
  const addresses: string[] = useMemo(
    () =>
      tokens.map((token) => {
        if (token.isNative) return NULL_ADDRESS
        return token.address
      }),
    [tokens]
  )

  const { data: nativeBalance } = useBalance({
    address: address as `0x{string}`,
  })

  const balances = useAtomValue(balancesAtom)
  const setBalances = useSetAtom(setBalancesAtom)
  const balancesMap: Balance[] = useMemo(
    () =>
      addresses.map((tokenAddress) => ({
        amount: balances[tokenAddress] ?? undefined,
        loading: !balances[tokenAddress],
      })),
    [addresses, balances]
  )

  const unavailable: string[] = useMemo(
    () =>
      addresses
        .map((tokenAddress) => (balances[tokenAddress] ? false : tokenAddress))
        .filter((tokenAddress) => tokenAddress) as string[],
    [addresses, balances]
  )

  const { data: blockNumber } = useBlockNumber({
    staleTime: Infinity,
  })

  const results = useMultipleContractSingleData(
    chainId,
    blockNumber,
    unavailable,
    Erc20Interface,
    "balanceOf",
    [address]
  )

  useEffect(() => {
    if (results.length === 0 || unavailable.length === 0) {
      return
    }

    const amountMap: { [key: string]: CurrencyAmount<Currency> } = {}
    if (nativeBalance)
      amountMap[NULL_ADDRESS] = CurrencyAmount.fromRawAmount(
        Native.onChain(chainId),
        nativeBalance.value.toString()
      )

    results.forEach(({ result, loading }, i) => {
      if (loading) return
      amountMap[unavailable[i]] = CurrencyAmount.fromRawAmount(
        tokens[i],
        result?.[0] ?? 0
      )
    })

    if (Object.keys(amountMap).length > 0) {
      console.log(
        amountMap["0x14016E85a25aeb13065688cAFB43044C2ef86784".toLowerCase()]
      )
      setBalances(amountMap)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [results, setBalances, nativeBalance, tokens])

  return balancesMap
}
