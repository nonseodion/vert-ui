import { createContext } from "react"

export type Rates = {
  data: {
    rates: {
      BUSDNGN: { rate: number; key: string }
      BUSDUSD: { rate: number; key: string }
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
