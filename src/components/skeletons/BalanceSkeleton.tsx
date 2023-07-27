import React from "react"
import Skeleton from "react-loading-skeleton"
import clsx from "classnames"

export default function BalanceSkeleton({ className }: { className: string }) {
  return (
    <div className="">
      <Skeleton
        className={clsx("rounded-[5px]", className)}
        baseColor="#F9FAFB"
        highlightColor="#E5E7EB"
      />
    </div>
  )
}
