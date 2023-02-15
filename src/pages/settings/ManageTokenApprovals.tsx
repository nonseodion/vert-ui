import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import metamask from "../../assets/icons/metamask.png"
import wakanda_inu from "../../assets/icons/wakanda-inu.png"
import { ReactComponent as Copy } from "../../assets/icons/copy.svg"
import { ReactComponent as ArrowLeft } from "../../assets/icons/arrow-left.svg"
import { Button, Loader, Wrapper } from "../../components/general"
import SettingsContent from "../../components/settings/SettingsContent"
import { RemoveTokenApprovalModal } from "../../components/settings"
import useModal from "../../hooks/useModal"

interface TokenApproval {
  asset: string
  time: string
  asset_icon: string
}

const tokenApprovals = [
  {
    id: 1,
    asset_icon: wakanda_inu,
    asset: "Wakanda Inu Token",
    time: "2022-05-04 22:23:58",
  },
  {
    id: 2,
    asset_icon: wakanda_inu,
    asset: "Wakanda Inu Token",
    time: "2022-05-04 22:23:58",
  },
  {
    id: 3,
    asset_icon: wakanda_inu,
    asset: "Wakanda Inu Token",
    time: "2022-05-04 22:23:58",
  },
  {
    id: 4,
    asset_icon: wakanda_inu,
    asset: "Wakanda Inu Token",
    time: "2022-05-04 22:23:58",
  },
]

export default function ManageTokenApprovals() {
  const navigate = useNavigate()
  const { showModal } = useModal()
  const [approvals] = useState<TokenApproval[]>(tokenApprovals)
  const [tokenToRevoke, setTokenToRevoke] = useState<TokenApproval | null>(null)
  return (
    <Wrapper>
      <div className="px-4 pt-5 lg:pt-[60px] lg:px-[80px] flex flex-col space-y-[50px] lg:flex-row lg:space-y-20 lg:space-x-[77px]">
        <div className="flex flex-col space-y-[30px] lg:fixed flex-shrink-0 lg:max-w-[247px]">
          <h3 className="font-bold text-2xl text-white lg:text-[40px]">
            My Account
          </h3>
          <div className="flex flex-col space-y-[26.5px]">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="border-none flex h-[40px] outline-none items-center space-x-[10px]"
            >
              <ArrowLeft />
              <span className="text-primary text-sm font-medium">Back</span>
            </button>
            <div className="flex flex-col space-y-[10px]">
              <h3 className="text-base font-semibold text-white">
                Manage Token Approval
              </h3>
              <p className="text-lightBlue leading-6 w-full">
                Manage & revoke your token approvals.
              </p>
            </div>
          </div>
        </div>
        <SettingsContent
          title="Token Approval"
          className="bg-nav !max-w-[935px]"
          {...(approvals.length > 0 && {
            outerElement: (
              <div className="flex justify-between">
                <div className="mt-[30px] w-fit mb-[15.19px] border rounded-xl px-3 py-[14px] border-primary flex items-center space-x-3">
                  <div className="h-7 w-7 flex items-center justify-center bg-[#FFD3A2] rounded-full">
                    <img src={metamask} alt="metamask" className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col space-y-[9px]">
                    <div className="flex space-x-1 items-center">
                      <span className="text-lightBlue underline text-[15px] font-medium">
                        0x6810...9568
                      </span>
                      <button type="button">
                        <Copy className="h-4 w-4 stroke-lightBlue" />
                      </button>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="h-[9px] w-[9px] rounded-full bg-primary" />
                      <span className="text-white text-[11.13px]">
                        connected
                      </span>
                    </div>
                  </div>
                </div>
                {tokenToRevoke && (
                  <button
                    type="button"
                    className="h-[35px] space-x-2 border border-primary rounded-lg py-0 flex items-center bg-primary/[.15] text-primary/[.4] text-sm px-[22px]"
                  >
                    <Loader className="h-3 w-3" />
                    <span>Revoking</span>
                  </button>
                )}
              </div>
            ),
          })}
        >
          <div className="rounded-xl">
            <div className=" rounded-tl-xl rounded-tr-xl px-5 bg-faintGreen h-[51px] flex justify-between items-center">
              <h3 className="w-[161px] text-base text-black font-semibold">
                Asset
              </h3>
              <h3 className="w-[144px] text-base text-black font-semibold">
                Time of approval
              </h3>
              <h3 className="w-[161px] text-right text-base text-black font-semibold">
                Action
              </h3>
            </div>
            {approvals.length === 0 ? (
              <div className="h-[348px] bg-white flex flex-col pt-[85px] space-y-[39px]">
                <p className="text-lightBlue text-center text-[21px] font-medium">
                  Manage & revoke your token approvals.
                </p>
                <div className="flex items-center justify-center">
                  <Button text="Connect Wallet" />
                </div>
              </div>
            ) : (
              <ul>
                {approvals.map((approval) => (
                  <li className="h-[71px] flex w-full px-5 items-center justify-between bg-white border-y-[0.25px]">
                    <div className="w-[161px] flex items-center space-x-1">
                      <img
                        src={approval.asset_icon}
                        alt={approval.asset}
                        className="h-7 w-7"
                      />
                      <span className="text-13 text-black">
                        {approval.asset}
                      </span>
                    </div>
                    <div className="w-[144px]">
                      <span className="text-sm">{approval.time}</span>
                    </div>
                    <div className="w-[161px] flex justify-end">
                      <Button
                        text="Revoke"
                        className="h-[35px] py-0 bg-primary/[.15] text-primary"
                        bordered
                        onClick={() => {
                          setTokenToRevoke(approval)
                          showModal({
                            onCloseCallback: () => setTokenToRevoke(null),
                          })
                        }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </SettingsContent>
      </div>
      <RemoveTokenApprovalModal />
    </Wrapper>
  )
}
