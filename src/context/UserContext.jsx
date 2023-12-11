import { createContext, useState } from 'react'

export const UserContext = createContext()

// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null)
  const [signalUser, setSignalUser] = useState(false)
  const [company, setCompany] = useState(null)

  return (
    <UserContext.Provider value={{ usuario, setUsuario, signalUser, setSignalUser, company, setCompany }}>
      {children}
    </UserContext.Provider>
  )
}
