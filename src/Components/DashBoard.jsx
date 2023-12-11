import { useAuth } from '../Auth/AuthContext.jsx'
import { InfoUserChat } from './InfoUserChat.jsx'
import { LoginUser } from './LoginUser.jsx'
import { UserChatBotServired } from './UsersChatBotServired.jsx'
import { UserChatBotMultired } from './UsersChatBotMultired.jsx'
import { useState } from 'react'

// eslint-disable-next-line react/prop-types
export function DashBoard () {
  const { user } = useAuth()
  const { empresa } = user
  const [selectedEmpresa, setSelectedEmpresa] = useState(empresa)

  console.log(empresa)

  function handleSelectChange (e) {
    setSelectedEmpresa(e.target.value)
  }

  function RenderUsersChatBot () {
    if (selectedEmpresa === 'Servired') {
      return <UserChatBotServired />
    } else if (selectedEmpresa === 'Multired') {
      return <UserChatBotMultired />
    } else {
      return (
        <div className='flex justify-center'>
          <select className='p-2 border rounded-lg' onChange={handleSelectChange}>
            <option>Seleccione una empresa</option>
            <option value='Servired'>Servired</option>
            <option value='Multired'>Multired</option>
          </select>
        </div>)
    }
  }

  return (
    <main className='w-full'>
      <section>
        <LoginUser />
      </section>
      <section className='w-full flex flex-col px-2 h-96 overflow-auto'>
        <RenderUsersChatBot />
      </section>
      <section>
        <InfoUserChat />
      </section>
    </main>
  )
}
