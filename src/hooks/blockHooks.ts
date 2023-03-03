import { Contract } from "ethers"
import { useEffect, useState } from "react"
import { Call, Multicall, call, multicall } from "../utils/blockClient"

export const useCall = <T extends Contract, K extends string>(
  args: Call<T, K>
) => {
  const [result, setResult] = useState<ReturnType<T[K]>>()

  useEffect(() => {
    ;(async () => {
      const response = await call<T, K>(args)
      setResult(response)
    })()
  }, [args])

  return result
}

// deprecated multicall from wagmi
export const useMulticall = <
  T extends Contract[],
  K extends string[],
  I extends number
>(
  args: Multicall<T, K, I>
) => {
  const [result, setResult] = useState<Awaited<ReturnType<T[I][K[I]]>>[]>([])
  const { callDetails, allowFailure } = args

  useEffect(() => {
    ;(async () => {
      if (result.length !== 0) setResult([])
      const response = await multicall<T, K, I>({
        ...args,
        allowFailure: false,
      })
      setResult(response)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callDetails, allowFailure])
  return result
}
