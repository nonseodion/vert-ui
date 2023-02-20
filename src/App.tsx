import React, { useState, useMemo } from "react"
import clsx from "classnames"
import { WagmiConfig } from "wagmi"
import { BrowserRouter as Router } from "react-router-dom"
import { Banner } from "./components/general"
import AuthContext, { AuthStateValues } from "./contexts/AuthContext"
import Routes from "./Routes"

import { client } from "./utils/config"
import {
  handleMobileNavDropdown,
  handleProfileDropdown,
} from "./utils/functions"
import ToastDisplay from "./components/general/ToastDisplay"
import ModalContext, { ActiveModalsArrayValue } from "./contexts/ModalContext"

function App() {
  const [showBanner] = useState(true)
  const [authState, setAuthState] = useState<AuthStateValues>({
    isAuthenticated: false,
    user: null,
  })

  const [modals, setModals] = useState<ActiveModalsArrayValue[]>([])

  const value = useMemo(() => ({ authState, setAuthState }), [authState])
  const modalStateValue = useMemo(() => ({ modals, setModals }), [modals])

  return (
    <AuthContext.Provider value={value}>
      <ModalContext.Provider value={modalStateValue}>
        <WagmiConfig client={client}>
          <ToastDisplay />
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
  )
}

export default App
