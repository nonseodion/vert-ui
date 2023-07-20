import React, { useCallback, useEffect, useState } from "react"
import { SingleValue } from "react-select"
import { useQuery } from "react-query"
import { FilterOptionOption } from "react-select/dist/declarations/src/filters"
import { ReactComponent as Exit } from "../../assets/icons/exit.svg"
import { useModal } from "../../hooks"
import { Modals } from "../../utils/constants"
import { Modal, Button } from "../general"
import { Input } from "../inputs"
import Select, { OptionType } from "../inputs/Select"
import { BankAccount, getBanks } from "../../services/banks"
import { checkBanks } from "../../utils"

interface AddBankAccountModalProps {
  adding: boolean
  onClose: () => void
  onConfirm: (_bank_info: BankAccount) => void
}

const emptyBankAccount: BankAccount = {
  accountNumber: "",
  bank: { value: "", label: "", code: "", aliases: [] },
}

export default function AddBankAccountModal({
  adding,
  onConfirm,
  onClose,
}: AddBankAccountModalProps) {
  const {
    modalValues: { modalParams },
  } = useModal(Modals.BANK_ACCOUNT)
  const [bankAccount, setBankAccount] = useState<BankAccount>({
    ...emptyBankAccount,
  })

  const { data: banks } = useQuery("banks", getBanks)

  const onChange = (key: keyof BankAccount, value: string) => {
    setBankAccount({ ...bankAccount, [key]: value })
  }

  const reset = useCallback(() => {
    setBankAccount({ ...emptyBankAccount })
  }, [])

  const onBankChange = (bank: SingleValue<OptionType> | unknown | any) => {
    onChange("bank", bank)
  }

  const filterOption = (
    option: FilterOptionOption<OptionType> | any,
    inputValue: string
  ) =>
    option.label.toLowerCase().includes(inputValue.toLowerCase()) ||
    option?.data?.aliases?.find((alias: string) =>
      alias?.toLowerCase().includes(inputValue.toLowerCase())
    )

  useEffect(() => {
    if (modalParams) {
      setBankAccount({
        bank: checkBanks(modalParams?.bank?.value || "", banks || []) || {
          value: "",
          label: "",
          code: "",
          aliases: [],
        },
        accountName: modalParams?.account_name,
        accountNumber: modalParams?.account_number,
      })
    } else {
      setBankAccount({ ...emptyBankAccount })
    }
  }, [banks, modalParams])

  return (
    <Modal
      name={Modals.BANK_ACCOUNT}
      onClose={reset}
      bodyClassNames="!mt-[22vh] !mb-[10vh] md:!w-[508px] w-[400px] !rounded-3xl !pb-[30px] !px-[30px]"
    >
      <>
        <button
          type="button"
          onClick={() => onClose()}
          className="absolute top-4 right-4 lg:top-[32.57px] lg:right-[32.57px]"
        >
          <Exit className="fill-[#929AA5]" />
        </button>
        <h3 className="text-black text-25 font-semibold mb-[40px]">
          {modalParams?.account_name || modalParams?.account_number
            ? "Edit Bank Account"
            : "Personal Bank Account"}
        </h3>
        <form className="flex flex-col space-y-[30px]">
          <div className="flex flex-col space-y-[10px]">
            <Select
              filterOption={filterOption}
              label="Bank name"
              options={banks}
              value={bankAccount.bank}
              onChange={onBankChange}
            />
            <div />
            <Input
              outerClassName="!rounded-xl h-[52px]"
              name="account-number"
              label="Bank account number"
              value={bankAccount.accountNumber}
              onChange={(e) =>
                onChange("accountNumber", (e.target as HTMLInputElement).value)
              }
            />
            <Input
              outerClassName="!rounded-xl h-[52px]"
              name="account-name"
              value={bankAccount.accountName}
              label="Name of account"
              disabled
            />
            <div className="pt-[10px]">
              <Button
                fullWidth
                text={
                  modalParams?.account_name || modalParams?.account_number
                    ? "Edit"
                    : "Add"
                }
                loading={adding}
                onClick={() => onConfirm(bankAccount)}
                showLoadingText={false}
                className="h-[52px]"
              />
            </div>
          </div>
        </form>
      </>
    </Modal>
  )
}
