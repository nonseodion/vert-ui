import React, { useEffect, useMemo, useState } from "react"
import { TableColumn } from "react-data-table-component/dist/src/DataTable/types"
import { useLocation, useNavigate } from "react-router-dom"
import { ReactComponent as ArrowLeft } from "../../assets/icons/arrow-left.svg"
import { ReactComponent as Calendar } from "../../assets/icons/calendar.svg"
import { ReactComponent as Filter } from "../../assets/icons/filter.svg"
import { ReactComponent as Cash } from "../../assets/icons/cash.svg"
import { ReactComponent as LinkIcon } from "../../assets/icons/link.svg"
import { ReactComponent as ArrowRight } from "../../assets/icons/arrow-right.svg"
import { Wrapper, Table, Copy } from "../../components/general"
import transactions, { Transaction } from "../../dummy/transactions"
import { PageRoutes, TABLE_ROW_SIZE } from "../../utils/constants"
import Paginator from "../../components/general/Paginator"
import { goBackConditionally } from "../../utils/functions"
import { TransactionStatus } from "../../components/transactions"

const columns: TableColumn<Transaction>[] = [
  {
    name: "TIME",
    selector: (row) => row.date,
    wrap: true,
  },
  {
    name: "SOLD",
    selector: (row) => row.amount_sold,
  },
  {
    name: "RECEIVED",
    selector: (row) => row.amount_received,
  },
  {
    name: "BANK DETAILS",
    cell: ({ bank_details }) => (
      <div className="py-[15px]">
        <p>
          {bank_details.name} {bank_details.account_number} {bank_details.bank}
        </p>
      </div>
    ),
    wrap: true,
  },
  {
    name: "REFERENCE NO",
    selector: (row) => row.reference_no,
    cell: ({ reference_no }) => (
      <div className="flex space-x-2 items-center">
        <p className="text-12 text-black/[.7] font-medium">{reference_no}</p>
        <Copy className="flex-shrink-0" color="purple" text={reference_no} />
      </div>
    ),
  },
  {
    name: "Wallet Address",
    cell: ({ wallet_address }) => (
      <div className="flex space-x-2 items-center">
        <p className="text-12 text-black/[.7] font-medium">{wallet_address}</p>
        <Copy className="flex-shrink-0" color="purple" text={wallet_address} />
      </div>
    ),
  },
  {
    name: "STATUS",
    cell: ({ status }) => <TransactionStatus status={status} />,
  },
  {
    name: "BLOCKCHAIN TRX",
    minWidth: "200px",
    selector: (row) => row.blockchain_txn,
    wrap: false,
    cell: (row) => (
      <button type="button" className="flex items-center space-x-1 w-full">
        <span className="whitespace-nowrap underline text-13 font-medium text-primary">
          {row.blockchain_txn}
        </span>
        <LinkIcon className="path-primary" />
      </button>
    ),
  },
]

export default function TransactionList() {
  const navigate = useNavigate()
  const location = useLocation()
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const displayedData = useMemo(
    () =>
      transactions.slice(TABLE_ROW_SIZE * (page - 1), TABLE_ROW_SIZE * page),
    [page]
  )

  const onTransactionClick = (transaction: Transaction) => {
    navigate(`/transactions/${transaction.id}`)
  }

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 3000)
  }, [])

  return (
    <Wrapper>
      <div className="py-[23px] px-4 lg:py-[56px] lg:px-[87px]">
        <div className="flex items-center space-x-[27px]">
          <button
            type="button"
            onClick={() =>
              goBackConditionally(navigate, location, PageRoutes.HOME)
            }
          >
            <ArrowLeft className="path-white" />
          </button>
          <h3 className="font-bold text-white text-xl lg:text-[30px]">
            Transaction History
          </h3>
        </div>
        <div className="lg:mt-[40px] mt-6 py-[19px] lg:py-[25px] px-[15px] lg:px-[30px] bg-[#494949] rounded-[12px] shadowed">
          <h4 className="text-white font-bold text-base mb-[15px] lg:hidden">
            All transactions
          </h4>
          <div className="flex justify-between items-center">
            <h3 className="hidden lg:block font-bold text-xl text-white">
              All transactions
            </h3>
            <div className="ml-auto flex space-x-3">
              <button
                type="button"
                className="px-[10px] border border-lightBlue rounded-lg flex items-center space-x-4 h-10"
              >
                <span className="text-13 font-medium text-lightBlue">
                  Start date
                </span>
                <Calendar />
              </button>
              <button
                type="button"
                className="px-[10px] border border-lightBlue rounded-lg flex items-center space-x-4 h-10"
              >
                <span className="text-13 font-medium text-lightBlue">
                  End date
                </span>
                <Calendar />
              </button>
              <button
                type="button"
                className="px-[14.4px] h-10 rounded-lg flex items-center space-x-4 bg-primary"
              >
                <Filter />
                <span className="text-[16.8px] font-medium text-white">
                  Filter
                </span>
              </button>
            </div>
          </div>
          <div className="mt-[30px]">
            <div className="hidden md:block">
              <Table
                columns={columns}
                className="transactions-list"
                data={displayedData}
                onRowClicked={onTransactionClick}
                loading={loading}
              />
            </div>
            <div className="md:hidden">
              <ul className="flex flex-col space-y-[3px]">
                {displayedData.map((row) => (
                  <li
                    key={row.id}
                    role="presentation"
                    onClick={() => onTransactionClick(row)}
                    className="flex justify-between items-center h-[95px] px-[10px] rounded-lg bg-[#F3FFF1]"
                  >
                    <div className="flex items-center space-x-[14px]">
                      <Cash />
                      <div className="flex flex-col space-y-[11px]">
                        <h3 className="text-13 md:text-[15px] uppercase font-semibold text-black">
                          {`sold ${row.amount_sold} for ${row.amount_received}`}
                        </h3>
                        <p className="text13 md:text-[15px] text-[#707A8A]">
                          {row.bank_details.account_number}{" "}
                          {row.bank_details.bank}
                          <span className="text-black text-[10px] md:text-13">
                            {" "}
                            {row.date}
                          </span>
                        </p>
                      </div>
                    </div>
                    <ArrowRight />
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Paginator
            rowsPerPage={TABLE_ROW_SIZE}
            currentPage={page}
            onChangePage={setPage}
          />
        </div>
      </div>
    </Wrapper>
  )
}
