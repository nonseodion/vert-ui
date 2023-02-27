import { getAddress } from "ethers/lib/utils"
import { memoize } from "lodash"

// eslint-disable-next-line import/prefer-default-export
export const isAddress = memoize((value: any): string | false => {
  try {
    return getAddress(value)
  } catch {
    return false
  }
})
