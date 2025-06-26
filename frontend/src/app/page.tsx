'use client'
import { useState } from 'react'
import { Hero } from '../components/Hero'
import { FileUploadZone } from '../components/FileUploadZone'
import { FileList } from '../components/FileList'
import { CalculateButton } from '../components/CalculateButton'
import { DisclaimerDialog } from '../components/DisclaimerDialog'
import { Footer } from '../components/Footer'

export default function Home() {
  const [files, setFiles] = useState<File[]>([])

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

  return (
    <>
      <DisclaimerDialog />
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <Hero />
          <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
            <FileUploadZone onFileUpload={handleFileUpload} />
            <FileList files={files} onRemove={removeFile} />
            <CalculateButton files={files} />
          </div>
        </div>
      </div>
      {/* CGWA Explanation Section */}
      <section className="max-w-5xl mx-auto px-4 py-12 mt-12">
        <div className="bg-white rounded-xl shadow-lg p-8 border border-blue-100">
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
      `}</style>
      <Footer />
    </>
  )
}
