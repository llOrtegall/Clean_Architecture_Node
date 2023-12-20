import { useState } from 'react'
import { useAuth } from '../Auth/AuthContext.jsx'
import { InfoUserChat } from './InfoUserChat.jsx'
import { LoginUser } from './LoginUser.jsx'
import { UserChatBot } from './UsersChatBot.jsx'

// eslint-disable-next-line react/prop-types
export function DashBoard () {
  const { user } = useAuth()
  const { empresa } = user

  const [companyState, setCompanyState] = useState(empresa)

  function defineCompany () {
    const handleChange = (e) => {
      setCompanyState(e.target.value)
    }

    return (
      <div className='flex justify-center items-center bg-yellow-300 rounded-md py-2'>
        <h3 className='pr-2 text-lg font-semibold'>Tú cuenta se encuentra ligada a 2 Empresas: </h3>
        <select className='p-2 border rounded-lg' onChange={handleChange}>
          <option>Seleccione una empresa</option>
          <option value='Servired'>Servired</option>
          <option value='Multired'>Multired</option>
        </select>
      </div>
    )
  }

  return (
    <main className='w-full'>
      <section>
        <LoginUser emp={companyState}/>
      </section>
      <section className='w-full flex flex-col px-2 h-100 overflow-auto'>
        {companyState !== 'Multired y Servired' ? <UserChatBot select={companyState}/> : defineCompany()}
      </section>
      <section >
        <InfoUserChat emp={companyState}/>
      </section>
    </main>
  )
}
