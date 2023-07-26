import { useMemo } from "react"
import { BigNumber } from "ethers"
import { Fraction, JSBI, Rounding, TradeType } from "@pancakeswap/sdk"
import {
  useChainId,
  usePrepareContractWrite,
  useContractWrite,
  useFeeData,
} from "wagmi"
import getContracts, { getAddress } from "../../utils/getContracts"
import vertRouterABI from "../../utils/abis/contracts/VertRouter.json"
import useExchange from "../../state/exchange/useExchange"

function useSwap() {
  const chainId = useChainId()
  const { vertRouter } = getContracts(chainId)
  const { sellAmount, trade } = useExchange()
  const receiver = useMemo(() => getAddress("receiver", chainId), [chainId])
  const minStableCoinBuyAmount =
    trade?.tradeType === TradeType.EXACT_INPUT
      ? trade.outputAmount.numerator.toString()
      : new Fraction(trade?.outputAmount.quotient.toString()!)
          .multiply(9900990099) // get back the original buy amount
          .divide(10000000000)
          .toFixed(0, undefined, Rounding.ROUND_UP)

  const { config, data: preparedWriteData } = usePrepareContractWrite({
    address: vertRouter.address as `0x{string}`,
    abi: vertRouterABI,
    functionName:
      sellAmount && sellAmount.currency.isNative ? "sellETH" : "sellToken",
    args:
      sellAmount && sellAmount.currency.isNative
        ? [
            minStableCoinBuyAmount,
            trade?.route.path.map((i) => i.address),
            Math.floor(new Date().getTime() / 1000) + 120,
            receiver,
          ]
        : [
            sellAmount && sellAmount.numerator.toString(),
            minStableCoinBuyAmount,
            trade?.route.path.map((i) => i.address),
            Math.floor(new Date().getTime() / 1000) + 120,
            receiver,
          ],
    overrides: {
      value:
        sellAmount && sellAmount.currency.isNative
          ? BigNumber.from(sellAmount.numerator.toString() || "")
          : 0,
    },
  })

  const { data: feeData } = useFeeData()

  const swapFee = useMemo(() => {
    if (preparedWriteData && feeData?.gasPrice)
      return JSBI.BigInt(
        feeData.gasPrice.mul(preparedWriteData.request.gasLimit).toString()
      )
    return undefined
  }, [feeData?.gasPrice, preparedWriteData])

  const {
    write,
    error,
    isLoading,
    isSuccess,
    data: tx,
  } = useContractWrite({
    ...config,
    onSettled() {
      // allow modal show up again after tx is successful
      // shownApproveTxModal.current = false
    },
  })

  return {
    swap: write,
    swapping: isLoading,
    swapError: error,
    swapSuccessful: isSuccess,
    swapFee,
    tx,
  }
}

export default useSwap
