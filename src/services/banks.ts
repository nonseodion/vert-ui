import { fetchWithoutHandle } from "../utils/api"

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
