import { Routes, Route, Navigate } from 'react-router-dom'
import { UserProvider } from './context/UserContext'
import { LoginForm } from './Components/LoginForm'
import { DashBoard } from './Components/DashBoard'
import { useAuth } from './Auth/AuthContext'
import { useEffect } from 'react'
import axios from 'axios'
import { ForgotPassword } from './Components/ForgotPassword'
import { ResetPassword } from './Components/ResetPassword'

export const API = 'http://localhost:3000'

const ProtectedRoute = ({ children }) => {
  const { loggedIn } = useAuth()

  return !loggedIn
    ? <Navigate to="/chat_bot" />
    : children
}

export function App () {
  axios.defaults.baseURL = API
  axios.defaults.withCredentials = true

  const { login } = useAuth()

  useEffect(() => {
    axios.get('/profile').then(res => {
      const { auth, UserLogin } = res.data
      login(auth, UserLogin)
    })
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
