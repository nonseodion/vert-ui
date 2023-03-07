import React from "react"
import Skeleton from "react-loading-skeleton"

export default function TokenApprovalsSkeleton() {
  return (
    <div className="flex flex-col space-y-[13px]">
      <div className="overflow-x-hidden h-[71px] flex w-full px-5 items-center justify-between bg-white border-y-[0.25px] border-lightBlue">
        <Skeleton
          baseColor="#F9FAFB"
          highlightColor="#E5E7EB"
          className="!w-[161px] rounded-lg"
        />
        <Skeleton
          baseColor="#F9FAFB"
          highlightColor="#E5E7EB"
          className="!w-[144px] rounded-lg"
        />
        <Skeleton
          baseColor="#F9FAFB"
          highlightColor="#E5E7EB"
          className="!w-[161px] f rounded-lglex justify-end"
        />
      </div>
      <div className="overflow-x-hidden h-[71px] flex w-full px-5 items-center justify-between bg-white border-y-[0.25px] border-lightBlue">
        <Skeleton
          baseColor="#F9FAFB"
          highlightColor="#E5E7EB"
          className="!w-[161px] rounded-lg"
        />
        <Skeleton
          baseColor="#F9FAFB"
          highlightColor="#E5E7EB"
          className="!w-[144px] rounded-lg"
        />
        <Skeleton
          baseColor="#F9FAFB"
          highlightColor="#E5E7EB"
          className="!w-[161px] f rounded-lglex justify-end"
        />
      </div>
      <div className="overflow-x-hidden h-[71px] flex w-full px-5 items-center justify-between bg-white border-y-[0.25px] border-lightBlue">
        <Skeleton
          baseColor="#F9FAFB"
          highlightColor="#E5E7EB"
          className="!w-[161px] rounded-lg"
        />
        <Skeleton
          baseColor="#F9FAFB"
          highlightColor="#E5E7EB"
          className="!w-[144px] rounded-lg"
        />
        <Skeleton
          baseColor="#F9FAFB"
          highlightColor="#E5E7EB"
          className="!w-[161px] f rounded-lglex justify-end"
        />
      </div>
      <div className="overflow-x-hidden h-[71px] flex w-full px-5 items-center justify-between bg-white border-top-[0.25px] border-lightBlue">
        <Skeleton
          baseColor="#F9FAFB"
          highlightColor="#E5E7EB"
          className="!w-[161px] rounded-lg"
        />
        <Skeleton
          baseColor="#F9FAFB"
          highlightColor="#E5E7EB"
          className="!w-[144px] rounded-lg"
        />
        <Skeleton
          baseColor="#F9FAFB"
          highlightColor="#E5E7EB"
          className="!w-[161px] f rounded-lglex justify-end"
        />
      </div>
    </div>
  )
}
