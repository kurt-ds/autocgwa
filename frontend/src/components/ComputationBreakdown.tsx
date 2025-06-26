import React from 'react'

interface ComputationBreakdownProps {
  totalHonorPoints: number
  totalUnits: number
  cgwa: number | null
}

export const ComputationBreakdown = ({ totalHonorPoints, totalUnits, cgwa }: ComputationBreakdownProps) => {
  if (cgwa === null) {
    return null
  }

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">CGWA Computation</h2>
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <div className="space-y-4">

          {/* Totals */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="text-lg font-semibold text-blue-800 mb-2">Total Honor Points</h4>
              <div className="text-3xl font-bold text-blue-600">
                {totalHonorPoints.toFixed(2)}
              </div>
              <p className="text-blue-700 text-sm mt-1">
                Sum of all (Units × Final Grade)
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="text-lg font-semibold text-green-800 mb-2">Total Units</h4>
              <div className="text-3xl font-bold text-green-600">
                {totalUnits.toFixed(2)}
              </div>
              <p className="text-green-700 text-sm mt-1">
                Sum of all subject units
              </p>
            </div>
          </div>

          {/* Calculation */}
          <div className="bg-white border border-gray-300 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Calculation</h4>
            <div className="flex flex-col items-center font-mono text-lg">
              <div className="flex items-center mt-2">
                <span className="inline-block text-xl font-mono mr-4">
                  <span className="flex flex-col items-center">
                    <span className="text-blue-700">{totalHonorPoints.toFixed(2)}</span>
                    <span className="w-20 border-t-2 border-gray-500 my-1"></span>
                    <span className="text-green-700">{totalUnits.toFixed(2)}</span>
                  </span>
                </span>
                <span className="text-2xl font-bold text-purple-600 ml-4">= {cgwa.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Latin Honors Criteria */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="text-lg font-semibold text-yellow-800 mb-2">Latin Honors Criteria</h4>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="font-bold text-yellow-600">Summa Cum Laude</div>
                <div className="text-yellow-700">CGWA ≥ 3.75</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-gray-600">Magna Cum Laude</div>
                <div className="text-gray-700">CGWA ≥ 3.50</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-amber-600">Cum Laude</div>
                <div className="text-amber-700">CGWA ≥ 3.25</div>
              </div>
            </div>
            <div className="mt-3 text-xs text-yellow-700 text-center">
              Note: Students with F, R, DR, or 0.0 grades are not eligible for Latin honors
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 