'use client'
import { useState } from 'react'

export default function UploadForm() {
  const [cgwa, setCgwa] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      // Validate that all files are PDFs
      const nonPdfFiles = Array.from(files).filter(file => file.type !== 'application/pdf')
      
      if (nonPdfFiles.length > 0) {
        setError(`Please select only PDF files. Invalid files: ${nonPdfFiles.map(f => f.name).join(', ')}`)
        setSelectedFiles(null)
        setCgwa(null)
        return
      }
      
      setSelectedFiles(files)
      setError(null)
      setCgwa(null)
    }
  }

  const handleUpload = async () => {
    if (!selectedFiles || selectedFiles.length === 0) {
      setError('Please select PDF files first')
      return
    }
    setLoading(true)
    setError(null)
    try {
      const formData = new FormData()
      Array.from(selectedFiles).forEach(file => formData.append('files', file))
      const res = await fetch('http://localhost:8000/upload', {
        method: 'POST',
        body: formData
      })
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }
      const data = await res.json()
      setCgwa(data.cgwa)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload files')
      setCgwa(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="file-upload">
          Select PDF files
        </label>
        <input
          id="file-upload"
          type="file"
          multiple
          accept=".pdf,application/pdf"
          onChange={handleFileSelect}
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <p className="mt-1 text-xs text-gray-500">
          Only PDF files are accepted
        </p>
        {selectedFiles && (
          <div className="mt-2">
            <p className="text-xs text-gray-500">Selected PDF files: {selectedFiles.length}</p>
            <ul className="list-disc pl-5 text-xs text-gray-500">
              {Array.from(selectedFiles).map((file, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span>{file.name}</span>
                  <span className="text-green-600">✓ PDF</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <button
        onClick={handleUpload}
        disabled={!selectedFiles || selectedFiles.length === 0 || loading}
        className={`w-full py-2 px-4 rounded-lg text-white font-semibold transition-colors duration-200
          ${loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'}
          disabled:opacity-60`}
      >
        {loading ? 'Calculating CGWA...' : 'Calculate CGWA'}
      </button>
      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg border border-red-200 text-sm">
          Error: {error}
        </div>
      )}
      {cgwa !== null && (
        <div className="mt-6 p-4 bg-green-100 text-green-800 rounded-lg border border-green-200 text-center">
          <h3 className="text-lg font-bold">Your CGWA: <span className="text-2xl">{cgwa}</span></h3>
        </div>
      )}
    </div>
  )
} 