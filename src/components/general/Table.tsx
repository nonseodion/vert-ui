import React from "react"
import DataTable from "react-data-table-component"
import {
  TableProps,
  TableStyles,
} from "react-data-table-component/dist/src/DataTable/types"
import { ReactComponent as Empty } from "../../assets/images/empty.svg"
import { TableRowItemSkeleton } from "../skeletons"

interface CustomTableProps {
  loading?: boolean
}

const customStyles: TableStyles = {
  table: {
    style: {
      backgroundColor: "#494949",
    },
  },
  headCells: {
    style: {
      fontFamily: "Poppins",
      fontWeight: "600",
      color: "#000",
      fontSize: "12px",
    },
  },
  headRow: {
    style: {
      backgroundColor: "#CFFFC7",
      marginBottom: "5px",
    },
  },
  rows: {
    style: {
      height: "71px",
      backgroundColor: "#fff",
      marginBottom: "3px",
      border: "1px solid #72BF65",
      cursor: "pointer",
    },
  },
  cells: {
    style: {
      fontWeight: "500",
      fontFamily: "Poppins",
      fontSize: "12px",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  },
  noData: {
    style: {
      backgroundColor: "#494949",
    },
  },
}

function NoRecords() {
  return (
    <div className="flex py-[126px] flex-col items-center justify-center space-y-[35.34px] lg:space-y-[54px]">
      <p className="text-center text-lightBlue text-[22px] lg:text-[32px]">
        Nothing to see here
      </p>
      <Empty className="h-[188px] w-[187px]" />
    </div>
  )
}

function LoadingCell() {
  return <TableRowItemSkeleton />
}

export default function Table<T>({
  data,
  columns,
  loading,
  ...rest
}: TableProps<T> & CustomTableProps) {
  const getColumns = () => {
    if (loading) {
      return columns.map((col) => ({ ...col, cell: LoadingCell }))
    }
    return columns
  }

  return (
    <DataTable
      columns={getColumns()}
      data={loading ? Array(5).fill(0) : data}
      customStyles={customStyles}
      noDataComponent={<NoRecords />}
      {...rest}
    />
  )
}

Table.defaultProps = {
  loading: false,
}
