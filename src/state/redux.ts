import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { multicall } from "../utils/multicall"

export const rootReducer = combineReducers({
  [multicall.reducerPath]: multicall.reducer,
})

// used specifically for uniswap multicall package: @uniswap/redux-multicall
export const store = configureStore({
  reducer: rootReducer,
})
