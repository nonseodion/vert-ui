import React, { useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { useNetwork } from "wagmi"
import { ReactComponent as Right } from "../../assets/icons/right.svg"
import { ReactComponent as Exit } from "../../assets/icons/exit.svg"
import { ReactComponent as LinkIcon } from "../../assets/icons/link.svg"
import { useModal } from "../../hooks"
import { Button, Copy, Modal } from "../general"
import { Modals, PageRoutes } from "../../utils/constants"
import useExchange from "../../state/exchange/useExchange"
import { shortenAddress, toTwoDecimalPlaces } from "../../utils"
import useWallet from "../../state/auth/useWallet"

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
]

export default function TransactionDetailsModal() {
  const { hideModal } = useModal(Modals.TRANSACTION_DETAILS)
  const navigate = useNavigate()
  const { chain } = useNetwork()
  const { sellAmount, buyAmount, bankAccount, txHash } = useExchange()
  const date = useMemo(() => new Date(), [])
  const { address } = useWallet()

  return (
    <Modal
      name={Modals.TRANSACTION_DETAILS}
      bodyClassNames="mt-[100px] lg-mt-[150px] px-8 max-w-[436px] pt-9 pb-[30px]"
    >
      <button
        type="button"
        onClick={() => {
          hideModal()
          navigate(PageRoutes.HOME)
        }}
        className="absolute top-[24.04px] right-[19.84px]"
      >
        <Exit className="h-[14px] w-[14px] fill-[#929AA5]" />
      </button>
      <h2 className=" text-black font-bold text-[25px]">Transaction Details</h2>
      <div className="flex items-center space-x-[15px] mt-[42px] py-7 px-5 rounded-[4px] bg-greenBg">
        <div className="flex items-center justify-center h-10 w-10 rounded-full shadowed">
          <Right className="h-[12.02px] w-4 stroke-primary" />
        </div>
        <div className="flex flex-col space-y-2">
          <h4 className="text-black text-13 font-semibold leading-[17.5px]">
            TRANSACTION SUCCESSFUL
          </h4>
          <p className="text-[11px] leading-[17.5px] text-black">
            Successfully sold &nbsp;
            {sellAmount && sellAmount.toExact()} &nbsp;
            {sellAmount && sellAmount.currency.symbol} &nbsp; for{" "}
            {buyAmount && toTwoDecimalPlaces(buyAmount.toExact())} NGN
          </p>
        </div>
      </div>
      <ul className="mt-[19.73px]">
        <li className="pt-[15px] pb-[18px] flex justify-between border-b border-b-[rgba(220, 220, 224, 0.3)]">
          <div className="flex flex-col space-y-[5.31px]">
            <span className="text-[12.25px] font-inter text-extraGrey">
              Date
            </span>
            <p className="font-semibold text-[13.13px] leading-[16.5px]">
              {months[date.getMonth()]} {date.getDay()}, {date.getFullYear()} at{" "}
              {date.toLocaleTimeString("en-US", {
                hour12: true,
                hour: "numeric",
                minute: "numeric",
              })}
            </p>
          </div>
        </li>
        <li className="pt-[15px] pb-[18px] flex justify-between border-b border-b-[rgba(220, 220, 224, 0.3)]">
          <div className="flex flex-col space-y-[5.31px]">
            <span className="text-[12.25px] font-inter text-extraGrey">
              Bank details
            </span>
            <div className="flex flex-col">
              <p className="font-semibold text-[12.13px] leading-[20.5px] text-black">
                {bankAccount?.accountName}
              </p>
              <p className="text-[12.13px] leading-[20.5px] text-black">
                {bankAccount?.accountNumber} {bankAccount?.bank.label}
              </p>
            </div>
          </div>
          <div className="flex items-center space-y-1">
            <span className="mb-[-3px] font-semibold text-black text-[12.13px]">
              {shortenAddress(address ?? "0x")}
            </span>
            <Copy text={address ?? "0x"} />
          </div>
        </li>
        {/* <li className="pt-[15px] pb-[18px] flex justify-between border-b border-b-[rgba(220, 220, 224, 0.3)]">
          <div className="flex flex-col space-y-[5.31px]">
            <span className="text-[12.25px] font-inter text-extraGrey">
              Transaction Reference No
            </span>
            <p className="font-semibold text-[13.13px] leading-[16.5px]">
              090267230130001438041100652094
            </p>
          </div>
        </li> */}
        <li className="pt-[15px] pb-[18px] flex justify-between border-b border-b-[rgba(220, 220, 224, 0.3)]">
          <div className="flex flex-col space-y-[5.31px]">
            <span className="text-[12.25px] font-inter text-extraGrey">
              Status
            </span>
            <div className="flex items-center space-x-1">
              <div className="h-2 w-2 rounded-full bg-brightGreen" />
              <span className="text-black font-semibold text-[11.13px]">
                Success
              </span>
            </div>
          </div>
        </li>
      </ul>
      <div className="mt-[15.93px] flex flex-col items-center justify-center space-y-[9px]">
        <a
          href="#support"
          className="text-primary text-center text-sm font-medium underline"
        >
          Contact support
        </a>
        <a
          href={`${chain?.blockExplorers?.default.url}/tx/${txHash}`}
          target="_blank"
          rel="noreferrer"
        >
          <Button
            icon={<LinkIcon className="path-white" />}
            text="View on bscscan"
          />
        </a>
      </div>
    </Modal>
  )
}
