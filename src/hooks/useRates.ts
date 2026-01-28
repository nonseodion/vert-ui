import { useContext, useCallback, useEffect, useState } from "react"
import { rateSocket } from "../services/socket.setup"
import RateContext, { RateValues, Rates } from "../contexts/RatesContext"

export function useGetRates(): RateValues {
  const [data, setRates] = useState<undefined | Rates>()
  const handleRates = useCallback((rates?: Rates) => {
    if (rates) {
      setRates(rates)
    }
  }, [])

  useEffect(() => {
    rateSocket.on("rates", handleRates)
    if (!rateSocket.connected) {
      rateSocket.connect()
    }

    return () => {
      rateSocket.off("rates", handleRates)
    }
  }, [handleRates])

  return {
    data,
    ngn: data?.data.rates.USDTNGN,
    usd: 1,
  }
}

function useRates() {
  const rates = useContext(RateContext)

  return rates
}

export default useRates
