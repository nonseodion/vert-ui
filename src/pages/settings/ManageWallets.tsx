import React, { useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import { Button, Copy, Wrapper } from "../../components/general"
import { Navigator } from "../../components/navigation"
import { SettingsContent, UnlinkWalletModal } from "../../components/settings"
import { WalletListSkeleton } from "../../components/skeletons"
import { userWallets } from "../../dummy/currencies"
import { useModal } from "../../hooks"
import { Modals } from "../../utils/constants"

export default function ManageWallets() {
  const { showModal, hideModal } = useModal()
  const [loading, setLoading] = useState<boolean>(true)
  const [wallets, setWallets] = useState(userWallets)
  const [walletToUnlink, setWalletToUnlink] = useState<string | null>(null)
  const [unlinkingWallet, setUnlinkingWallet] = useState<boolean>(false)

  const unlinkWallet = () => {
    setUnlinkingWallet(true)
    setTimeout(() => {
      setWallets(wallets.filter((wallet) => wallet.address !== walletToUnlink))
      setUnlinkingWallet(false)
      setWalletToUnlink(null)
      toast("Wallet unlinked successfully")
      hideModal()
    }, 3000)
  }

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 3000)
  }, [])

  return (
    <Wrapper>
      <UnlinkWalletModal unlinking={unlinkingWallet} />
      <div className="px-4 pt-5 lg:pt-9 lg:px-[80px] flex flex-col space-y-[50px] lg:flex-row lg:space-y-20 lg:space-x-[77px]">
        <Navigator />
        <SettingsContent title="Manage Wallets">
          <div className="mb-[85px]">
            {loading ? (
              <WalletListSkeleton />
            ) : (
              <div className="w-full flex flex-col space-y-[30px]">
                {wallets.length > 0 && (
                  <h3 className="font-semibold text-white text-base leading-[29px] md:text-xl md:leading-[27px]">
                    Linked Wallets: {wallets.length}
                  </h3>
                )}
                <div className="flex flex-col space-y-[14px]">
                  {wallets.map((wallet) => (
                    <div
                      key={wallet.address}
                      className="bg-white rounded-xl h-[83px] flex items-center justify-between px-[20.85px]"
                    >
                      <div className="flex space-x-3 items-center">
                        {wallet.icon && (
                          <div className="flex items-center justify-center h-7 w-7 bg-[#FFD3A2] rounded-full">
                            <img
                              src={wallet.icon}
                              alt={wallet.address}
                              className="h-4 w-4"
                            />
                          </div>
                        )}
                        <div className="flex flex-col space-y-[9.5px]">
                          <div className="flex items-center space-x-[3.68px]">
                            <span className="font-medium text-base text-black underline">
                              {wallet.address}
                            </span>
                            <Copy text={wallet.address} />
                          </div>
                          {wallet.is_connected && (
                            <div className="flex space-x-1 items-center">
                              <div className="h-[9px] w-[9px] rounded-full bg-primary" />
                              <span className="text-black text-[11.13px]">
                                connected
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      <Button
                        text="Unlink"
                        onClick={() =>
                          showModal({
                            modal: Modals.UNLINK_WALLET,
                            onConfirm: unlinkWallet,
                          })
                        }
                        bordered
                        background="transparent"
                        className="border-dark h-10 !py-0 text-[#010304] font-semibold text-sm"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </SettingsContent>
      </div>
    </Wrapper>
  )
}
