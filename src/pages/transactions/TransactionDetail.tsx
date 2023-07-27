import React from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { ReactComponent as ArrowLeft } from "../../assets/icons/arrow-left.svg"
import { ReactComponent as Right } from "../../assets/icons/right.svg"
import { ReactComponent as LinkIcon } from "../../assets/icons/link.svg"

import { Copy, Wrapper } from "../../components/general"
import { goBackConditionally } from "../../utils/functions"
import { PageRoutes } from "../../utils/constants"
import { TransactionStatus } from "../../components/transactions"

export default function TransactionDetail() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <Wrapper>
      <div className="py-[23px] px-4 lg:py-[56px] lg:px-[87px]">
        <div className="flex items-center space-x-[27px]">
          <button
            type="button"
            onClick={() =>
              goBackConditionally(navigate, location, PageRoutes.HOME)
            }
          >
            <ArrowLeft className="path-white" />
          </button>
          <h3 className="font-bold text-white text-xl lg:text-[30px]">
            Transaction Details
          </h3>
        </div>
        <div className="mt-6 py-[30px] bg-background px-3 rounded-[12px] lg:mt-[40px] lg:mx-auto lg:px-[37px] lg:max-w-[488px]">
          <div className="px-5 h-[95px] bg-[#F3FFF1] rounded-[4px] flex items-center space-x-[18px]">
            <div className="flex items-center justify-center h-10 w-10 rounded-full shadowed">
              <Right className="h-[12.02px] w-4 stroke-primary" />
            </div>
            <h3 className="uppercase font-semibold text-[17px] text-black">
              sold 7 BNB for 189,899.90 Naira
            </h3>
          </div>
          <ul className="mt-[62px] mx-0 lg:mx-auto flex flex-col space-y-8">
            <li className="space-x-[45px] flex">
              <h3 className="flex-shrink-0 w-[143px] text-primary text-base font-semibold">
                TIME:
              </h3>
              <span className="text-white font-semibold text-sm whitespace-pre-wrap">
                Jan 29, 2023 at 12:14 AM
              </span>
            </li>
            <li className="space-x-[45px] flex">
              <h3 className="flex-shrink-0 w-[143px] text-primary text-base font-semibold">
                SOLD:
              </h3>
              <span className="text-white font-semibold text-sm">0.68 BNB</span>
            </li>
            <li className="space-x-[45px] flex">
              <h3 className="flex-shrink-0 w-[143px] text-primary text-base font-semibold">
                RECEIVED:
              </h3>
              <span className="text-white font-semibold text-sm">
                189,899.90 Naira{" "}
              </span>
            </li>
            <li className="space-x-[45px] flex">
              <h3 className="flex-shrink-0 w-[143px] text-primary text-base font-semibold">
                BANK DETAILS:
              </h3>
              <p className="text-white font-semibold text-sm whitespace-pre-wrap break-all">
                0245786573 GT BANK PLC EMMANUEL EMMANUEL AYOBAMI
              </p>
            </li>
            <li className="space-x-[45px] flex">
              <h3 className="flex-shrink-0 w-[143px] text-primary text-base font-semibold">
                REFERENCE NO:
              </h3>
              <span className="text-white font-semibold text-sm whitespace-pre-wrap break-all">
                GW9015183360000
                <Copy
                  className="h-4 w-4 -mb-1 ml-1"
                  text="GW9015183360000"
                  color="purple"
                />
              </span>
            </li>
            <li className="space-x-[45px] flex">
              <h3 className="flex-shrink-0 w-[143px] text-primary text-base font-semibold">
                WALLET ADDRESS:
              </h3>
              <span className="text-white font-semibold text-sm whitespace-pre-wrap break-all">
                0x7f4b995009737ac672d6722B386168eD6A399f6d
                <Copy
                  className="h-4 w-4 -mb-1 ml-1"
                  text="0x7f4b995009737ac672d6722B386168eD6A399f6d"
                  color="purple"
                />
              </span>
            </li>
            <li className="space-x-[45px] flex">
              <h3 className="flex-shrink-0 w-[143px] text-primary text-base font-semibold">
                STATUS:
              </h3>
              <TransactionStatus status="success" />
            </li>
          </ul>
          <div className="flex flex-col mt-12 justify-center items-center space-y-[30px]">
            <button
              type="button"
              className="flex justify-center h-11 w-[253px] bg-primary rounded-lg space-x-1 font-medium text-white items-center text-13"
            >
              <span>View on bscscan</span>
              <LinkIcon className="h-4 w-4 path-white" />
            </button>
            <button
              type="button"
              className="text-primary underline text-sm font-medium"
            >
              Contact support
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}
