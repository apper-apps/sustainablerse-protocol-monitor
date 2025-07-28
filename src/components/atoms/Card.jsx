import React, { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Card = forwardRef(({ 
  className, 
  children,
  hover = false,
  gradient = false,
  ...props 
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-lg bg-white shadow-card border border-gray-100 transition-all duration-200",
        hover && "hover:shadow-card-hover hover:scale-[1.02]",
        gradient && "bg-gradient-to-br from-white to-gray-50",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})

Card.displayName = "Card"

export default Card