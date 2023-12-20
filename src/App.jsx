import { UserProvider } from './context/UserContext.jsx'
import { LoginForm } from './Components/LoginForm'
import { DashBoard } from './Components/DashBoard'
import { getCookie } from './services/getToken.js'
import { useAuth } from './Auth/AuthContext'
import { useEffect } from 'react'
import axios from 'axios'

export const API = 'http://172.20.1.160:3000'

// TODO: Definir variables de API
axios.defaults.baseURL = API

export function App () {
  const { login, loggedIn } = useAuth()

  useEffect(() => {
    const getLoggedIn = async () => {
      try {
        const token = getCookie('chat_bot')
        const response = await axios.get('/profile', {
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
        })
        const usuario = await response.data
        login(usuario.auth, usuario.user)
      } catch (error) {
        console.log(error)
      }
    }
    getLoggedIn()
  }, [])

  if (loggedIn === true) {
    return (
      <UserProvider>
        <DashBoard />
      </UserProvider>
    )
  }

  return <LoginForm />
}
