import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { UserProvider } from './context/UserContext'
import { LoginForm } from './Components/LoginForm'
import { DashBoard } from './Components/DashBoard'
import { useAuth } from './Auth/AuthContext'
import { useEffect } from 'react'
import axios from 'axios'
import { ForgotPassword } from './Components/ForgotPassword'
import { ResetPassword } from './Components/ResetPassword'

const ProtectedRoute = ({ children }) => {
  const { loggedIn } = useAuth()

  return !loggedIn
    ? <Navigate to="/chat_bot" />
    : children
}

export function App () {
  axios.defaults.baseURL = '/api'

  const { login } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('TokenChatBoot')
    if (token) {
      axios.get('/profile', { headers: { Authorization: `Bearer ${token}` } })
        .then(res => {
          if (res.status === 200) {
            login(true, res.data)
          } else {
            console.log('No Token')
            navigate('/')
          }
        })
    }
  }, [])

  return (
    <Routes>
      <Route path='/' element={<LoginForm />} />
      <Route path='/dashboard' element={
        <ProtectedRoute>
          <UserProvider>
            <DashBoard />
          </UserProvider>
        </ProtectedRoute>
      } />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/resetPassword' element={<ResetPassword />} />
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  )
}
