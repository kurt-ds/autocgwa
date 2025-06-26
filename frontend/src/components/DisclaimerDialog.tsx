'use client'
import React, { useState, useEffect } from 'react'

export const DisclaimerDialog = () => {
  const [isVisible, setIsVisible] = useState(true)

  // Auto-close after 15 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 15000)

    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
  }

  if (!isVisible) {
    return null
  }

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-amber-50 border border-amber-200 shadow-lg rounded-lg max-w-2xl w-full mx-4 flex justify-center items-center">
      <div className="px-4 py-3 w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center flex-1">
            <svg className="w-5 h-5 text-amber-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <div className="text-left">
              <p className="text-amber-800 font-medium text-sm">
                <strong>Important Notice:</strong> This application is specifically designed for National University - Philippines grade format.
              </p>
              <p className="text-amber-700 text-xs mt-1">
                If you are from other universities or campuses, the auto-CGWA calculation may not work properly due to different grade formatting systems.
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="ml-4 text-amber-600 hover:text-amber-800 transition-colors flex-shrink-0"
            aria-label="Close disclaimer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
} 