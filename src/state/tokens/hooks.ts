import { ERC20Token } from "@pancakeswap/sdk"
import { useEffect, useMemo } from "react"
import { useAtom } from "jotai"
import { groupBy, uniqBy } from "lodash"
import { activeChainId } from "../../utils/config"
import {
  TokenList,
  defaultTokensAtom,
  defaultTokensStateAtom,
  otherTokensAtom,
  otherTokensStateAtom,
} from "./atoms"
import { defaultTokenInfo as initialTokenInfo } from "../../utils/constants/tokens"
import { LOADSTATE, TokenInfo } from "../../utils/types"
import {
  TokenResponse,
  DEFAULT_TOKEN_LIST_URLS,
  OTHER_TOKEN_LIST_URLS,
} from "../../utils/constants/tokens/urls"
import { fetch } from "../../utils/api"
import { isAddress } from "../../utils"
import { LocalStorage, ONE_DAY_IN_MILLISECONDS } from "../../utils/constants"

interface UseTokensReturnType {
  tokens: ERC20Token[]
  otherTokens: ERC20Token[]
  logoURIs: string[]
  otherLogoURIs: string[]
}

type LocalTokenInfo = {
  [key: string]: { tokenInfo: TokenInfo[]; timestamp: number }
}

// get all tokens from urls
const fetchTokenInfo = async (urls: string[]): Promise<TokenInfo[]> => {
  const calls: (Promise<TokenResponse | null> | TokenResponse)[] = []
  const localTokenInfo: LocalTokenInfo = JSON.parse(
    localStorage.getItem(LocalStorage.TOKEN_INFO) || "{}"
  )
  const timestamp1 = Date.now()

  urls.forEach((url) => {
    const { tokenInfo, timestamp } = localTokenInfo[url] ?? {}
    calls.push(
      tokenInfo && timestamp + ONE_DAY_IN_MILLISECONDS >= timestamp1
        ? ({ tokens: tokenInfo } as TokenResponse)
        : fetch<TokenResponse>(url)
    )
  })
  const results = (await Promise.all(calls)).filter(
    (result) => result !== null
  ) as TokenResponse[]
  let tokenInfo: TokenInfo[] = []

  results.forEach((result, i) => {
    const { timestamp } = localTokenInfo[urls[i]] ?? { timestamp: 0 }
    const timestamp2 = Date.now()
    // timestamp1 & timestamp2 are used to handle time change between the two comparisons
    if (
      timestamp + ONE_DAY_IN_MILLISECONDS + timestamp2 - timestamp1 <=
      timestamp2
    ) {
      localTokenInfo[urls[i]] = {
        tokenInfo: result.tokens,
        timestamp: Date.now(),
      }
    }

    tokenInfo = [...tokenInfo, ...result.tokens]
  })

  localStorage.setItem(LocalStorage.TOKEN_INFO, JSON.stringify(localTokenInfo))
  return tokenInfo
}

const tokenListToTokens = (infoList: TokenInfo[]): [ERC20Token[], string[]] => {
  const URIs: string[] = []
  const tokens = infoList.map((tokenInfo) => {
    const { chainId, symbol, address, logoURI, name, decimals } = tokenInfo
    URIs.push(logoURI || "")
    return new ERC20Token(chainId, address, decimals, symbol, name)
  })

  return [tokens, URIs]
}

const useTokens = (): UseTokensReturnType => {
  const [defaultTokens, setDefaultTokens] = useAtom(defaultTokensAtom)
  const [defaultTokensState, setDefaultTokensState] = useAtom(
    defaultTokensStateAtom
  )

  const [otherTokens, setOtherTokens] = useAtom(otherTokensAtom)
  const [otherTokensState, setOtherTokensState] = useAtom(otherTokensStateAtom)

  // fetch all tokens and merge with default list
  useEffect(() => {
    ;(async () => {
      if (
        defaultTokensState === LOADSTATE.LOADED ||
        defaultTokensState === LOADSTATE.LOADING
      )
        return
      setDefaultTokensState(LOADSTATE.LOADING)

      let allTokenInfo = [
        ...initialTokenInfo,
        ...(await fetchTokenInfo(DEFAULT_TOKEN_LIST_URLS)),
      ]
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
      setDefaultTokens(tokenList)

      setDefaultTokensState(LOADSTATE.LOADED)
    })()
  }, [
    defaultTokens,
    setDefaultTokens,
    defaultTokensState,
    setDefaultTokensState,
  ])

  // fetch other tokens and filter with default
  useEffect(() => {
    ;(async () => {
      if (
        otherTokensState === LOADSTATE.LOADED ||
        otherTokensState === LOADSTATE.LOADING ||
        defaultTokensState === LOADSTATE.LOADING ||
        defaultTokensState === LOADSTATE.UNLOADED
      )
        return
      setOtherTokensState(LOADSTATE.LOADING)

      let allTokenInfo = [...(await fetchTokenInfo(OTHER_TOKEN_LIST_URLS))]
      allTokenInfo = uniqBy(
        allTokenInfo,
        (info) => `${info.chainId}-${info.address}`
      )

      allTokenInfo = allTokenInfo
        .map((tokenInfo) => ({
          ...tokenInfo,
          address: isAddress(tokenInfo.address),
        }))
        // filters with defaultTokens list
        .filter((tokenInfo) => {
          if (!tokenInfo.address) {
            return false
          }
          const present = defaultTokens[tokenInfo.chainId]
            .map((tokenInfo2) => tokenInfo2.address.toLowerCase())
            .includes(tokenInfo.address.toLowerCase())

          return !present
        }) as TokenInfo[]

      const tokenList = groupBy(
        allTokenInfo,
        (tokenInfo) => tokenInfo.chainId
      ) as TokenList
      setOtherTokens(tokenList)

      setOtherTokensState(LOADSTATE.LOADED)
    })()
  }, [
    otherTokens,
    defaultTokensState,
    setOtherTokens,
    otherTokensState,
    setOtherTokensState,
    defaultTokens,
  ])

  const [activeTokens, activelogoURIs] = useMemo(
    (): [ERC20Token[], string[]] =>
      tokenListToTokens(defaultTokens[activeChainId]),
    [defaultTokens]
  )

  const [inactiveTokens, inActivelogoURIs] = useMemo(
    (): [ERC20Token[], string[]] =>
      tokenListToTokens(otherTokens[activeChainId]),
    [otherTokens]
  )

  return {
    tokens: activeTokens,
    logoURIs: activelogoURIs,
    otherTokens: inactiveTokens,
    otherLogoURIs: inActivelogoURIs,
  }
}

export default useTokens
