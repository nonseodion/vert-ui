import React, { useState } from "react"
import { SingleValue } from "react-select"
import { FilterOptionOption } from "react-select/dist/declarations/src/filters"
import { ReactComponent as Exit } from "../../assets/icons/exit.svg"
import { BankAccountDetails, banks } from "../../dummy/currencies"
import { Modal, Button } from "../general"
import { Input } from "../inputs"
import Select, { OptionType } from "../inputs/Select"

interface AddBankAccountModalProps {
  adding: boolean
  onClose: () => void
  onConfirm: (_bank_info: BankAccountDetails) => void
}

export default function AddBankAccountModal({
  adding,
  onConfirm,
  onClose,
}: AddBankAccountModalProps) {
  const [bankInfo, setBankInfo] = useState<BankAccountDetails>({
    bank_name: "",
    account_name: "",
    account_number: "",
  })

  const onChange = (
    key: "bank_name" | "account_name" | "account_number",
    value: string
  ) => {
    setBankInfo({ ...bankInfo, [key]: value })
  }

  const reset = () => {
    setBankInfo({ bank_name: "", account_name: "", account_number: "" })
  }

  const onBankChange = (bank: SingleValue<OptionType> | unknown | any) => {
    onChange("bank_name", bank?.value ?? "")
  }

  const filterOption = (
    option: FilterOptionOption<OptionType> | any,
    inputValue: string
  ) =>
    option.label.toLowerCase().includes(inputValue.toLowerCase()) ||
    option?.data?.aliases?.includes(inputValue.toLowerCase())

  return (
    <Modal
      name="bank_account"
      onClose={reset}
      bodyClassNames="!mt-[22vh] !mb-[10vh] !lg:w-[508px] !rounded-3xl !pb-[30px] !px-[30px]"
    >
      <>
        <button
          type="button"
          onClick={() => onClose()}
          className="absolute top-4 right-4 lg:top-[32.57px] lg:right-[32.57px]"
        >
          <Exit />
        </button>
        <h3 className="text-black text-[25px] font-semibold mb-[40px]">
          Personal Bank Account
        </h3>
        <form className="flex flex-col space-y-[30px]">
          <div className="flex flex-col space-y-[10px]">
            <Select
              filterOption={filterOption}
              label="Bank name"
              options={banks}
              onChange={onBankChange}
            />
            <div />
            <Input
              outerClassName="!rounded-xl h-[52px]"
              name="account-number"
              label="Bank account number"
              value={bankInfo.account_number}
              onChange={(e) =>
                onChange("account_number", (e.target as HTMLInputElement).value)
              }
            />
            <Input
              outerClassName="!rounded-xl h-[52px]"
              name="account-name"
              value={bankInfo.account_name}
              label="Name of account"
              disabled
            />
            <div className="pt-[10px]">
              <Button
                fullWidth
                text="Add"
                loading={adding}
                onClick={() => onConfirm(bankInfo)}
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
