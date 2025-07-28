import React, { forwardRef } from "react"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const Badge = forwardRef(({ 
  className, 
  variant = "default",
  size = "default",
  icon,
  children,
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center font-medium rounded-full transition-colors duration-200"
  
  const variants = {
    default: "bg-gray-100 text-gray-800",
    primary: "bg-primary-100 text-primary-800",
    secondary: "bg-secondary-100 text-secondary-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    danger: "bg-red-100 text-red-800",
    verified: "verification-badge text-white shadow-verification"
  }
  
  const sizes = {
    sm: "px-2 py-1 text-xs",
    default: "px-2.5 py-1.5 text-sm",
    lg: "px-3 py-2 text-base"
  }

  return (
    <span
      ref={ref}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {icon && (
        <ApperIcon name={icon} className="w-3 h-3 mr-1" />
      )}
      {children}
    </span>
  )
})

Badge.displayName = "Badge"

export default Badge