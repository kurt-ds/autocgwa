import React from 'react'

interface Subject {
  code: string
  description: string
  finalGrade: string | number
  units: number
  honorPoints?: number
}

interface SubjectTableProps {
  subjects: Subject[]
}

export const SubjectTable = ({ subjects }: SubjectTableProps) => {
  if (!subjects || subjects.length === 0) {
    return (
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Subject Breakdown</h2>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
          <p className="text-gray-600">No subject data available</p>
        </div>
      </div>
    )
  }

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Subject Breakdown</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">
                Subject Code
              </th>
              <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">
                Description
              </th>
              <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-700">
                Final Grade
              </th>
              <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-700">
                Units
              </th>
              <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-700">
                Honor Points
              </th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject, index) => {
              const grade = subject.finalGrade.toString()
              const isFailingGrade = ['F', 'R', 'DR', '0.0', '0'].includes(grade.toUpperCase())
              
              return (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="border border-gray-300 px-4 py-3 text-gray-800 font-medium">
                    {subject.code}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-gray-700">
                    {subject.description}
                  </td>
                  <td className={`border border-gray-300 px-4 py-3 text-center font-semibold ${
                    isFailingGrade ? 'text-red-600' : 'text-gray-800'
                  }`}>
                    {grade}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-center text-gray-700">
                    {subject.units}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-800">
                    {subject.honorPoints?.toFixed(2) || '0.00'}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
} 