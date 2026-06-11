'use client'
import { useRouter } from 'next/navigation'
import { useResult } from '../../context/ResultContext'
import { Hero } from '../../components/Hero'
import { ResultDisplay } from '../../components/ResultDisplay'
import { SubjectTable } from '../../components/SubjectTable'
import { ComputationBreakdown } from '../../components/ComputationBreakdown'
import { Footer } from '../../components/Footer'
import { useRef } from 'react'

export default function ResultPage() {
  const router = useRouter()
  const { cgwa, subjects } = useResult()
  const parsedSubjects = subjects || []
  const cgwaValue = cgwa
  const totalHonorPoints = parsedSubjects.reduce((sum, subject) => sum + (subject.honorPoints || 0), 0)
  const totalUnits = parsedSubjects.reduce((sum, subject) => sum + (subject.units || 0), 0)
  
  const computationRef = useRef<HTMLDivElement>(null)

  // Check if there are subjects available
  const hasGrades = parsedSubjects.length > 0 && cgwaValue !== null

  return (
    <div className={`${hasGrades ? 'min-h-screen' : 'h-screen'} bg-gradient-to-b from-blue-50 to-white flex flex-col`}>
      <div className="flex-1 max-w-6xl mx-auto px-4 py-12">
        {/* Back to Home Button */}
        <div className="mb-6">
          <button
            onClick={() => router.push('/')}
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </button>
        </div>

        <Hero />
        
        {hasGrades ? (
          <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
            <ResultDisplay cgwa={cgwaValue} subjects={parsedSubjects} />
            <SubjectTable subjects={parsedSubjects} />
            <div ref={computationRef}>
              <ComputationBreakdown 
                totalHonorPoints={totalHonorPoints}
                totalUnits={totalUnits}
                cgwa={cgwaValue}
              />
            </div>
          </div>
        ) : (
          <div className="mt-20 flex-1 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">No Data Available</h2>
              <p className="text-gray-600 mb-6">Please upload your grades to see your CGWA calculation.</p>
              <button
                onClick={() => router.push('/')}
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                Go Back to Upload
              </button>
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  )
} 