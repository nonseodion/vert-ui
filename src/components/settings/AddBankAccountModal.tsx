import React, { useState } from "react"
import { SingleValue } from "react-select"
import { ReactComponent as Exit } from "../../assets/icons/exit.svg"
import { BankAccountDetails, banks } from "../../dummy/currencies"
import { Modal, Button } from "../general"
import { ModalProps } from "../general/Modal"
import { Input } from "../inputs"
import Select, { OptionType } from "../inputs/Select"

interface AddBankAccountModalProps extends Omit<ModalProps, "children"> {
  adding: boolean
  onClose: () => void
  onConfirm: (_bank_info: BankAccountDetails) => void
}

export default function AddBankAccountModal({
  visible,
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

  return (
    <Modal visible={visible} onCloseCallback={reset}>
      <div className="pt-[22vh] pb-[10vh] flex justify-center">
        <div className="bg-white w-[508px] rounded-3xl relative pt-[52px] pb-[30px] px-[30px]">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-[32.57px] right-[32.57px]"
          >
            <Exit />
          </button>
          <h3 className="text-black text-[25px] font-semibold mb-[40px]">
            Personal Bank Account
          </h3>
          <form className="flex flex-col space-y-[30px]">
            <div className="flex flex-col space-y-[10px]">
              <Select
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
                  onChange(
                    "account_number",
                    (e.target as HTMLInputElement).value
                  )
                }
              />
              <Input
                outerClassName="!rounded-xl h-[52px]"
                name="account-name"
                value={bankInfo.account_name}
                label="Name of account"
                onChange={(e) =>
                  onChange("account_name", (e.target as HTMLInputElement).value)
                }
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
        </div>
      </div>
    </Modal>
  )
}
