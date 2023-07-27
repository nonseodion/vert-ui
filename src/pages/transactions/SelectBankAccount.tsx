import React, { useState, useCallback } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { ReactComponent as ArrowLeft } from "../../assets/icons/arrow-left.svg"
import { ReactComponent as Plus } from "../../assets/icons/plus.svg"
import { Modals, PageRoutes } from "../../utils/constants"
import { goBackConditionally } from "../../utils/functions"
import { Wrapper } from "../../components/general"
// import { SelectBankListSkeleton } from "../../components/skeletons"
import { useModal } from "../../hooks"
import { AddBankAccountModal } from "../../components/settings"
import { BankAccount } from "../../services/banks"
import { BankAccountComponent } from "../../components/transactions"
import useExchange from "../../state/exchange/useExchange"

export default function SelectBankAccount() {
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([])
  const [addingBank, setAddingBank] = useState(false)
  const { showModal, hideModal } = useModal()
  const navigate = useNavigate()
  const location = useLocation()
  const { setExchange } = useExchange()
  const handleClick = useCallback(() => {
    setExchange({ key: "bankAccount", value: bankAccounts[0] })
    navigate(PageRoutes.PROCESS_TRANSACTION)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bankAccounts])

  // const [loading, setLoading] = useState(true)

  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false)
  //   }, 3000)
  // }, [])

  const addNewBank = (bankAccount: BankAccount) => {
    setAddingBank(true)
    setBankAccounts([...bankAccounts, bankAccount])
    setAddingBank(false)
    hideModal(Modals.BANK_ACCOUNT)
  }

  return (
    <Wrapper>
      <AddBankAccountModal
        onConfirm={addNewBank}
        adding={addingBank}
        onClose={() => hideModal(Modals.BANK_ACCOUNT)}
      />
      <div className="px-[27px] flex items-center justify-center py-[100px] lg:py-[114px]">
        <div className="bg-white rounded-3xl py-[30px] px-6 w-full md:w-[510px]">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() =>
                goBackConditionally(navigate, location, PageRoutes.HOME)
              }
            >
              <ArrowLeft />
            </button>
            <h2 className="text-black text-center text-xl md:text-25 font-semibold leading-[37.5px]">
              Select a Bank Account
            </h2>
            <button type="button" className="opacity-0 pointer-events-none">
              <ArrowLeft />
            </button>
          </div>
          <p className="mt-[5px] text-center text-12 text-[#898989]">
            Choose from your saved bank accounts or add a new one.
          </p>
          <button
            type="button"
            onClick={() => showModal({ modal: Modals.BANK_ACCOUNT })}
            className="mt-[33px] items-center flex space-x-[7.7px] rounded-lg py-[11px] px-3 border border-primary"
          >
            <Plus className="!fill-primary" />
            <span className="text-primary font-medium text-sm leading-5">
              Add new bank details
            </span>
          </button>
          <div className="flex flex-col space-y-[18px]">
            {/* List of saved bank accounts */}
            {/* {(loading || bankAccounts.length > 0) && (
              <p className="text-[#212833] mt-[38px] lg:mt-[52px]">
                Saved Bank details
              </p>
            )} */}
            {/* {loading && <SelectBankListSkeleton />} */}

            <ul className="flex flex-col space-y-4 mt-[38px] lg:mt-[52px]">
              {bankAccounts.map((account) => (
                <BankAccountComponent
                  key={account.accountNumber}
                  onClick={handleClick}
                  className="bg-[#F4FFF2]"
                  bankAccount={account}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}
