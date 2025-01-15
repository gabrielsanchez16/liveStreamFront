import { Route, Routes } from 'react-router'
import './App.css'
import Footer from './ui/view/footer/Footer'
import Register from './ui/view/Register/Register'
import Login from './ui/view/Login/Login'
import ProtectedRoute from './ui/components/Auth/protectedRoute/ProtectedRoute'
import LiveStream from './ui/view/LiveStream/LiveStream'

function App() {



  return (
    <>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Rutas protegidas */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <LiveStream />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </>
  )
}

export default App
