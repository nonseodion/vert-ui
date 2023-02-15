import React, { useState } from "react"
import { ReactComponent as Exit } from "../../assets/icons/exit.svg"
import { Button, Loader, Modal } from "../general"
import { providers } from "../../dummy/providers"
import { doNothing } from "../../utils/functions"
import useModal from "../../hooks/useModal"

export default function ConnectWallet() {
  const { hideModal } = useModal()
  const [selectedProvider, setSelectedProvider] = useState<null | string>(null)
  return (
    <Modal bodyClassNames={selectedProvider ? "pt-[23px] pb-[30px]" : ""}>
      {selectedProvider ? (
        <div>
          <h3 className="text-black text-center text-[21px] font-semibold">
            Connecting wallet
          </h3>
          <div className="flex items-center justify-center mt-[52.5px]">
            <Loader className="w-[100px] h-[100px]" />
          </div>
          <p className="mt-[40px] mb-[35px] text-lightBlue leading-6 text-center">
            Communicating with wallet. Please, Sign message with your wallet
          </p>
          <div className="mx-[37px]">
            <Button
              fullWidth
              text="Disconnect"
              onClick={() => setSelectedProvider(null)}
            />
          </div>
        </div>
      ) : (
        <div>
          <button
            className="absolute top-4 right-[30px] border-none outline-none"
            type="button"
            onClick={hideModal}
          >
            <Exit />
          </button>
          <h3 className="text-black text-[22px] font-bold mb-[10.5px]">
            Connect Wallet
          </h3>
          <p className="text-lightBlue text-[13px] leading-[22px] mb-[30px]">
            If you don&apos;t have a wallet, you can select a provider and
            create one now.{" "}
            <a href="https://www.google.com" className="underline text-primary">
              Learn more
            </a>
          </p>
          <div className="flex flex-col space-y-[15px] mb-[30px]">
            {providers.map((provider) => (
              <button
                type="button"
                onClick={() => setSelectedProvider(provider.text)}
                className="border-primary border rounded-lg w-full h-12 px-4 flex space-x-3 items-center outline-none"
                key={provider.text}
              >
                <img
                  src={provider.icon}
                  alt={provider.text}
                  className="h-7 w-7"
                />
                <span className="text-black text-[15px] font-bold">
                  {provider.text}
                </span>
              </button>
            ))}
          </div>
          <Button text="Show more" onClick={doNothing} fullWidth />
          <p className="mt-7 text-lightBlue text-12">
            By connecting a wallet, you agree to Vert finance{" "}
            <a href="https://www.google.com" className="text-primary">
              Terms of Service
            </a>{" "}
            and consent to its{" "}
            <a href="https://www.google.com" className="text-primary">
              Privacy Policy.
            </a>
          </p>
        </div>
      )}
    </Modal>
  )
}
