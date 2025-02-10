// src/components/ui/spinner.tsx

import React from "react"

export const Spinner = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-6 h-6 border-4 border-t-transparent border-blue-500 border-solid rounded-full animate-spin" />
    </div>
  )
}
