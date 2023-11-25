import { createContext, useState } from 'react'

export const UserContext = createContext()

// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null)
  const [signalUser, setSignalUser] = useState(false)

  return (
    <UserContext.Provider value={{ usuario, setUsuario, signalUser, setSignalUser }}>
      {children}
    </UserContext.Provider>
  )
}
