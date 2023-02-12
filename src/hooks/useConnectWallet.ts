import { useEffect, useState } from "react"
import { handleBodyScroll } from "../utils/functions"

export default function useConnectWallet() {
  const [showConnectWallet, setShowConnectWallet] = useState(false)

  useEffect(() => {
    handleBodyScroll(showConnectWallet ? "disable" : "enable")
  }, [showConnectWallet])

  return {
    visible: showConnectWallet,
    closeHandler: () => setShowConnectWallet(false),
    displayHandler: () => setShowConnectWallet(true),
  }
}
