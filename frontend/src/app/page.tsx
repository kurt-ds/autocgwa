import UploadForm from '../components/UploadForm'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4 font-sans">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-4">CGWA Checker</h1>
        <p className="text-center text-gray-600 mb-8 text-lg">
          Upload your academic files to calculate your <span className="font-semibold">Cumulative Grade Weighted Average (CGWA)</span>.
        </p>
        <UploadForm />
      </div>
    </main>
  )
}
