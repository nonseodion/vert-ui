import React from "react"
import Skeleton from "react-loading-skeleton"

export default function TableRowItemSkeleton() {
  return (
    <Skeleton
      baseColor="#F9FAFB"
      highlightColor="#E5E7EB"
      className="!w-[81px] h-10 rounded-lg"
    />
  )
}
