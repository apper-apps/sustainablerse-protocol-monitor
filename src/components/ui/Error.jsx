import React from "react"
import ApperIcon from "@/components/ApperIcon"

const Error = ({ message = "Something went wrong", onRetry, className = "" }) => {
  return (
    <div className={`flex flex-col items-center justify-center p-12 text-center ${className}`}>
      <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
        <ApperIcon name="AlertTriangle" className="w-8 h-8 text-red-600" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Oops! Something went wrong</h3>
      <p className="text-gray-600 mb-6 max-w-md">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-200"
        >
          <ApperIcon name="RefreshCw" className="w-4 h-4 mr-2" />
          Try Again
        </button>
      )}
    </div>
  )
}

export default Error