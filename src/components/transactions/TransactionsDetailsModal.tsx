import React from "react"
import { ReactComponent as Copy } from "../../assets/icons/copy.svg"
import { ReactComponent as Right } from "../../assets/icons/right.svg"
import { ReactComponent as Exit } from "../../assets/icons/exit.svg"
import { ReactComponent as LinkIcon } from "../../assets/icons/link.svg"
import { useModal } from "../../hooks"
import { Button, Modal } from "../general"
import { Modals } from "../../utils/constants"

export default function TransactionDetailsModal() {
  const { hideModal } = useModal(Modals.TRANSACTION_DETAILS)
  return (
    <Modal
      name={Modals.TRANSACTION_DETAILS}
      bodyClassNames="mt-[100px] lg-mt-[150px] px-8 max-w-[436px] pt-9 pb-[30px]"
    >
      <button
        type="button"
        onClick={() => hideModal()}
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
            Successfully sold 7 BNB for 100,800.90 Naira
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
              Jan 29, 2023 at 12:14 AM
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
                Elujoba Emmanuel A
              </p>
              <p className="text-[12.13px] leading-[20.5px] text-black">
                0245786573 GTBank Plc
              </p>
            </div>
          </div>
          <div className="flex items-center space-y-1">
            <span className="mb-[-3px] font-semibold text-black text-[12.13px]">
              0x6810...9568
            </span>
            <Copy />
          </div>
        </li>
        <li className="pt-[15px] pb-[18px] flex justify-between border-b border-b-[rgba(220, 220, 224, 0.3)]">
          <div className="flex flex-col space-y-[5.31px]">
            <span className="text-[12.25px] font-inter text-extraGrey">
              Transaction Reference No
            </span>
            <p className="font-semibold text-[13.13px] leading-[16.5px]">
              090267230130001438041100652094
            </p>
          </div>
        </li>
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
          href="https://www.google.com"
          className="text-primary text-center text-sm font-medium underline"
        >
          Contact support
        </a>
        <Button
          icon={<LinkIcon className="path-white" />}
          text="View on bscscan"
        />
      </div>
    </Modal>
  )
}
