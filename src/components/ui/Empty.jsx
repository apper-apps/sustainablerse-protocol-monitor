import React from "react"
import ApperIcon from "@/components/ApperIcon"

const Empty = ({ 
  title = "No data available", 
  description = "Get started by adding your first item", 
  action,
  icon = "FileText",
  className = "" 
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-12 text-center ${className}`}>
      <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
        <ApperIcon name={icon} className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6 max-w-md">{description}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="inline-flex items-center px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-200 font-medium"
        >
          <ApperIcon name={action.icon || "Plus"} className="w-4 h-4 mr-2" />
          {action.label}
        </button>
      )}
    </div>
  )
}

export default Empty