import React, { useCallback, useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import { ReactComponent as Plus } from "../../assets/icons/plus.svg"
import { Wrapper } from "../../components/general"
import { Navigator } from "../../components/navigation"
import { AddBankAccountModal, SettingsContent } from "../../components/settings"
import { BanksSkeleton } from "../../components/skeletons"
import { BankAccount } from "../../components/transactions"
import { BankAccountDetails } from "../../dummy/currencies"
import { useModal } from "../../hooks"

export default function BankAccounts() {
  const [accounts, setAccounts] = useState<BankAccountDetails[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [adding, setAdding] = useState<boolean>(false)
  const { showModal, hideModal } = useModal()

  const onConfirm = (bank_info: BankAccountDetails) => {
    setAdding(true)
    setTimeout(() => {
      setAdding(false)
      hideModal("BANK_ACCOUNT")
      setAccounts([...accounts, bank_info])
      toast("Bank account information added successfully.")
    }, 3000)
  }

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 3000)
  }, [])

  const onBankAccountModalClose = useCallback(
    () => hideModal("BANK_ACCOUNT"),
    [hideModal]
  )

  return (
    <Wrapper>
      <AddBankAccountModal
        onConfirm={onConfirm}
        adding={adding}
        onClose={onBankAccountModalClose}
      />
      <div className="px-4 pt-5 lg:pt-[60px] lg:px-[80px] flex flex-col space-y-[50px] lg:flex-row lg:space-y-20 lg:space-x-[77px]">
        <Navigator />
        <SettingsContent title="Saved Bank details">
          <div className="flex justify-between">
            <button
              className="ml-auto flex items-center px-[13px] py-[14px] rounded-lg bg-primary/[.1] space-x-[7.7px]"
              type="button"
              onClick={() => showModal({ modal: "BANK_ACCOUNT" })}
            >
              <Plus className="fill-white" />
              <span className="text-sm text-white">Add new bank details</span>
            </button>
          </div>
          {loading && (
            <div className="mt-11">
              <BanksSkeleton />
            </div>
          )}
          {accounts.length > 0 && (
            <ul className="mt-[44px] flex flex-col space-y-4">
              {accounts.map((account) => (
                <li key={account.account_number}>
                  <BankAccount
                    bank_name={account.selected_bank.value}
                    account_name={account.account_name}
                    account_number={account.account_number}
                  />
                </li>
              ))}
            </ul>
          )}
        </SettingsContent>
      </div>
    </Wrapper>
  )
}
