import { useAuth } from '../Auth/AuthContext.jsx'
import { InfoUserChat } from './InfoUserChat.jsx'
import { LoginUser } from './LoginUser.jsx'
import { useState } from 'react'
import { UserChatBot } from './UsersChatBot.jsx'

// eslint-disable-next-line react/prop-types
export function DashBoard () {
  const { user } = useAuth()
  const { empresa } = user
  const [selectedEmpresa, setSelectedEmpresa] = useState(empresa)

  function handleSelectChange (e) {
    setSelectedEmpresa(e.target.value)
  }

  function RenderUsersChatBot () {
    if (selectedEmpresa === 'Servired') {
      return <UserChatBot select={selectedEmpresa} />
    } else if (selectedEmpresa === 'Multired') {
      return <UserChatBot select={selectedEmpresa} />
    } else {
      return (
        <div className='flex justify-center items-center bg-yellow-300 rounded-md py-2'>
          <h3 className='pr-2 text-lg font-semibold'>Tú cuenta se encuentra ligada a 2 Empresas: </h3>
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
      <section >
        <InfoUserChat />
      </section>
    </main>
  )
}
