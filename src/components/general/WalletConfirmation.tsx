import React from "react"
import Button from "./Button"
import Loader from "./Loader"

interface WalletConfirmationProps {
  onClose: (_?: any) => void
  header: string
  buttonText: string
}

export default function WalletConfirmation({
  onClose,
  header,
  buttonText,
}: WalletConfirmationProps) {
  return (
    <div>
      <h3 className="text-black text-center text-[21px] font-semibold">
        {header}
      </h3>
      <div className="flex items-center justify-center mt-[52.5px]">
        <Loader className="w-[100px] h-[100px]" />
      </div>
      <p className="mt-[40px] mb-[35px] text-lightBlue leading-6 text-center">
        Communicating with wallet. Please, Sign message with your wallet
      </p>
      <div className="mx-[37px]">
        <Button fullWidth text={buttonText} onClick={() => onClose()} />
      </div>
    </div>
  )
}
