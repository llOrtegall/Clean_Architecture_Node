import { InfoUserChat } from './InfoUserChat.jsx'
import { LoginUser } from './LoginUser.jsx'
import { UserChatBot } from './UsersChatBot.jsx'

// eslint-disable-next-line react/prop-types
export function DashBoard () {
  return (
      <main className='w-full'>
        <section>
          <LoginUser />
        </section>
        <section className='w-full flex flex-col px-2 h-96 overflow-auto'>
          <UserChatBot />
        </section>
        <section>
         <InfoUserChat />
        </section>
      </main>
  )
}
