import { LoginUser } from './LoginUser.jsx'
import { UserComponent } from './UserComponent.jsx'
import { UserChatBot } from './UsersChatBot.jsx'
// eslint-disable-next-line react/prop-types
export function DashBoard () {
  return (
    <main className='w-full h-full flex flex-col'>
      <section className=''>
        <LoginUser />
      </section>
      <section className='m-2 rounded-md' style={{ height: '450px', overflowY: 'auto' }}>
        <UserChatBot />
      </section>
      <section className='p-2'>
        <UserComponent />
      </section>
    </main>
  )
}
