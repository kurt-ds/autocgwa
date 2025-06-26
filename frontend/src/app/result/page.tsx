'use client'
import { useRouter } from 'next/navigation'
import { useResult } from '../../context/ResultContext'
import { Hero } from '../../components/Hero'
import { ResultDisplay } from '../../components/ResultDisplay'
import { SubjectTable } from '../../components/SubjectTable'
import { ComputationBreakdown } from '../../components/ComputationBreakdown'
import { Footer } from '../../components/Footer'  

export default function ResultPage() {
  const router = useRouter()
  const { cgwa, subjects } = useResult()
  const parsedSubjects = subjects || []
  const cgwaValue = cgwa
  const totalHonorPoints = parsedSubjects.reduce((sum, subject) => sum + (subject.honorPoints || 0), 0)
  const totalUnits = parsedSubjects.reduce((sum, subject) => sum + (subject.units || 0), 0)

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
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
        
        <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
          <ResultDisplay cgwa={cgwaValue} subjects={parsedSubjects} />
          <SubjectTable subjects={parsedSubjects} />
          <ComputationBreakdown 
            totalHonorPoints={totalHonorPoints}
            totalUnits={totalUnits}
            cgwa={cgwaValue}
          />
        </div>
      </div>
      <Footer />
      </div>
  )
} 