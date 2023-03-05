export interface Transaction {
  date: string
  amount_sold: string
  amount_received: string
  id: number
  bank_details: {
    name: string
    account_number: string
    bank: string
  }
  reference_no: string
  wallet_address: string
  status: "pending" | "failed" | "success"
  blockchain_txn: string
}

const transactions: Transaction[] = [
  {
    date: "22-JAN-2023 10:51:43",
    amount_sold: "0.68 BNB",
    amount_received: "189,899.90 NGN",
    id: 1,
    bank_details: {
      name: "ELUJOBA EMMANUEL. A",
      account_number: "0245786573",
      bank: "GT Bank Plc",
    },
    reference_no: "GW9015183360000",
    wallet_address: "0x6810...9568",
    status: "success",
    blockchain_txn: "0x450ae5a49aa6861...",
  },
  {
    date: "22-JAN-2023 10:51:43",
    amount_sold: "0.68 BNB",
    amount_received: "189,899.90 NGN",
    id: 2,
    bank_details: {
      name: "ELUJOBA EMMANUEL. A",
      account_number: "0245786573",
      bank: "GT Bank Plc",
    },
    reference_no: "GW9015183360000",
    wallet_address: "0x6810...9568",
    status: "pending",
    blockchain_txn: "0x450ae5a49aa6861...",
  },
  {
    date: "22-JAN-2023 10:51:43",
    amount_sold: "0.68 BNB",
    amount_received: "189,899.90 NGN",
    id: 3,
    bank_details: {
      name: "ELUJOBA EMMANUEL. A",
      account_number: "0245786573",
      bank: "GT Bank Plc",
    },
    reference_no: "GW9015183360000",
    wallet_address: "0x6810...9568",
    status: "success",
    blockchain_txn: "0x450ae5a49aa6861...",
  },
  {
    date: "22-JAN-2023 10:51:43",
    amount_sold: "0.68 BNB",
    amount_received: "189,899.90 NGN",
    id: 4,
    bank_details: {
      name: "ELUJOBA EMMANUEL. A",
      account_number: "0245786573",
      bank: "GT Bank Plc",
    },
    reference_no: "GW9015183360000",
    wallet_address: "0x6810...9568",
    status: "failed",
    blockchain_txn: "0x450ae5a49aa6861...",
  },
  {
    date: "22-JAN-2023 10:51:43",
    amount_sold: "0.68 BNB",
    amount_received: "189,899.90 NGN",
    id: 5,
    bank_details: {
      name: "ELUJOBA EMMANUEL. A",
      account_number: "0245786573",
      bank: "GT Bank Plc",
    },
    reference_no: "GW9015183360000",
    wallet_address: "0x6810...9568",
    status: "success",
    blockchain_txn: "0x450ae5a49aa6861...",
  },
  {
    date: "22-JAN-2023 10:51:43",
    amount_sold: "0.68 BNB",
    amount_received: "189,899.90 NGN",
    id: 6,
    bank_details: {
      name: "ELUJOBA EMMANUEL. A",
      account_number: "0245786573",
      bank: "GT Bank Plc",
    },
    reference_no: "GW9015183360000",
    wallet_address: "0x6810...9568",
    status: "pending",
    blockchain_txn: "0x450ae5a49aa6861...",
  },
  {
    date: "22-JAN-2023 10:51:43",
    amount_sold: "0.68 BNB",
    amount_received: "189,899.90 NGN",
    id: 7,
    bank_details: {
      name: "ELUJOBA EMMANUEL. A",
      account_number: "0245786573",
      bank: "GT Bank Plc",
    },
    reference_no: "GW9015183360000",
    wallet_address: "0x6810...9568",
    status: "success",
    blockchain_txn: "0x450ae5a49aa6861...",
  },
  {
    date: "22-JAN-2023 10:51:43",
    amount_sold: "0.68 BNB",
    amount_received: "189,899.90 NGN",
    id: 8,
    bank_details: {
      name: "ELUJOBA EMMANUEL. A",
      account_number: "0245786573",
      bank: "GT Bank Plc",
    },
    reference_no: "GW9015183360000",
    wallet_address: "0x6810...9568",
    status: "success",
    blockchain_txn: "0x450ae5a49aa6861...",
  },
  {
    date: "22-JAN-2023 10:51:43",
    amount_sold: "0.68 BNB",
    amount_received: "189,899.90 NGN",
    id: 9,
    bank_details: {
      name: "ELUJOBA EMMANUEL. A",
      account_number: "0245786573",
      bank: "GT Bank Plc",
    },
    reference_no: "GW9015183360000",
    wallet_address: "0x6810...9568",
    status: "success",
    blockchain_txn: "0x450ae5a49aa6861...",
  },
  {
    date: "22-JAN-2023 10:51:43",
    amount_sold: "0.68 BNB",
    amount_received: "189,899.90 NGN",
    id: 10,
    bank_details: {
      name: "ELUJOBA EMMANUEL. A",
      account_number: "0245786573",
      bank: "GT Bank Plc",
    },
    reference_no: "GW9015183360000",
    wallet_address: "0x6810...9568",
    status: "success",
    blockchain_txn: "0x450ae5a49aa6861...",
  },
]

export default transactions
