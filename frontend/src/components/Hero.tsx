import React from 'react'

export const Hero = () => {
  return (
    <div className="text-center">
      <div className="flex items-center justify-center">
        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        </div>
        <h1 className="ml-3 text-4xl font-bold text-gray-800">AutoCGWA</h1>
      </div>
      <p className="mt-4 text-xl text-gray-600">
        Automatically calculate your Cumulative Grade Weighted Average from your
        grade PDFs
      </p>
      <div className="mt-6 text-gray-500 flex justify-center space-x-6">
        <div className="flex items-center">
          <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm mr-2">
            1
          </span>
          <span>Upload your grade PDFs</span>
        </div>
        <div className="flex items-center">
          <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm mr-2">
            2
          </span>
          <span>Click calculate</span>
        </div>
        <div className="flex items-center">
          <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm mr-2">
            3
          </span>
          <span>Get your CGWA instantly</span>
        </div>
      </div>
    </div>
  )
} 