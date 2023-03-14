import React, { useState, useMemo, useEffect } from "react"
import clsx from "classnames"
import { WagmiConfig } from "wagmi"
import { fetchBlockNumber } from "@wagmi/core"
import { Provider as ReduxProvider } from "react-redux"
import { BrowserRouter as Router } from "react-router-dom"
import { Banner } from "./components/general"
import AuthContext, { AuthStateValues } from "./contexts/AuthContext"
import Routes from "./Routes"
import { store } from "./state/redux"
import { Updater as MulticallUpdater } from "./utils/multicall"
import { activeChainId, client } from "./utils/config"
import {
  handleMobileNavDropdown,
  handleProfileDropdown,
} from "./utils/functions"
import ToastDisplay from "./components/general/ToastDisplay"
import ModalContext, { ActiveModalsArrayValue } from "./contexts/ModalContext"
import ConnectWallet from "./components/transactions/ConnectWallet"

function App() {
  const [showBanner] = useState(true)
  const [blkNum, setBlkNum] = useState<undefined | number>()
  const [authState, setAuthState] = useState<AuthStateValues>({
    isAuthenticated: false,
    user: null,
  })

  const [modals, setModals] = useState<ActiveModalsArrayValue[]>([])
  const value = useMemo(() => ({ authState, setAuthState }), [authState])
  const modalStateValue = useMemo(() => ({ modals, setModals }), [modals])

  // get block number for Redux Multicall
  useEffect(() => {
    ;(async () => {
      const no = await fetchBlockNumber({ chainId: activeChainId })
      setBlkNum(no)
    })()
  }, [])

  return (
    <ReduxProvider store={store}>
      <AuthContext.Provider value={value}>
        <ModalContext.Provider value={modalStateValue}>
          <WagmiConfig client={client}>
            <MulticallUpdater
              chainId={activeChainId}
              blockNumber={blkNum}
              blocksPerFetch={6}
            />
            <ToastDisplay />
            <ConnectWallet />
            <Router>
              <div
                className="bg-black min-h-screen"
                onClick={() => {
                  handleProfileDropdown("hide")
                  handleMobileNavDropdown("hide")
                }}
                role="presentation"
              >
                {showBanner && <Banner />}
                <div
                  className={clsx("max-w-[1500px] mx-auto", {
                    "pt-7 md:pt-10": showBanner,
                  })}
                >
                  <Routes />
                </div>
              </div>
            </Router>
          </WagmiConfig>
        </ModalContext.Provider>
      </AuthContext.Provider>
    </ReduxProvider>
  )
}

export default App
