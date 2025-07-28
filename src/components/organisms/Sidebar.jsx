import React from "react"
import { NavLink, useLocation } from "react-router-dom"
import ApperIcon from "@/components/ApperIcon"
import { cn } from "@/utils/cn"

const Sidebar = ({ isOpen, onClose, className = "" }) => {
  const location = useLocation()

  const navigation = [
    { name: "Dashboard", href: "/", icon: "LayoutDashboard" },
    { name: "ESG Reports", href: "/reports", icon: "FileText" },
    { name: "Marketplace", href: "/marketplace", icon: "Store" },
    { name: "Supply Chain", href: "/supply-chain", icon: "Truck" },
    { name: "Analytics", href: "/analytics", icon: "BarChart3" },
    { name: "Settings", href: "/settings", icon: "Settings" }
  ]

  const SidebarContent = () => (
    <>
      <div className="flex items-center justify-between p-6 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg">
            <ApperIcon name="Leaf" className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold font-display gradient-text">Sustainablerse</h1>
            <p className="text-xs text-gray-500">ESG Platform</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="lg:hidden p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors duration-200"
        >
          <ApperIcon name="X" className="w-5 h-5" />
        </button>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href
          return (
            <NavLink
              key={item.name}
              to={item.href}
              onClick={onClose}
              className={cn(
                "flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 hover:scale-[1.02]",
                isActive
                  ? "bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-md"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              <ApperIcon name={item.icon} className="w-5 h-5" />
              <span>{item.name}</span>
            </NavLink>
          )
        })}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-4">
          <div className="flex items-center space-x-3 mb-2">
            <ApperIcon name="Shield" className="w-5 h-5 text-primary-600" />
            <span className="text-sm font-medium text-primary-800">Blockchain Verified</span>
          </div>
          <p className="text-xs text-primary-600">
            All reports are cryptographically verified on Solana blockchain
          </p>
        </div>
      </div>
    </>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={cn("hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-white border-r border-gray-200 shadow-sm", className)}>
        <SidebarContent />
      </div>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
          <div className="relative flex flex-col w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
            <SidebarContent />
          </div>
        </div>
      )}
    </>
  )
}

export default Sidebar