import { LoginForm } from './Components/LoginForm'
import { DashBoard } from './Components/DashBoard'
import { getCookie } from './services/getToken.js'
import { useAuth } from './Auth/AuthContext'
import { useEffect } from 'react'
import axios from 'axios'
import { UserProvider } from './context/UserContext.jsx'

axios.defaults.baseURL = 'http://localhost:6060'

export function App () {
  const { user, login } = useAuth()

  useEffect(() => {
    const token = getCookie('token')
    axios.get('/profile', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      login(res.data.auth)
    })
  }, [])

  console.log(user)

  if (user === true) {
    return (
      <UserProvider>
        <DashBoard />
      </UserProvider>
    )
  }

  return <LoginForm />
}
