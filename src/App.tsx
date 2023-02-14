import React, { useState, useMemo } from "react"
import clsx from "classnames"
import { BrowserRouter as Router } from "react-router-dom"
import { Banner } from "./components/general"
import AuthContext, { AuthStateValues } from "./contexts/AuthContext"
import Routes from "./Routes"
import {
  handleMobileNavDropdown,
  handleProfileDropdown,
} from "./utils/functions"
import ToastContext, { Toast } from "./contexts/ToastContext"
import ToastDisplay from "./components/general/ToastDisplay"

function App() {
  const [showBanner] = useState(true)
  const [authState, setAuthState] = useState<AuthStateValues>({
    isAuthenticated: false,
    user: null,
  })
  const [toast, setToast] = useState<Toast>(null)

  const value = useMemo(() => ({ authState, setAuthState }), [authState])
  const toastValue = useMemo(() => ({ toast, setToast }), [toast])

  return (
    <AuthContext.Provider value={value}>
      <ToastContext.Provider value={toastValue}>
        <Router>
          <ToastDisplay />
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
      </ToastContext.Provider>
    </AuthContext.Provider>
  )
}

export default App
