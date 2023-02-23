import { Contract } from "ethers"
import { readContract, multicall as readContracts } from "@wagmi/core"
// import { Abi, Narrow } from 'abitype';

// interface BlockClient {
//   call: (m) => Promise<any>,
//   // multicall: () => Promise<void>
// }

export interface Call<T extends Contract, K extends string> {
  contract: T
  abi: any
  functionName: K
  functionArgs?: Parameters<T[K]>
}

export const call = async <T extends Contract, K extends string>(
  args: Call<T, K>
): Promise<Awaited<ReturnType<T[K]>>> => {
  const { contract, abi, functionArgs, functionName } = args
  const data = (await readContract({
    address: contract.address as `0x${string}`,
    functionName,
    abi,
    args: functionArgs ?? [],
  })) as Awaited<ReturnType<T[K]>>

  return data
}

export interface Multicall<
  T extends Contract[],
  K extends string[],
  I extends number
> {
  callDetails: Call<T[I], K[I]>[]
  allowFailure?: boolean
}

export const multicall = async <
  T extends Contract[],
  K extends string[],
  I extends number
>(
  args: Multicall<T, K, I>
): Promise<Awaited<ReturnType<T[I][K[I]]>>[]> => {
  const { callDetails, allowFailure } = args
  const contracts = callDetails.map((detail) => ({
    address: detail.contract.address as `0x${string}`,
    functionName: detail.functionName,
    args: detail.functionArgs ?? [],
    abi: detail.abi,
  }))

  const data = (await readContracts({
    contracts,
    allowFailure: allowFailure ?? false,
  })) as Awaited<ReturnType<T[I][K[I]]>>[]

  return data
}
