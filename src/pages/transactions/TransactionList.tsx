import moment from "moment"
import React, { useEffect, useMemo, useState } from "react"
import { TableColumn } from "react-data-table-component/dist/src/DataTable/types"
import { useLocation, useNavigate } from "react-router-dom"
import { ReactComponent as ArrowLeft } from "../../assets/icons/arrow-left.svg"
import { ReactComponent as CalendarIcon } from "../../assets/icons/calendar.svg"
import { ReactComponent as Filter } from "../../assets/icons/filter.svg"
import { ReactComponent as Cash } from "../../assets/icons/cash.svg"
import { ReactComponent as ArrowRight } from "../../assets/icons/arrow-right.svg"
import { Wrapper, Table, VertCalendar } from "../../components/general"
import transactions, { Transaction } from "../../dummy/transactions"
import { PageRoutes, TABLE_ROW_SIZE } from "../../utils/constants"
import Paginator from "../../components/general/Paginator"
import { goBackConditionally } from "../../utils/functions"
import { TransactionStatus } from "../../components/transactions"

const columns: TableColumn<Transaction>[] = [
  {
    name: "TIME",
    cell: ({ date }) => (
      <span className="uppercase text-black font-medium text-[12px]">
        {moment(date).format("DD-MMM-YYYY hh:mm:ss")}
      </span>
    ),
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
    name: "STATUS",
    cell: ({ status }) => <TransactionStatus status={status} />,
  },
  {
    name: " ",
    width: "40px",
    cell: () => <ArrowRight />,
  },
]

export default function TransactionList() {
  const navigate = useNavigate()
  const location = useLocation()
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [visibleCalendar, setVisibleCalendar] = useState<
    "start_date" | "end_date" | null
  >(null)
  const [startDate, onStartDateChange] = useState<Date | null>(null)
  const [endDate, onEndDateChange] = useState<Date | null>(null)

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

  const hideCalendar = () => setVisibleCalendar(null)

  return (
    <Wrapper>
      <VertCalendar
        visible={visibleCalendar === "start_date"}
        value={startDate}
        onChange={onStartDateChange}
        onClose={hideCalendar}
      />
      <VertCalendar
        visible={visibleCalendar === "end_date"}
        value={endDate}
        onChange={onEndDateChange}
        onClose={hideCalendar}
      />
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
          <h4 className="text-white font-bold text-base lg:hidden">
            All transactions
          </h4>
          <div className="flex justify-between items-center">
            <h3 className="hidden lg:block font-bold text-xl text-white">
              All transactions
            </h3>
            <div className="ml-auto flex flex-wrap">
              <button
                type="button"
                onClick={() => setVisibleCalendar("start_date")}
                className="px-[10px] mt-[15px] mr-3 border border-lightBlue rounded-lg flex items-center space-x-4 h-10"
              >
                <span className="text-[10px] md:text-13 font-medium text-lightBlue">
                  {startDate?.toLocaleDateString() || "Start Date"}
                </span>
                <CalendarIcon />
              </button>
              <button
                type="button"
                onClick={() => setVisibleCalendar("end_date")}
                className="px-[10px] border mr-3 mt-[15px] border-lightBlue rounded-lg flex items-center space-x-4 h-10"
              >
                <span className="text-[10px] md:text-13 font-medium text-lightBlue">
                  {endDate?.toLocaleDateString() || "End Date"}
                </span>
                <CalendarIcon />
              </button>
              <button
                type="button"
                className="px-[14.4px] mt-[15px] h-10 rounded-lg flex items-center space-x-4 bg-primary"
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
                    className="flex justify-between items-center min-h-[95px] py-[26px] pl-[10px] pr-[18px] rounded-lg bg-[#F3FFF1]"
                  >
                    <div className="flex items-center space-x-[14px]">
                      <Cash />
                      <div className="flex flex-col space-y-[11px]">
                        <h3 className="text-[15px] leading-[17.5px] uppercase font-semibold text-black">
                          {`sold ${row.amount_sold} for ${row.amount_received}`}
                        </h3>
                        <p className="text-[15px] text-[#707A8A] leading-5">
                          {row.bank_details.account_number}{" "}
                          {row.bank_details.bank}{" "}
                          <br className="trans-date-limit:hidden" />
                          <span className="text-[13.13px] leading-[10px] text-black">
                            {moment(row.date).format("MMM DD, YYYY")}
                          </span>
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="flex-shrink-0 ml-2" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Paginator
            rowsPerPage={TABLE_ROW_SIZE}
            currentPage={page}
            onChangePage={setPage}
            dataLength={transactions.length}
          />
        </div>
      </div>
    </Wrapper>
  )
}
