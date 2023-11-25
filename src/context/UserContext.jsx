import { createContext, useState } from 'react'

export const UserContext = createContext()

// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null)

  return (
    <UserContext.Provider value={{ usuario, setUsuario }}>
      {children}
    </UserContext.Provider>
  )
}
