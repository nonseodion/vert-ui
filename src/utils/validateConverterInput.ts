const validateUserInput = (input: string, decimals: number): boolean => {
  // eslint-disable-next-line prefer-regex-literals
  const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`) // match escaped "." characters via in a non-capturing group
  const escapeRegex = /[.*+?^${}()|[\]\\]/g

  // ensure amount does not exceed token decimals
  const decimalPortion = input.split(".")[1]
  const decimalSafe = decimalPortion ? decimalPortion.length <= decimals : true

  const valid =
    (input === "" || inputRegex.test(input.replace(escapeRegex, "\\$&"))) && // test for unwanted characters
    decimalSafe
  return valid
}

export default validateUserInput
