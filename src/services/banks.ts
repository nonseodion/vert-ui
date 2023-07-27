import { QueryKey } from "react-query"
import { fetchWithoutHandle } from "../utils/api"
import { SupportedNetworks } from "../contexts/FiatTx"

type FetchedBank = {
  name: string
  shortname: string
  code: string
}

export type Bank = {
  label: string
  value: string
  aliases: string[]
  code: string
}

export type BankAccount = {
  bank: Bank
  accountNumber: string
  accountName?: string
}

export async function getBanks(): Promise<Bank[]> {
  const data = await fetchWithoutHandle<FetchedBank[]>(
    `${process.env.REACT_APP_BACKEND_URL}/banks/list`
  )
  const banks: Bank[] = data?.map(({ name, shortname, code }) => ({
    label: name,
    value: name,
    aliases: shortname ? [shortname] : [],
    code,
  }))

  return banks
}

type GetBankAccountNameParams = {
  bankCode: string
  accountNumber: string
}

export async function getBankAccountName(
  params: GetBankAccountNameParams
): Promise<string> {
  const data = await fetchWithoutHandle<{ account_name: string }>(
    `${process.env.REACT_APP_BACKEND_URL}/banks/accountname`,
    { bank_code: params.bankCode, account_number: params.accountNumber }
  )

  return data.account_name
}

export async function getLiquidity(
  network: (typeof SupportedNetworks)[56 | 97]
): Promise<number> {
  const data = await fetchWithoutHandle<{
    amount: number
    formattedAmount: number
  }>(`${process.env.REACT_APP_BACKEND_URL}/banks/liquidity`, { network })

  return data.formattedAmount
}

export function reactQueryWrapper<T, K>(cb: (_: T) => K) {
  return ({ queryKey }: { queryKey: QueryKey }) => {
    const args = queryKey[1] as T
    return cb(args)
  }
}
