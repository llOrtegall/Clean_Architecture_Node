import { UserProvider } from './context/UserContext.jsx'
import { LoginForm } from './Components/LoginForm'
import { DashBoard } from './Components/DashBoard'
import { getCookie } from './services/getToken.js'
import { useAuth } from './Auth/AuthContext'
import { useEffect } from 'react'
import axios from 'axios'

export const API = 'http://127.0.0.1:6060'

// TODO: Definir variables de API
axios.defaults.baseURL = API

export function App () {
  const { login, loggedIn } = useAuth()

  useEffect(() => {
    const getLoggedIn = async () => {
      try {
        const token = getCookie('token')
        const result = await fetch(`${API}/profile`, {
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
        })
        if (result.status === 200) {
          const usuario = await result.json()
          login(usuario.auth, usuario.user)
        }
        if (result.status === 401) {
          login(false)
        }
      } catch (error) {
        if (error) throw new Error(error)
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
