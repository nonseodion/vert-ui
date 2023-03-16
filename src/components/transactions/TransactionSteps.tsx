import React, { useEffect, useState } from "react"
import clsx from "classnames"
import { useNavigate } from "react-router-dom"
import { ReactComponent as Cash } from "../../assets/images/cash.svg"
import { ReactComponent as Error } from "../../assets/icons/error.svg"
import { ReactComponent as Question } from "../../assets/icons/question.svg"
import { ReactComponent as Pencil } from "../../assets/icons/pencil.svg"
import { ReactComponent as Exit } from "../../assets/icons/exit.svg"
import { ReactComponent as Copy } from "../../assets/icons/copy.svg"
import { ReactComponent as PaperAirplane } from "../../assets/images/paper-airplane.svg"
import { Button, Loader } from "../general"
import { useModal } from "../../hooks"
import ConfirmExchangeModal from "./ConfirmExchangeModal"
import { getRandomBoolean } from "../../utils/functions"
import { Modals, PageRoutes } from "../../utils/constants"

interface TransactionStepProps {
  proceed: () => void
}

interface WaitingForConfirmationProps extends TransactionStepProps {
  onConfirm: () => void
}

export function ViewOnBsc() {
  return (
    <div className="text-base max-w-[229.68px] text-[#0F172A]/[.8]">
      Confirmed Transaction.
      <br />
      <a className="flex items-center space-x-1" href="https://www.google.com">
        <span>View on bscscan</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M13.3333 7.33333C13.1565 7.33333 12.987 7.40357 12.8619 7.5286C12.7369 7.65362 12.6667 7.82319 12.6667 8V12C12.6667 12.1768 12.5964 12.3464 12.4714 12.4714C12.3464 12.5964 12.1768 12.6667 12 12.6667H4C3.82319 12.6667 3.65362 12.5964 3.5286 12.4714C3.40357 12.3464 3.33333 12.1768 3.33333 12V4C3.33333 3.82319 3.40357 3.65362 3.5286 3.5286C3.65362 3.40357 3.82319 3.33333 4 3.33333H8C8.17681 3.33333 8.34638 3.2631 8.4714 3.13807C8.59643 3.01305 8.66667 2.84348 8.66667 2.66667C8.66667 2.48986 8.59643 2.32029 8.4714 2.19526C8.34638 2.07024 8.17681 2 8 2H4C3.46957 2 2.96086 2.21071 2.58579 2.58579C2.21071 2.96086 2 3.46957 2 4V12C2 12.5304 2.21071 13.0391 2.58579 13.4142C2.96086 13.7893 3.46957 14 4 14H12C12.5304 14 13.0391 13.7893 13.4142 13.4142C13.7893 13.0391 14 12.5304 14 12V8C14 7.82319 13.9298 7.65362 13.8047 7.5286C13.6797 7.40357 13.5101 7.33333 13.3333 7.33333Z"
            fill="#323B49"
          />
          <path
            d="M10.6673 3.33333H11.7206L7.52728 7.52C7.46479 7.58198 7.4152 7.65571 7.38135 7.73695C7.3475 7.81819 7.33008 7.90533 7.33008 7.99333C7.33008 8.08134 7.3475 8.16848 7.38135 8.24972C7.4152 8.33096 7.46479 8.40469 7.52728 8.46667C7.58925 8.52915 7.66299 8.57875 7.74423 8.61259C7.82547 8.64644 7.9126 8.66387 8.00061 8.66387C8.08862 8.66387 8.17576 8.64644 8.25699 8.61259C8.33823 8.57875 8.41197 8.52915 8.47394 8.46667L12.6673 4.28V5.33333C12.6673 5.51014 12.7375 5.67971 12.8625 5.80474C12.9876 5.92976 13.1571 6 13.3339 6C13.5108 6 13.6803 5.92976 13.8053 5.80474C13.9304 5.67971 14.0006 5.51014 14.0006 5.33333V2.66667C14.0006 2.48986 13.9304 2.32029 13.8053 2.19526C13.6803 2.07024 13.5108 2 13.3339 2H10.6673C10.4905 2 10.3209 2.07024 10.1959 2.19526C10.0708 2.32029 10.0006 2.48986 10.0006 2.66667C10.0006 2.84348 10.0708 3.01305 10.1959 3.13807C10.3209 3.2631 10.4905 3.33333 10.6673 3.33333Z"
            fill="#323B49"
          />
        </svg>
      </a>
    </div>
  )
}

export function ConfirmTransaction({ proceed }: TransactionStepProps) {
  const navigate = useNavigate()
  const { showModal, hideModal } = useModal()
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [rateChanged, setRateChanged] = useState(false)

  useEffect(() => {
    setRateChanged(getRandomBoolean())
  }, [])

  const acceptRateChange = () => setRateChanged(false)

  const startConfirmation = () => {
    showModal({ modal: Modals.CONFIRM_EXCHANGE })
    setTimeout(() => {
      hideModal(Modals.CONFIRM_EXCHANGE)
      setIsConfirmed(true)
      setTimeout(() => {
        proceed()
      }, 3000)
    }, 3000)
  }

  return (
    <div
      className={clsx(
        "bg-white w-full max-w-[463px] rounded-3xl py-5 !mb-10 px-6",
        {
          "!p-[25px]": isConfirmed,
        }
      )}
    >
      <ConfirmExchangeModal />
      {!isConfirmed ? (
        <div>
          <div className="flex items-center justify-between">
            <h3 className="text-25 leading-[37.5px] text-black">
              Confirm transaction
            </h3>
            <button type="button" onClick={() => navigate(PageRoutes.HOME)}>
              <Exit className="fill-[#929AA5]" />
            </button>
          </div>
          <div className="flex items-center justify-center py-6">
            <Cash />
          </div>
          <p className="text-[17px] leading-[31px] font-semibold text-center">
            Selling 0.16 BNB for 100,800.90 Naira
          </p>
          {rateChanged && (
            <div className="transition-all duration-150 mt-[18px] h-[74px] rounded-xl flex justify-between border border-primary px-5 items-center">
              <div className="flex items-center space-x-[7px]">
                <Error />
                <span className="font-inter font-medium text-sm text-black">
                  Rate updated
                </span>
              </div>
              <Button
                text="Accept"
                onClick={acceptRateChange}
                className="!rounded-lg h-10 !py-0"
              />
            </div>
          )}
          <div className="rounded-[4px] bg-greenBg mt-[25px]">
            <div className="py-3 px-5">
              <p className="mb-[17px] text-darkPurple text-13">
                Transaction summary
              </p>
              <ul className="flex flex-col space-y-[14px]">
                <li className="flex justify-between items-center">
                  <div className="space-x-1 flex items-center">
                    <span className="text-13 text-darkPurple">Rate</span>
                    <Question />
                  </div>
                  <span className="text-13 text-darkPurple text-right">
                    1 BNB = 7200.06 NGN
                  </span>
                </li>
                <li className="flex justify-between items-center">
                  <div className="space-x-1 flex items-center">
                    <span className="text-13 text-darkPurple">Network fee</span>
                    <Question />
                  </div>
                  <span className="text-13 text-darkPurple text-right">
                    0.0004 BNB
                  </span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-sm text-darkPurple">
                    Estimated processing time
                  </span>
                  <span className="text-13 text-darkPurple text-right">
                    3-5mins
                  </span>
                </li>
                <li className="flex justify-between">
                  <span className="text-sm text-darkPurple">Bank details</span>
                  <span className="text-13 text-darkPurple text-right max-w-[155px]">
                    ELUJOBA EMMANUEL. A 0245786573 GT Bank Plc
                  </span>
                </li>
              </ul>
              <div className="flex justify-between items-center mt-[10px]">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="ml-auto h-8 flex rounded-[4px] border border-primary px-2 justify-center items-center space-x-[10px]"
                >
                  <Pencil className="fill-primary h-[10.65px] w-[10.65px]" />
                  <span className="text-12 font-medium text-primary">
                    Change bank details
                  </span>
                </button>
              </div>
            </div>
            <div className="mt-[24.5px] h-[1px] w-full bg-[#D2FFCA]" />
            <div className="px-[21px] pt-[7.5px] pb-[11px] flex justify-between items-center">
              <span className="text-sm text-black">You will receive</span>
              <h4 className="text-[18px] text-black text-right">
                100,800.90 NGN
              </h4>
            </div>
          </div>
          <div className="mt-[30px] flex space-x-[33px]">
            <Button
              className="h-[52px] !py-0 !text-primary !rounded-lg"
              background="transparent"
              bordered
              text="Cancel"
              fullWidth
              onClick={() => navigate(PageRoutes.HOME)}
            />
            <Button
              className="h-[52px] !py-0 !rounded-lg disabled:bg-primary/[.4] disabled:border-0"
              bordered
              text="Confirm"
              onClick={() => startConfirmation()}
              fullWidth
              textColor="white"
              disabled={rateChanged}
            />
          </div>
        </div>
      ) : (
        <div>
          <h3 className="mb-[48.5px] text-center text-black text-25">
            Processing blockchain transaction
          </h3>
          <div className="flex items-center justify-center">
            <Loader className="h-[75px] w-[75px]" />
          </div>
          <p className="mt-12 font-medium text-base text-lightBlue text-center">
            Please, wait while transaction is being processed on the blockchain.
          </p>
        </div>
      )}
    </div>
  )
}

export function WaitingForConfirmation({
  proceed,
  onConfirm,
}: WaitingForConfirmationProps) {
  useEffect(() => {
    setTimeout(() => {
      onConfirm()
      proceed()
    }, 5000)
  }, [onConfirm, proceed])
  return (
    <div className="bg-white w-full max-w-[463px] pt-[25px] py-[30px] px-[30px] rounded-3xl">
      <h3 className="text-25 text-black font-semibold text-center">
        Waiting for blockchain confirmation
      </h3>
      <div className="flex items-center justify-center mt-[22px]">
        <Loader className="h-[30px] w-[30px]" />
      </div>
      <ul className="mt-[41px] flex flex-col space-y-[10px]">
        <li className="flex justify-between items-center">
          <span className="text-[15px] text-darkPurple">Confirmation</span>
          <span className="text-[15px] text-darkPurple text-right">26/4</span>
        </li>
        <li className="flex justify-between items-center">
          <span className="text-[15px] text-darkPurple">Address</span>
          <button type="button" className="flex items-center space-x-1">
            <span className="text-[15px] text-darkPurple">0x6810...9568</span>
            <Copy />
          </button>
        </li>
        <li className="flex justify-between items-center">
          <span className="text-[15px] text-darkPurple">Network fee</span>
          <span className="text-[15px] text-darkPurple text-right">
            0.0004 BNB
          </span>
        </li>
        <li className="flex justify-between items-center">
          <span className="text-[15px] text-darkPurple">
            Estimated confirmation time
          </span>
          <span className="text-[15px] text-darkPurple text-right">
            22 secs
          </span>
        </li>
        <li className="flex justify-between items-center">
          <span className="text-[15px] text-darkPurple">Trx Hash</span>
          <button type="button" className="flex items-center space-x-1">
            <span className="text-[15px] text-darkPurple">0x8028934cd..</span>
            <Copy />
          </button>
        </li>
      </ul>
    </div>
  )
}

export function SuccessfulTransaction() {
  const { showModal } = useModal()

  useEffect(() => {
    setTimeout(() => {
      showModal({ modal: Modals.CASH_SENT })
    }, 5000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex flex-col space-y-10 items-center justify-center">
      <PaperAirplane />
      <h3 className="text-[32px] mx-[50px] text-center text-white max-w-[421px] leading-12">
        Cash is on it&apos;s way to your account
      </h3>
    </div>
  )
}
