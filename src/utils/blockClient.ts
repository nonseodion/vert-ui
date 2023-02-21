import { Contract } from "ethers"
import { readContract } from "@wagmi/core"
// import { Abi, Narrow } from 'abitype';

// interface BlockClient {
//   call: (m) => Promise<any>,
//   // multicall: () => Promise<void>
// }

interface Call<T extends Contract, K extends string> {
  contract: T
  abi: any
  functionName: K
  functionArgs: Parameters<T[K]>
}

export const call = async <T extends Contract, K extends string>(
  args: Call<T, K>
): Promise<ReturnType<T[K]>> => {
  const { contract, abi, functionArgs, functionName } = args
  const data = (await readContract({
    address: contract.address as `0x${string}`,
    functionName,
    abi,
    args: functionArgs,
    chainId: 97,
  })) as ReturnType<T[K]>

  return data
}

export const multicall = () => {}
