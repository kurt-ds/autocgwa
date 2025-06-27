import React from 'react'

interface Subject {
  code: string
  description: string
  finalGrade: string | number
  units: number
  honorPoints?: number
}

interface ResultDisplayProps {
  cgwa: number | null
  subjects: Subject[]
}

export const ResultDisplay = ({ cgwa, subjects }: ResultDisplayProps) => {
  if (cgwa === null) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No CGWA data available</p>
      </div>
    )
  }

  // Check for failing grades or incomplete grades
  const hasFailingGrades = subjects.some(subject => {
    const grade = subject.finalGrade.toString().toUpperCase()
    return grade === 'F' || grade === 'R' || grade === 'DR' || grade === '0.0' || grade === '0'
  })

  // Determine Latin honors
  let latinHonor = ''
  let honorColor = ''
  let isGraduating = false

  if (!hasFailingGrades) {
    if (cgwa >= 3.75) {
      latinHonor = 'Summa Cum Laude'
      honorColor = 'text-yellow-600'
      isGraduating = true
    } else if (cgwa >= 3.5) {
      latinHonor = 'Magna Cum Laude'
      honorColor = 'text-gray-600'
      isGraduating = true
    } else if (cgwa >= 3.25) {
      latinHonor = 'Cum Laude'
      honorColor = 'text-amber-600'
      isGraduating = true
    }
  }

  return (
    <div className="mb-8">
      <div className="grid md:grid-cols-2 gap-8 mb-6">
        {/* Latin Honors */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4"> {latinHonor ? 'Your CGWA is qualified for...' : 'Unfortunately...'}</h2>
          {latinHonor ? (
            <div className="text-center">
              <div className={`text-4xl font-bold ${honorColor} mb-2`}>
                {latinHonor}
              </div>
              <p className="text-sm text-gray-500">
                If you are graduating, congratulations! If not, keep up the good work!
              </p>
            </div>
          ) : (
            <div className="text-center">
              <div className="text-2xl font-semibold text-gray-500 mb-2">
                No Latin Honors
              </div>
              <p className="text-gray-600">
                {hasFailingGrades 
                  ? 'Incomplete or failing grades prevent Latin honors eligibility.'
                  : 'Continue working hard to achieve Latin honors!'
                }
              </p>
            </div>
          )}
        </div>

        {/* CGWA */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your CGWA</h2>
          <div className="text-center">
            <div className="text-6xl font-bold text-green-600 mb-2">
              {cgwa.toFixed(2)}
            </div>
            <p className="text-gray-600">
              Cumulative Grade Weighted Average
            </p>
          </div>
        </div>
      </div>

      {/* Summary Message */}
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          📚 Academic Progress
        </h3>
        <p className="text-gray-600">
          You are making excellent progress in your academic journey. Keep up the great work!
        </p>
      </div>

      {/* Breakdown Note */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center">
          <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-blue-800 font-medium">
            Detailed breakdown and computation are shown below
          </p>
        </div>
      </div>
    </div>
  )
} 