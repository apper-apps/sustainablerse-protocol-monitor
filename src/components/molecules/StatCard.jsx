import React from "react"
import Card from "@/components/atoms/Card"
import Badge from "@/components/atoms/Badge"
import ApperIcon from "@/components/ApperIcon"

const StatCard = ({ 
  title, 
  value, 
  change, 
  icon, 
  trend = "up",
  verified = false,
  className = "" 
}) => {
  const trendColor = trend === "up" ? "text-green-600" : trend === "down" ? "text-red-600" : "text-gray-600"
  const trendIcon = trend === "up" ? "TrendingUp" : trend === "down" ? "TrendingDown" : "Minus"

  return (
    <Card className={`p-6 hover ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <p className="text-sm font-medium text-gray-600">{title}</p>
            {verified && (
              <Badge variant="verified" size="sm" icon="CheckCircle">
                Verified
              </Badge>
            )}
          </div>
          <p className="text-2xl font-bold text-gray-900 gradient-text">{value}</p>
          {change && (
            <div className={`flex items-center mt-2 text-sm ${trendColor}`}>
              <ApperIcon name={trendIcon} className="w-4 h-4 mr-1" />
              <span>{change}</span>
            </div>
          )}
        </div>
        <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg">
          <ApperIcon name={icon} className="w-6 h-6 text-primary-600" />
        </div>
      </div>
    </Card>
  )
}

export default StatCard