import React, { useState, useMemo } from "react"
import clsx from "classnames"
import { BrowserRouter as Router } from "react-router-dom"
import { Banner } from "./components/general"
import { Footer, TopNav } from "./components/navigation"
import AuthContext from "./contexts/AuthContext"
import Routes from "./Routes"

function App() {
  const [showBanner] = useState(true)
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
  })

  const value = useMemo(() => ({ authState, setAuthState }), [authState])

  return (
    <AuthContext.Provider value={value}>
      <Router>
        <div className="bg-black min-h-screen">
          {showBanner && <Banner />}
          <div
            className={clsx("max-w-[1500px] mx-auto", { "pt-10": showBanner })}
          >
            <TopNav />
            <Routes />
            <Footer />
          </div>
        </div>
      </Router>
    </AuthContext.Provider>
  )
}

export default App
