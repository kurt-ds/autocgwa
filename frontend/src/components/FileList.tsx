import React from 'react'

interface FileListProps {
  files: File[]
  onRemove: (index: number) => void
}

export const FileList = ({ files, onRemove }: FileListProps) => {
  if (files.length === 0) {
    return null
  }

  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium text-gray-700 mb-3 text-center">Uploaded Files</h3>
      <div className="flex justify-center">
        <div className="flex space-x-6 overflow-x-auto py-2 px-1 max-w-full scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-blue-50" style={{ minHeight: 140 }}>
          {files.map((file, index) => (
            <div
              key={index}
              className="relative flex flex-col items-center bg-white rounded-xl shadow-md border border-blue-100 min-w-[110px] max-w-[120px] mx-1 py-4 px-2"
            >
              {/* Delete button */}
              <button
                onClick={() => onRemove(index)}
                className="absolute top-2 right-2 text-gray-400 hover:text-red-500 z-10"
                aria-label="Remove file"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              {/* PDF Icon */}
              <svg className="w-10 h-10 text-red-500 mb-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8.828A2 2 0 0 0 19.414 7L15 2.586A2 2 0 0 0 13.586 2H6zm7 1.414L18.586 9H15a2 2 0 0 1-2-2V3.414zM8 14h1v-4H8v4zm3 0h1v-2h-1v2zm3 0h1v-3h-1v3z" />
              </svg>
              {/* File name */}
              <span className="text-xs text-center text-gray-700 max-w-[90px] mt-1 truncate block" title={file.name}>
                {file.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 