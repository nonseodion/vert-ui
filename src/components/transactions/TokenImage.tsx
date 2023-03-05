import React, { useEffect, useMemo, useState } from "react"
import { ChainId, ERC20Token } from "@pancakeswap/sdk"
import { checkIfImageExists, isAddress } from "../../utils"

const mapping = {
  [ChainId.BSC]: "smartchain",
  [ChainId.ETHEREUM]: "ethereum",
}

type TokenImageProps = {
  url: string
  token: ERC20Token
  resolved?: boolean
}

export default function TokenImage(props: TokenImageProps) {
  const { url, token, resolved } = props
  const { symbol } = token
  const [isImage, setIsImage] = useState<boolean>(true)
  const newUrl = useMemo(() => {
    const checkSummedAddress = isAddress(token.address)
    return url !== ""
      ? url
      : `https://assets-cdn.trustwallet.com/blockchains/${mapping[56]}/assets/${checkSummedAddress}/logo.png`
  }, [token.address, url])

  useEffect(() => {
    checkIfImageExists(newUrl).then((res: boolean) => {
      setIsImage(res)
    })
  }, [newUrl])

  const component = useMemo(() => {
    let value

    if (isImage) {
      value = (
        <img src={newUrl} alt={symbol} className="h-10 w-10 rounded-[20px]" />
      )
    } else if (resolved) {
      value = (
        <div className="h-10 bg-[#CADAF4] w-10 p-1 rounded-full flex items-center justify-center">
          <span className="text-lightBlue text-base overflow-hidden">
            {symbol.slice(0, 4)}
          </span>
        </div>
      )
    } else {
      value = (
        <div className="h-10 bg-tokenGrey w-10 p-1 rounded-full flex items-center justify-center">
          <span className="text-primary text-base overflow-hidden">
            {symbol.slice(0, 4)}
          </span>
        </div>
      )
    }

    return value
  }, [isImage, newUrl, resolved, symbol])

  return component
}

TokenImage.defaultProps = {
  resolved: false,
}
