// general types are declared here

// eslint-disable-next-line import/prefer-default-export
export enum LoadState {
  LOADING = "loading",
  UNLOADED = "unloaded",
  LOADED = "loaded",
}

export interface TokenInfo {
  readonly chainId: number
  readonly address: `0x${string}`
  readonly name: string
  readonly decimals: number
  readonly symbol: string
  readonly logoURI?: string
}

export enum Steps {
  IMPORT_TOKEN = "IMPORT_TOKEN",
  DEFAULT = "DEFAULT",
  CUSTOM_TOKENS = "CUSTOM_TOKENS",
}
