import axios from 'axios'
import { createContext, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

// eslint-disable-next-line react/prop-types
export function AuthProvider ({ children }) {
  const [loggedIn, setLoggedIn] = useState(false)
  const navigate = useNavigate()
  const [user, setUser] = useState({})

  const login = (auth, user) => {
    if (auth === true) {
      setLoggedIn(true)
      setUser(user)
      navigate('/chat_bot/dashboard')
    }
  }
  const logout = () => {
    axios.post('/logout').then(res => {
      if (res.status === 200) {
        setLoggedIn(false)
        setUser({})
        navigate('/chat_bot')
      }
    })
  }

  return (
    <AuthContext.Provider value={{ loggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth () {
  return useContext(AuthContext)
}
