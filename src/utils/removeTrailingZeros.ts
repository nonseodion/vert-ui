const removeTrailingZerosRegex =
  /^([\d,]+)$|^([\d,]+)\.0*$|^([\d,]+\.[0-9]*?)0*$/g

const removeTrailingZeros = (amount: string): string =>
  amount.replace(removeTrailingZerosRegex, "$1$2$3")

export default removeTrailingZeros
