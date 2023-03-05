import React from "react"
import { TableColumn } from "react-data-table-component"
import Skeleton from "react-loading-skeleton"
import { Table } from "../general"
import { Transaction } from "../../dummy/transactions"

function TransactionRowItem() {
  return (
    <Skeleton
      baseColor="#F9FAFB"
      highlightColor="#E5E7EB"
      className="!w-[81px] h-10 rounded-lg"
    />
  )
}

const columns: TableColumn<Transaction>[] = [
  {
    name: "TIME",
    selector: (row) => row.date,
    cell: () => <TransactionRowItem />,
  },
  {
    name: "SOLD",
    cell: () => <TransactionRowItem />,
  },
  {
    name: "RECEIVED",
    cell: () => <TransactionRowItem />,
  },
  {
    name: "BANK DETAILS",
    cell: () => <TransactionRowItem />,
  },
  {
    name: "REFERENCE NO",
    cell: () => <TransactionRowItem />,
  },
  {
    name: "Wallet Address",
    cell: () => <TransactionRowItem />,
  },
  {
    name: "STATUS",
    cell: () => <TransactionRowItem />,
  },
  {
    name: "BLOCKCHAIN TRX",
    minWidth: "200px",
    cell: () => <TransactionRowItem />,
  },
]

export default function TransactionListSkeleton() {
  return <Table columns={columns} data={Array(5).fill(0)} />
}
