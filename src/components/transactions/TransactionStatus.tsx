import React from "react"
import clsx from "classnames"
import { ReactComponent as Pending } from "../../assets/icons/pending.svg"
import { ReactComponent as Success } from "../../assets/icons/success.svg"
import { ReactComponent as Failed } from "../../assets/icons/failed.svg"

interface TransactionStatusProps {
  status: "pending" | "success" | "failed"
}

export default function TransactionStatus({ status }: TransactionStatusProps) {
  const isPending = status === "pending"
  const isSuccessful = status === "success"
  const isFailed = status === "failed"
  return (
    <div
      className={clsx(
        "h-[25px] flex items-center justify-center border space-x-[4.38px] rounded-[6px] py-[7px] px-[8.5px]",
        {
          "bg-[#F8C505]/[.1] border-[#F8C505]/[.1]": isPending,
          "bg-[#00A186]/[.1] border-[#00A186]/[.25]": isSuccessful,
          "bg-[#DF3B30]/[.1] border-[#DF3B30]/[.1]": isFailed,
        }
      )}
    >
      {isPending && <Pending />}
      {isSuccessful && <Success />}
      {isFailed && <Failed />}
      <span
        className={clsx(
          "text-[10.87px] font-medium capitalize whitespace-nowrap",
          {
            "text-[#F8C505]": isPending,
            "text-[#00A186]": isSuccessful,
            "text-[#DF3B30]": isFailed,
          }
        )}
      >
        {status}
      </span>
    </div>
  )
}
