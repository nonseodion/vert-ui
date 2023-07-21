import React from "react"
import clsx from "classnames"
import { ReactComponent as Bank } from "../../assets/icons/bank.svg"
import { ReactComponent as Pencil } from "../../assets/icons/pencil.svg"
import { doNothing } from "../../utils/functions"
import { useModal } from "../../hooks"
import { Modals } from "../../utils/constants"
import { BankAccount } from "../../services/banks"

interface BankAccountProps {
  bankAccount: BankAccount
  className?: string
  onClick?: (_: any) => void
}

export default function BankAccountComponent({
  bankAccount,
  className,
  onClick,
}: BankAccountProps) {
  const { accountName, accountNumber, bank } = bankAccount
  const { showModal } = useModal()
  return (
    <div
      role="presentation"
      onClick={onClick}
      className={clsx(
        className,
        "p-[21px] flex justify-between items-center bg-white rounded-lg",
        { "cursor-pointer": onClick }
      )}
    >
      <div className="flex space-x-[10px] items-center">
        <div className="flex items-center flex-shrink-0 justify-center h-[50px] w-[50px] rounded-full bg-primary/[.15]">
          <Bank className="stroke-primary" />
        </div>
        <div className="flex flex-col space-y-[7px]">
          <h3 className="text-[#0F172A] font-medium text-sm">{accountName}</h3>
          <p className="text-lightBlue text-sm font-medium">
            {accountNumber} {bank.value}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-[24.72px] flex-shrink-0 ml-3">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            showModal({
              modal: Modals.BANK_ACCOUNT,
              modalParams: {
                bank,
                accountName,
                accountNumber,
              },
            })
          }}
        >
          <Pencil className="fill-black/[.4]" />
        </button>
        {/* <button type="button">
          <Trash />
        </button> */}
      </div>
    </div>
  )
}

BankAccountComponent.defaultProps = {
  className: "",
  onClick: doNothing,
}
