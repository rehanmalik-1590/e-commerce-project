import { Outlet, useNavigation } from 'react-router-dom'
import Navigation from './pages/Auth/Navigation'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import LoadingSpinner from './components/LoadingSpinner'

function App() {
  const navigation = useNavigation()

  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer 
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Navigation />
      <main className="container mx-auto py-6 px-4">
        {navigation.state === 'loading' ? (
          <LoadingSpinner />
        ) : (
          <Outlet />
        )}
      </main>
    </div>
  )
}

export default App