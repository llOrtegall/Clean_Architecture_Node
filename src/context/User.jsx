import { createContext, useContext, useState } from 'react'

export const UserContext = createContext({})

// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {
  const [usuario, setUsuario] = useState({})

  const setUser = (user) => {
    setUsuario(user)
  }

  return (
    <UserContext.Provider value={{ setUser, usuario }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
