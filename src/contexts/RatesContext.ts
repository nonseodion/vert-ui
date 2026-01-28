import { createContext } from "react"

export type Rates = {
  data: {
    rates: {
      USDTNGN: number
      USDTUSD: number
    }
    time: number
  }
  signature: string
}

export interface RateValues {
  ngn?: number
  usd?: number
  data?: Rates
}

const RateContext = createContext<RateValues>({})

export default RateContext
