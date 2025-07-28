import React from "react"
import Button from "@/components/atoms/Button"
import WalletButton from "@/components/molecules/WalletButton"
import ApperIcon from "@/components/ApperIcon"

const Header = ({ onMenuClick, className = "" }) => {
  return (
    <header className={`bg-white border-b border-gray-200 px-6 py-4 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuClick}
            className="lg:hidden"
            icon="Menu"
          />
          <div className="hidden sm:block">
            <h2 className="text-lg font-semibold text-gray-900">Sustainability Dashboard</h2>
            <p className="text-sm text-gray-600">Monitor and verify your ESG impact</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            icon="Bell"
            className="relative"
          >
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </Button>
          
          <WalletButton />
        </div>
      </div>
    </header>
  )
}

export default Header