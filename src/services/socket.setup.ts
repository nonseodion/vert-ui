import { io } from "socket.io-client"

export const rateSocket = io("http://localhost:3001/rates")
export const txSocket = io("http://localhost:3001/transactions")
