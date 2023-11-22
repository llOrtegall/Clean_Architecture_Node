import { useState } from 'react'
import { InfoUserChat } from './InfoUserChat.jsx'
import { LoginUser } from './LoginUser.jsx'
import { RenderUsuarios } from './RenderUsuarios.jsx'

// eslint-disable-next-line react/prop-types
export function DashBoard () {
  const [activeComponent, setActiveComponent] = useState({})
  const handleActiveComponent = (info) => setActiveComponent(info)

  const { user, isAtive } = activeComponent

  return (
    <>
      <LoginUser />
      <RenderUsuarios fun={handleActiveComponent}/>
      {isAtive && <InfoUserChat inf={user}/>}
    </>
  )
}
