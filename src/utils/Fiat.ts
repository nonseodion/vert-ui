class Fiat {
  public readonly name

  public readonly symbol

  public readonly decimals = 2

  constructor(name: string, symbol: string) {
    this.name = name
    this.symbol = symbol
  }

  equals(other: Fiat): boolean {
    return (
      this.decimals === other.decimals &&
      this.name === other.name &&
      this.symbol === other.symbol
    )
  }
}

export const USD = new Fiat("US Dollars", "USD")
export const NGN = new Fiat("Nigerian Naira", "NGN")

export default Fiat
