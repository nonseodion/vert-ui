import React from "react"
import Skeleton from "react-loading-skeleton"

export default function WalletListSkeleton() {
  return (
    <div className="flex flex-col space-y-[13px]">
      <Skeleton className="h-[84px] rounded-xl" />
      <Skeleton className="h-[84px] rounded-xl" />
      <Skeleton className="h-[84px] rounded-xl" />
    </div>
  )
}
