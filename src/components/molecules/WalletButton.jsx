import React, { useState } from "react"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"
import { toast } from "react-toastify"

const WalletButton = ({ className = "" }) => {
  const [connected, setConnected] = useState(false)
  const [connecting, setConnecting] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")

  const connectWallet = async () => {
    setConnecting(true)
    try {
      // Simulate wallet connection
      await new Promise(resolve => setTimeout(resolve, 2000))
      const mockAddress = "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM"
      setWalletAddress(mockAddress)
      setConnected(true)
      toast.success("Wallet connected successfully!")
    } catch (error) {
      toast.error("Failed to connect wallet")
    } finally {
      setConnecting(false)
    }
  }

  const disconnectWallet = () => {
    setConnected(false)
    setWalletAddress("")
    toast.info("Wallet disconnected")
  }

  if (connected) {
    return (
      <div className={`flex items-center space-x-3 ${className}`}>
        <div className="flex items-center space-x-2 bg-green-50 px-3 py-2 rounded-lg">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-green-700">
            {`${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`}
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={disconnectWallet}
          icon="LogOut"
          className="text-gray-600 hover:text-gray-800"
        >
          Disconnect
        </Button>
      </div>
    )
  }

  return (
    <Button
      onClick={connectWallet}
      loading={connecting}
      icon="Wallet"
      className={className}
    >
      Connect Wallet
    </Button>
  )
}

export default WalletButton