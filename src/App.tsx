import React, { useState, useMemo } from "react"
import clsx from "classnames"
import { WagmiConfig, useBlockNumber, useChainId } from "wagmi"
import { Provider as ReduxProvider } from "react-redux"
import { BrowserRouter as Router } from "react-router-dom"
import { SkeletonTheme } from "react-loading-skeleton"
import { Banner } from "./components/general"
import AuthContext, { AuthStateValues } from "./contexts/AuthContext"
import Routes from "./Routes"
import { store } from "./state/redux"
import { Updater } from "./utils/multicall"
import { client } from "./utils/config"
import { hideAllHideables } from "./utils/functions"
import ToastDisplay from "./components/general/ToastDisplay"
import ModalContext, { ActiveModals } from "./contexts/ModalContext"
import ConnectWallet from "./components/transactions/ConnectWallet"
import { ApproveTransactionModal, TokenModal } from "./components/transactions"

function Modals() {
  return (
    <>
      <ApproveTransactionModal />
      <TokenModal />
      <ConnectWallet />
    </>
  )
}

function MulticallUpdater() {
  const chainId = useChainId()
  const { data } = useBlockNumber()
  return <Updater chainId={chainId} blockNumber={data} blocksPerFetch={5} />
}

function App() {
  const [showBanner] = useState(true)
  const [authState, setAuthState] = useState<AuthStateValues>({
    isAuthenticated: false,
    user: null,
  })
  const [modals, setModals] = useState<ActiveModals>({})
  const value = useMemo(() => ({ authState, setAuthState }), [authState])
  const modalStateValue = useMemo(() => ({ modals, setModals }), [modals])

  return (
    <ReduxProvider store={store}>
      <AuthContext.Provider value={value}>
        <ModalContext.Provider value={modalStateValue}>
          <WagmiConfig client={client}>
            <MulticallUpdater />
            <ToastDisplay />
            <SkeletonTheme
              baseColor="#262626"
              highlightColor="rgba(229, 231, 235, .4)"
            >
              <Modals />
              <Router>
                <div
                  className="bg-black min-h-screen"
                  onClick={() => {
                    hideAllHideables()
                  }}
                  role="presentation"
                >
                  {showBanner && <Banner />}
                  <div
                    className={clsx({
                      "pt-7 md:pt-10": showBanner,
                    })}
                  >
                    <Routes />
                  </div>
                </div>
              </Router>
            </SkeletonTheme>
          </WagmiConfig>
        </ModalContext.Provider>
      </AuthContext.Provider>
    </ReduxProvider>
  )
}

export default App
