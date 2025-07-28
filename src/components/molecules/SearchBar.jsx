import React, { useState } from "react"
import Input from "@/components/atoms/Input"
import ApperIcon from "@/components/ApperIcon"

const SearchBar = ({ 
  placeholder = "Search...", 
  onSearch, 
  className = "",
  value: controlledValue,
  onChange: controlledOnChange 
}) => {
  const [internalValue, setInternalValue] = useState("")
  
  const isControlled = controlledValue !== undefined
  const value = isControlled ? controlledValue : internalValue
  
  const handleChange = (e) => {
    const newValue = e.target.value
    if (isControlled) {
      controlledOnChange?.(e)
    } else {
      setInternalValue(newValue)
    }
    onSearch?.(newValue)
  }

  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <ApperIcon name="Search" className="h-4 w-4 text-gray-400" />
      </div>
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className="pl-10 pr-4"
      />
      {value && (
        <button
          onClick={() => {
            if (isControlled) {
              controlledOnChange?.({ target: { value: "" } })
            } else {
              setInternalValue("")
            }
            onSearch?.("")
          }}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
        >
          <ApperIcon name="X" className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}

export default SearchBar