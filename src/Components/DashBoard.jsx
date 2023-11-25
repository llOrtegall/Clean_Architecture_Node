import { InfoUserChat } from './InfoUserChat.jsx'
import { UserContext } from '../context/UserContext.jsx'
import { LoginUser } from './LoginUser.jsx'
import { UserChatBot } from './UsersChatBot.jsx'
import { useContext, useEffect, useState } from 'react'

// eslint-disable-next-line react/prop-types
export function DashBoard () {
  const { usuario } = useContext(UserContext)
  const [activeComponent, setActiveComponent] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (usuario) {
      setActiveComponent(true)
      setUser(usuario)
    }
  }, [usuario])

  return (
      <main className='w-full'>
        <section>
          <LoginUser />
        </section>
        <section className='w-full flex flex-col px-2 h-96 overflow-auto'>
          <UserChatBot />
        </section>
        <section>
         { activeComponent && <InfoUserChat user={user}/> }
        </section>
      </main>
  )
}
