import { BankAccount } from "./banks"

function storeLocally(key: string, item: any) {
  localStorage.setItem(key, JSON.stringify(item))
}

function getLocally(key: string) {
  return localStorage.getItem(key)
}

function getBankAccounts() {
  const bankAccounts: BankAccount[] = JSON.parse(getLocally("banks") || "[]")
  return bankAccounts
}

function getBankAccount(bankAccount: BankAccount) {
  const bankAccounts: BankAccount[] = JSON.parse(getLocally("banks") || "[]")
  const found = bankAccounts.find(
    (_bankAccount) =>
      _bankAccount.accountName?.toLowerCase() ===
        bankAccount.accountName?.toLowerCase() &&
      _bankAccount.accountNumber === bankAccount.accountNumber &&
      _bankAccount.bank.code === bankAccount.bank.code
  )

  return found
}

function bankAccountExists(bankAccount: BankAccount): boolean {
  const found = getBankAccount(bankAccount)
  return !!found
}

function addBankAccount(bankAccount: BankAccount) {
  if (bankAccountExists(bankAccount)) {
    throw Error("Bank Account already exists")
  }
  const bankAccounts = getBankAccounts()

  storeLocally("banks", [bankAccount, ...bankAccounts])
}

function removeBankAccount(bankAccount: BankAccount) {
  const bankAccounts = getBankAccounts()
  const newBankAccounts = bankAccounts.filter(
    (_bankAccount) =>
      _bankAccount.accountName?.toLowerCase() !==
        bankAccount.accountName?.toLowerCase() &&
      _bankAccount.accountNumber !== bankAccount.accountNumber &&
      _bankAccount.bank.code !== bankAccount.bank.code
  )

  storeLocally("banks", newBankAccounts)
}

export { bankAccountExists, addBankAccount, getBankAccounts, removeBankAccount }
