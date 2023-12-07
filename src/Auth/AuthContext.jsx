import { createContext, useState, useContext } from 'react'

const AuthContext = createContext()

// eslint-disable-next-line react/prop-types
export function AuthProvider ({ children }) {
  const [user, setUser] = useState(false)
  const login = (auth) => {
    if (auth === true) setUser(true)
  }
  const logout = () => {
    setUser(false)
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
  }
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth () {
  return useContext(AuthContext)
}
