import React, { useState, useMemo } from "react"
import clsx from "classnames"
import { BrowserRouter as Router } from "react-router-dom"
import { Banner } from "./components/general"
import AuthContext, { AuthStateValues } from "./contexts/AuthContext"
import Routes from "./Routes"
import { handleProfileDropdown } from "./utils/functions"

function App() {
  const [showBanner] = useState(true)
  const [authState, setAuthState] = useState<AuthStateValues>({
    isAuthenticated: false,
    user: null,
  })

  const value = useMemo(() => ({ authState, setAuthState }), [authState])

  return (
    <AuthContext.Provider value={value}>
      <Router>
        <div
          className="bg-black min-h-screen"
          onClick={() => handleProfileDropdown("hide")}
          role="presentation"
        >
          {showBanner && <Banner />}
          <div
            className={clsx("max-w-[1500px] mx-auto", { "pt-10": showBanner })}
          >
            <Routes />
          </div>
        </div>
      </Router>
    </AuthContext.Provider>
  )
}

export default App
