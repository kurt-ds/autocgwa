'use client'
import { useState, useEffect } from 'react'
import { Hero } from '../components/Hero'
import { FileUploadZone } from '../components/FileUploadZone'
import { FileList } from '../components/FileList'
import { CalculateButton } from '../components/CalculateButton'
import { DisclaimerDialog } from '../components/DisclaimerDialog'
import { Footer } from '../components/Footer'
import { supabase } from '../lib/supabase'

export default function Home() {
  const [files, setFiles] = useState<File[]>([])
  const [studentsHelped, setStudentsHelped] = useState<number>(0)
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const [animatedCount, setAnimatedCount] = useState(0);

  const handleFileUpload = (newFiles: FileList | null) => {
    if (!newFiles) return
    
    // Validate that all files are PDFs
    const fileArray = Array.from(newFiles)
    const nonPdfFiles = fileArray.filter(file => file.type !== 'application/pdf')
    
    if (nonPdfFiles.length > 0) {
      alert(`Please select only PDF files. Invalid files: ${nonPdfFiles.map(f => f.name).join(', ')}`)
      return
    }
    
    setFiles((prevFiles) => [...prevFiles, ...fileArray])
  }

  const removeFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index))
  }

  useEffect(() => {
    if (files.length > 0) {
      setShowDisclaimer(false);
    } else {
      setShowDisclaimer(true);
    }
  }, [files]);

  useEffect(() => {
    // Fetch count of satisfied students from Supabase
    const fetchStudentsHelped = async () => {
      const { count, error } = await supabase
        .from('student_satisfaction')
        .select('*', { count: 'exact', head: true })
        .eq('is_satisfied', true)
      if (!error && typeof count === 'number') {
        setStudentsHelped(count)
      }
    }
    fetchStudentsHelped()
  }, [])

  useEffect(() => {
    let start = 0;
    const end = studentsHelped;
    if (start === end) return;

    let current = start;
    const duration = 800; // ms
    const increment = end > 100 ? Math.ceil(end / 100) : 1;
    const stepTime = Math.max(Math.floor(duration / end), 10);

    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        current = end;
        clearInterval(timer);
      }
      setAnimatedCount(current);
    }, stepTime);

    return () => clearInterval(timer);
  }, [studentsHelped]);

  const displayedCount = studentsHelped;

  return (
    <>
      <DisclaimerDialog />
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white animate-fade-in-up">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <Hero />
          <div className="mt-12 bg-white rounded-xl shadow-lg p-0 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-0 md:gap-8 items-stretch">
              {/* File Upload Area - left (60%) */}
              <div className="col-span-1 md:col-span-3 flex flex-col items-center justify-center p-6">
                <FileUploadZone onFileUpload={handleFileUpload} />
                <div className="w-full max-w-[350px] md:max-w-[400px]">
                  <FileList files={files} onRemove={removeFile} />
                </div>
                {/* Dismissible Disclaimer */}
                {showDisclaimer && (
                  <div className="relative mt-6 max-w-[400px] mx-auto bg-blue-50 border border-blue-200 text-blue-800 rounded-lg px-4 py-3 flex items-center shadow-md animate-fade-in">
                    <svg className="w-5 h-5 mr-2 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="flex-1 text-sm">We do <b>not</b> store any of your uploaded files or data. All processing is done securely and privately.</span>
                    <button onClick={() => setShowDisclaimer(false)} className="ml-3 text-blue-400 hover:text-blue-700 transition-colors" aria-label="Dismiss disclaimer">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                )}
                <CalculateButton files={files} />
              </div>
              {/* Stat Counter Card - right (40%) */}
              <div className="col-span-1 md:col-span-2 flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 to-blue-400 rounded-2xl shadow-lg p-8 md:ml-0">
                <span className="text-5xl font-extrabold text-white mb-2">{animatedCount.toLocaleString()}</span>
                <span className="text-lg font-semibold text-white">Students Helped</span>
                <span className="text-base text-blue-100 mt-2">and counting!</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* CGWA Explanation Section */}
      <section className="max-w-5xl mx-auto px-4 py-12 mt-12">
        <div className="bg-white rounded-xl shadow-lg p-8 border border-blue-100 animate-fade-in-up">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-4 flex items-center">
            <svg className="w-7 h-7 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            How is CGWA Calculated?
          </h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
            <li>Multiply the credit units for each course by the corresponding final grade earned. The result is the Honor Points (H) for the course.</li>
            <li>Get the sum of all honor points earned.</li>
            <li>Divide the total honor points by the total number of credit units for the courses taken. The quotient is the CGWA.</li>
            <li>Indices are computed to four decimal places and rounded off to two.</li>
          </ul>
          <div className="mb-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 inline-block">
              <span className="text-lg md:text-xl font-mono text-blue-700 font-semibold">CGWA = (H₁ + H₂ + ... + Hₙ) / (U₁ + U₂ + ... + Uₙ)</span>
            </div>
            <div className="text-gray-600 mt-2 text-sm md:text-base">
              <span className="font-mono font-semibold">H</span> = Honor Points (Units × Final Grade), <span className="font-mono font-semibold">U</span> = Units
            </div>
          </div>
          <div className="mb-2">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">Example Calculation</h3>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="mb-2 text-gray-700">
                <span className="font-semibold">Suppose you have the following subjects:</span>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Subject 1: 3 units, Final Grade: 3.50</li>
                  <li>Subject 2: 2 units, Final Grade: 3.00</li>
                  <li>Subject 3: 4 units, Final Grade: 2.75</li>
                </ul>
              </div>
              <div className="mb-2 text-gray-700">
                <span className="font-semibold">Step 1:</span> Calculate Honor Points for each subject.<br/>
                <span className="ml-4">H₁ = 3 × 3.50 = 10.50</span><br/>
                <span className="ml-4">H₂ = 2 × 3.00 = 6.00</span><br/>
                <span className="ml-4">H₃ = 4 × 2.75 = 11.00</span>
              </div>
              <div className="mb-2 text-gray-700">
                <span className="font-semibold">Step 2:</span> Sum the honor points and units.<br/>
                <span className="ml-4">Total Honor Points = 10.50 + 6.00 + 11.00 = 27.50</span><br/>
                <span className="ml-4">Total Units = 3 + 2 + 4 = 9</span>
              </div>
              <div className="mb-2 text-gray-700">
                <span className="font-semibold">Step 3:</span> Compute CGWA.<br/>
                <span className="ml-4">CGWA = 27.50 / 9 = <span className="font-bold text-blue-700">3.06</span></span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <style jsx global>{`
        body {
          background: linear-gradient(to bottom, #e0f2fe 0%, #f0f9ff 100%);
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: none; }
        }
        .animate-fade-in { animation: fade-in 0.5s ease; }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.7s cubic-bezier(0.4, 0, 0.2, 1) both;
        }
      `}</style>
      <Footer />
    </>
  )
}
