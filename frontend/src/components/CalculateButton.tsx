import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useResult } from '../context/ResultContext'

interface CalculateButtonProps {
  files: File[]
}

export const CalculateButton = ({ files }: CalculateButtonProps) => {
  const [isCalculating, setIsCalculating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { setResult } = useResult()

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
        const fallbackSubjects: any[] = []
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
      
      // Store result in context and navigate to /result
      setResult({
        cgwa: data.cgwa,
        subjects: data.subjects || []
      })
      router.push('/result')
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
          className={`px-8 py-3 rounded-lg text-white font-semibold text-lg flex items-center shadow-md transition-all duration-200
            ${files.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200'}
          `}
        >
          {isCalculating ? (
            <>
              <div className="animate-spin h-5 w-5 mr-3 border-2 border-white border-t-transparent rounded-full"></div>
              Calculating...
            </>
          ) : (
            <>
              <span className="text-2xl mr-2">📊</span>
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