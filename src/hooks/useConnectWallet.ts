import { useEffect, useState } from "react"

export default function useConnectWallet() {
  const [showConnectWallet, setShowConnectWallet] = useState(false)

  useEffect(() => {
    if (showConnectWallet) {
      document.body.style.overflowY = "hidden"
    } else {
      document.body.style.overflowY = "visible"
    }
  }, [showConnectWallet])

  return {
    visible: showConnectWallet,
    closeHandler: () => setShowConnectWallet(false),
    displayHandler: () => setShowConnectWallet(true),
  }
}
