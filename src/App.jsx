import axios from 'axios'
import { LoginForm } from './Components/LoginForm'
import { UserProvider } from './context/UserContext.jsx'
import { useAuth } from './Auth/AuthContext'
import { DashBoard } from './Components/DashBoard'
import { useEffect } from 'react'

axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.withCredentials = true

function getCookie (name) {
  const cookies = document.cookie.split('; ')
  const cookie = cookies.find(cookie => cookie.startsWith(name + '='))
  return cookie ? cookie.split('=')[1] : null
}

export function App () {
  const { user, login } = useAuth()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = getCookie('token')
        const response = await axios.post('/profile', { token })
        login(response.data.user)
      } catch (error) {
        console.error('Error checking auth', error)
      }
    }

    checkAuth()
  }, [])

  if (user) {
    return (
      <UserProvider>
        <DashBoard />
      </UserProvider>
    )
  }

  return <LoginForm />
}
