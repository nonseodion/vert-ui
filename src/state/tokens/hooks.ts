import { ERC20Token } from "@pancakeswap/sdk"
import { useEffect, useMemo } from "react"
import { useAtom } from "jotai"
import { groupBy, uniqBy } from "lodash"
import { activeChainId } from "../../utils/config"
import { TokenInfo, TokenList, tokensAtom, tokensStateAtom } from "./atoms"
import { defaultTokenInfo } from "../../utils/constants/tokens"
import { LOADSTATE } from "../../utils/types"
import {
  TokenResponse,
  TOKEN_LIST_URLS,
} from "../../utils/constants/tokens/urls"
import { fetch } from "../../utils/api"
import { isAddress } from "../../utils"

interface UseTokensReturnType {
  tokens: ERC20Token[]
  logoURIs: string[]
}

// get all tokens from urls
const fetchTokenInfo = async (): Promise<TokenInfo[]> => {
  const calls: Promise<TokenResponse | null>[] = []
  TOKEN_LIST_URLS.forEach((url) => {
    calls.push(fetch<TokenResponse>(url))
  })
  const results = (await Promise.all(calls)).filter(
    (result) => result !== null
  ) as TokenResponse[]
  let tokenInfo: TokenInfo[] = []
  results.forEach((result) => {
    tokenInfo = [...tokenInfo, ...result.tokens]
  })

  return tokenInfo
}

const useTokens = (): UseTokensReturnType => {
  const [tokens, setTokens] = useAtom(tokensAtom)
  const [tokensState, setTokensState] = useAtom(tokensStateAtom)

  // fetch all tokens and merge with default list
  useEffect(() => {
    ;(async () => {
      if (tokensState === LOADSTATE.LOADED || tokensState === LOADSTATE.LOADING)
        return
      setTokensState(LOADSTATE.LOADING)

      let allTokenInfo = [...defaultTokenInfo, ...(await fetchTokenInfo())]
      allTokenInfo = uniqBy(
        allTokenInfo,
        (info) => `${info.chainId}-${info.address}`
      )

      allTokenInfo = allTokenInfo
        .map((tokenInfo) => ({
          ...tokenInfo,
          address: isAddress(tokenInfo.address),
        }))
        .filter((tokenInfo) => tokenInfo.address) as TokenInfo[]

      const tokenList = groupBy(
        allTokenInfo,
        (tokenInfo) => tokenInfo.chainId
      ) as TokenList
      setTokens(tokenList)

      setTokensState(LOADSTATE.LOADED)
    })()
  }, [tokens, setTokens, tokensState, setTokensState])

  // set default tokens
  useEffect(() => {
    const tokenList = groupBy(
      defaultTokenInfo,
      (tokenInfo) => tokenInfo.chainId
    ) as TokenList
    setTokens(tokenList)
  }, [setTokens, setTokensState])

  const [activeTokens, logoURIs] = useMemo((): [ERC20Token[], string[]] => {
    const URIs: string[] = []
    const tokenObjects = tokens[activeChainId].map((tokenInfo) => {
      const { chainId, symbol, address, logoURI, name, decimals } = tokenInfo
      URIs.push(logoURI || "")
      return new ERC20Token(chainId, address, decimals, symbol, name)
    })

    return [tokenObjects, URIs]
  }, [tokens])

  return {
    tokens: activeTokens,
    logoURIs,
  }
}

export default useTokens
