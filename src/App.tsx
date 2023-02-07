import React, { useState, useMemo } from "react"
import { Footer, TopNav } from "./components/navigation"
import AuthContext from "./contexts/AuthContext"
import Routes from "./Routes"

function App() {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
  })

  const value = useMemo(() => ({ authState, setAuthState }), [authState])

  return (
    <AuthContext.Provider value={value}>
      <div className="bg-black min-h-screen">
        <div className="max-w-[1500px] mx-auto">
          <TopNav />
          <Routes />
          <Footer />
        </div>
      </div>
    </AuthContext.Provider>
  )
}

export default App
