import { createMulticall } from "@uniswap/redux-multicall"

// Somewhere in your app
export const multicall = createMulticall({ reducerPath: "multicall" })
