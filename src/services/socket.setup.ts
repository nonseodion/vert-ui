import { io } from "socket.io-client"

export const rateSocket = io(`${process.env.REACT_APP_BACKEND_URL}/rates`, {
  autoConnect: false,
})
export const txSocket = io(
  `${process.env.REACT_APP_BACKEND_URL}/transactions`,
  {
    autoConnect: true,
  }
)
