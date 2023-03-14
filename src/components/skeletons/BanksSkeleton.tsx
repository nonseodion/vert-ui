import React from "react"
import Skeleton from "react-loading-skeleton"

export default function BanksSkeleton() {
  return <Skeleton className="h-[53px] rounded-xl" />
}

export function SelectBankListSkeleton() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton
        className="h-[92px] rounded-lg"
        baseColor="#F9FAFB"
        highlightColor="#E5E7EB"
      />
      <Skeleton
        className="h-[92px] rounded-lg"
        baseColor="#F9FAFB"
        highlightColor="#E5E7EB"
      />
    </div>
  )
}
