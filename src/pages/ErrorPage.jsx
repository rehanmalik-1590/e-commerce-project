import { useRouteError, useNavigate } from 'react-router-dom'

export default function ErrorPage() {
  const error = useRouteError()
  const navigate = useNavigate()

  console.error('Router Error:', error)

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Oops!</h1>
      <p className="text-lg text-gray-600 mb-2">Sorry, an unexpected error has occurred.</p>
      <p className="text-red-500 italic mb-6">
        {error.statusText || error.message || 'Unknown error'}
      </p>
      <button 
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        onClick={() => navigate('/')}
      >
        Go Back Home
      </button>
    </div>
  )
}