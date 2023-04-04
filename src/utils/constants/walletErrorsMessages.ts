interface WalletErrorsArgs {
  chain?: string
  code: 4001 | 4100 | 4900 | 4901
}

// wallet error codes mapped to user friendly messages.
const walletErrorMessages = ({ chain, code }: WalletErrorsArgs) => {
  const messages = {
    4001: "You rejected the wallet request",
    4100: "Your wallet is not connected properly.",
    4900: "Your wallet is disconnected. Please try reconnecting.",
    4901: `Your wallet is not connected to the ${chain} network`,
  }

  return messages[code]
}

export default walletErrorMessages
