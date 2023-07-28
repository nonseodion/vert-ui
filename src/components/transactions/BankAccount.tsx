import React from "react"
import clsx from "classnames"
import { ReactComponent as Bank } from "../../assets/icons/bank.svg"
import { ReactComponent as Trash } from "../../assets/icons/trash.svg"
import { doNothing } from "../../utils/functions"
import { BankAccount } from "../../services/banks"

interface BankAccountProps {
  bankAccount: BankAccount
  className?: string
  removeAccount?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  onClick?: (_: any) => void
}

export default function BankAccountComponent({
  bankAccount,
  className,
  removeAccount,
  onClick,
}: BankAccountProps) {
  const { accountName, accountNumber, bank } = bankAccount

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
        <button type="button" onClick={removeAccount}>
          <Trash />
        </button>
      </div>
    </div>
  )
}

BankAccountComponent.defaultProps = {
  className: "",
  onClick: doNothing,
  removeAccount: () => {},
}
