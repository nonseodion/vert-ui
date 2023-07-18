import {
  Dispatch,
  useContext,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react"
import { rateSocket } from "../services/socket.setup"
import RateContext, { RateValues, Rates } from "../contexts/RatesContext"

export function useGetRates(): RateValues {
  const [data, setRates] = useState<undefined | Rates>()
  const listener = useCallback(
    (cb: Dispatch<SetStateAction<Rates | undefined>>, _rates?: Rates) =>
      _rates && cb(_rates),
    []
  )

  // eslint-disable-next-line arrow-body-style
  useEffect(() => {
    rateSocket.on("rates", (__rates) => {
      listener(setRates, __rates)
    })

    return () => {
      rateSocket.off("rates", listener)
    }
  }, [listener])

  return {
    data,
    ngn: data?.data.rates.BUSDNGN.rate,
    usd: 1,
  }
}

function useRates() {
  const rates = useContext(RateContext)

  return rates
}

export default useRates
