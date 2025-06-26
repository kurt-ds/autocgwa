'use client'
import { useState } from 'react'
import { Hero } from '../components/Hero'
import { FileUploadZone } from '../components/FileUploadZone'
import { FileList } from '../components/FileList'
import { CalculateButton } from '../components/CalculateButton'
import { DisclaimerDialog } from '../components/DisclaimerDialog'

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
    </>
  )
}
