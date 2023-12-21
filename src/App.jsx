import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { UserProvider } from './context/UserContext'
import { LoginForm } from './Components/LoginForm'
import { DashBoard } from './Components/DashBoard'
import { getCookie } from './services/getToken'
import { useAuth } from './Auth/AuthContext'
import { useEffect } from 'react'
import axios from 'axios'
import { ForgotPassword } from './Components/ForgotPassword'
import { ResetPassword } from './Components/ResetPassword'

export const API = 'http://172.20.1.160:3000'

// TODO: Definir variables de API
axios.defaults.baseURL = API

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  const { loggedIn } = useAuth()
  console.log(loggedIn)

  return !loggedIn
    ? <Navigate to="/chat_bot" />
    : children
}

export function App () {
  const { login } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const getLoggedIn = async () => {
      try {
        const token = getCookie('chat_bot')
        const response = await axios.get('/profile', {
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
        })
        const usuario = await response.data
        login(usuario.auth, usuario.user)
        navigate('/dashboard')
      } catch (error) {
        console.log(error)
      }
    }
    getLoggedIn()
  }, [])

  return (
    <Routes>
      <Route path='/chat_bot' element={<LoginForm />} />
      <Route path='/chat_bot/dashboard' element={
        <ProtectedRoute>
          <UserProvider>
            <DashBoard />
          </UserProvider>
        </ProtectedRoute>
      } />
      <Route path='/chat_bot/forgot-password' element={<ForgotPassword />} />
      <Route path='/chat_bot/resetPassword' element={<ResetPassword />} />
      <Route path='*' element={<Navigate to='/chat_bot' />} />
    </Routes>
  )
}
