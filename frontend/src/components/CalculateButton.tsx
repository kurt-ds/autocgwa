import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

interface CalculateButtonProps {
  files: File[]
}

export const CalculateButton = ({ files }: CalculateButtonProps) => {
  const [isCalculating, setIsCalculating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleCalculate = async () => {
    if (files.length === 0) {
      setError('Please upload at least one PDF file')
      return
    }

    setIsCalculating(true)
    setError(null)

    try {
      const formData = new FormData()
      files.forEach(file => formData.append('files', file))
      
      const res = await fetch('http://localhost:8000/upload', {
        method: 'POST',
        body: formData
      })

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }

      const data = await res.json()
      console.log('Backend response:', data) // Debug log
      
      // Check if subjects data exists
      if (!data.subjects || !Array.isArray(data.subjects)) {
        console.warn('No subjects data received from backend')
        // Create a fallback subjects array if none provided
        const fallbackSubjects = []
        if (data.grades && Array.isArray(data.grades)) {
          // Convert old format to new format
          data.grades.forEach((grade: any) => {
            const honorPoints = grade.grade_type === 'numeric' ? grade.final_grade * grade.units : 0
            fallbackSubjects.push({
              code: grade.subject_code,
              description: grade.subject_desc,
              finalGrade: grade.final_grade,
              units: grade.units,
              honorPoints: honorPoints
            })
          })
        }
        data.subjects = fallbackSubjects
      }
      
      // Prepare the subjects data for URL parameters
      const subjectsParam = encodeURIComponent(JSON.stringify(data.subjects || []))
      
      // Redirect to results page with data
      router.push(`/result?cgwa=${data.cgwa}&subjects=${subjectsParam}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to calculate CGWA')
    } finally {
      setIsCalculating(false)
    }
  }

  return (
    <div className="mt-8">
      <div className="flex justify-center">
        <button
          onClick={handleCalculate}
          disabled={isCalculating || files.length === 0}
          className={`px-8 py-3 rounded-md text-white font-medium text-lg flex items-center ${
            files.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          } transition-colors`}
        >
          {isCalculating ? (
            <>
              <div className="animate-spin h-5 w-5 mr-3 border-2 border-white border-t-transparent rounded-full"></div>
              Calculating...
            </>
          ) : (
            <>
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              Calculate CGWA
            </>
          )}
        </button>
      </div>
      
      {error && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
          <svg className="w-6 h-6 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-red-800">{error}</span>
        </div>
      )}
    </div>
  )
} 