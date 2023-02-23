import {
  Currency,
  CurrencyAmount,
  Native,
  Token,
  WNATIVE,
} from "@pancakeswap/sdk"
import { ChainId } from "./config"

export function wrappedCurrency(
  currency: Currency | undefined,
  chainId: ChainId | undefined
): Token | undefined {
  let token: Token | undefined

  if (chainId && currency?.isNative) {
    token = WNATIVE[chainId]
  } else if (currency?.isToken) {
    token = currency
  }

  return token
}

export function wrappedCurrencyAmount(
  currencyAmount: CurrencyAmount<Currency> | undefined,
  chainId: ChainId | undefined
): CurrencyAmount<Token> | undefined {
  const token =
    currencyAmount && chainId
      ? wrappedCurrency(currencyAmount.currency, chainId)
      : undefined
  return token && currencyAmount
    ? CurrencyAmount.fromRawAmount(token, currencyAmount.quotient)
    : undefined
}

export function unwrappedToken(token: Token): Currency {
  if (token.equals(WNATIVE[token.chainId])) return Native.onChain(token.chainId)
  return token
}
