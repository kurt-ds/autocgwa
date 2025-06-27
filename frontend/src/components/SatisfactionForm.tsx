import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../lib/supabase'

interface SatisfactionFormProps {
  isVisible: boolean
  onHide?: () => void
}

export const SatisfactionForm = ({ isVisible, onHide }: SatisfactionFormProps) => {
  const router = useRouter()
  const [selectedOption, setSelectedOption] = useState<'satisfied' | 'revise' | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const handleSubmit = async (option: 'satisfied' | 'revise') => {
    setSelectedOption(option)
    setIsSubmitted(true)
    setIsSaving(true)
    
    try {
      // Save feedback to Supabase
      const { error } = await supabase
        .from('student_satisfaction')
        .insert([
          { 
            is_satisfied: option === 'satisfied'
          }
        ])
      
      if (error) {
        console.error('Error saving feedback:', error)
      }
    } catch (error) {
      console.error('Error saving feedback:', error)
    } finally {
      setIsSaving(false)
    }
    
    // Hide the form after 3 seconds
    setTimeout(() => {
      if (onHide) {
        onHide()
      }
    }, 3000)
    
    // Redirect if user wants to revise (after 2 seconds)
    if (option === 'revise') {
      setTimeout(() => {
        router.push('/')
      }, 2000)
    }
  }

  // Reset form state when visibility changes
  useEffect(() => {
    if (!isVisible) {
      setSelectedOption(null)
      setIsSubmitted(false)
      setIsSaving(false)
    }
  }, [isVisible])

  if (!isVisible) {
    return null
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
      <div className="bg-white rounded-xl shadow-2xl border border-gray-200 p-6 max-w-sm">
        {!isSubmitted ? (
          <>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Are you satisfied with your CGWA result?
            </h3>
            <div className="space-y-3">
              <button
                onClick={() => handleSubmit('satisfied')}
                disabled={isSaving}
                className="w-full bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {isSaving ? 'Saving...' : 'Yes, I\'m satisfied'}
              </button>
              <button
                onClick={() => handleSubmit('revise')}
                disabled={isSaving}
                className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                {isSaving ? 'Saving...' : 'No, I want to revise'}
              </button>
            </div>
          </>
        ) : (
          <div className="text-center">
            <div className="text-green-500 mb-2">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-gray-700 font-medium">
              {selectedOption === 'satisfied' 
                ? 'Thank you for your feedback!' 
                : 'Redirecting you to revise your grades...'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  )
} 