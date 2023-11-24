import { useState } from 'react'
import { LoginUser } from './LoginUser.jsx'
import { UserComponent } from './UserComponent.jsx'
import { UserChatBot } from './UsersChatBot.jsx'
// eslint-disable-next-line react/prop-types
export function DashBoard () {
  const [showComponent, setShowComponent] = useState(false)
  const [user, setUser] = useState(null)

  const handleShowComponent = async (user) => {
    setShowComponent(true)
    setUser(user)
  }

  return (
      <main className='w-full h-full flex flex-col'>
        <section className=''>
          <LoginUser />
        </section>
        <section className='m-2 rounded-md' style={{ height: '450px', overflowY: 'auto' }}>
          <UserChatBot fun={handleShowComponent}/>
        </section>
        <section className='p-2'>
          {showComponent === true
            ? <UserComponent user={user} />
            : null }
        </section>
      </main>
  )
}
