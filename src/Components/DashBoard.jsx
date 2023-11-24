import { LoginUser } from './LoginUser.jsx'
import { UserChatBot } from './UsersChatBot.jsx'
// eslint-disable-next-line react/prop-types
export function DashBoard () {
  // style={{ height: '450px', overflowY: 'auto' }}

  return (
    <main className='w-full h-full flex flex-col'>
      <LoginUser />
      <UserChatBot />
    </main>
  )
}
