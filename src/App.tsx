import React, { useState, useMemo } from "react"
import clsx from "classnames"
import { BrowserRouter as Router } from "react-router-dom"
import { SkeletonTheme } from "react-loading-skeleton"
import { Banner } from "./components/general"
import AuthContext, { AuthStateValues } from "./contexts/AuthContext"
import Routes from "./Routes"
import { hideAllHideables } from "./utils/functions"
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
        <ToastDisplay />
        <SkeletonTheme
          baseColor="#262626"
          highlightColor="rgba(229, 231, 235, .4)"
        >
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
                className={clsx("max-w-[1500px] mx-auto", {
                  "pt-7 md:pt-10": showBanner,
                })}
              >
                <Routes />
              </div>
            </div>
          </Router>
        </SkeletonTheme>
      </ModalContext.Provider>
    </AuthContext.Provider>
  )
}

export default App
