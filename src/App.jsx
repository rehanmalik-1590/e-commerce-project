import { Outlet, useNavigation } from 'react-router-dom';
import Navigation from './pages/Auth/Navigation';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from './components/LoadingSpinner';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const navigation = useNavigation();

  return (
    <>
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
      <main className="py-3">
        {navigation.state === 'loading' ? (
          <LoadingSpinner />
        ) : (
          <Outlet />
        )}
      </main>
    </>
  );
}

export default App;