import axios from 'axios'
import { LoginForm } from './Components/LoginForm'
import { UserProvider } from './context/UserContext.jsx'
import { useAuth } from './Auth/AuthContext'
import { DashBoard } from './Components/DashBoard'
import { useEffect } from 'react'

axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:4040'

export function App () {
  const { user, login } = useAuth()
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('/profile')
        login(response.data)
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
