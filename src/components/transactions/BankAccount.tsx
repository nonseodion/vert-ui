import React from "react"
import clsx from "classnames"
import { ReactComponent as Bank } from "../../assets/icons/bank.svg"
import { ReactComponent as Pencil } from "../../assets/icons/pencil.svg"
import { ReactComponent as Trash } from "../../assets/icons/trash.svg"
import { doNothing } from "../../utils/functions"

interface BankAccountProps {
  bank_name: string
  account_name: string
  account_number: string
  className?: string
  onClick?: (_: any) => void
}

export default function BankAccount({
  account_name,
  account_number,
  bank_name,
  className,
  onClick,
}: BankAccountProps) {
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
          <h3 className="text-[#0F172A] font-medium text-sm">{account_name}</h3>
          <p className="text-lightBlue text-sm font-medium">
            {account_number} {bank_name}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-[24.72px] flex-shrink-0 ml-3">
        <button type="button">
          <Pencil className="fill-black/[.4]" />
        </button>
        <button type="button">
          <Trash />
        </button>
      </div>
    </div>
  )
}

BankAccount.defaultProps = {
  className: "",
  onClick: doNothing,
}
