import { ChangedPassword } from './ChangedPassword.jsx'
import { UserIcon, CloseSession } from './IconSvg.jsx'
import { useAuth } from '../Auth/AuthContext.jsx'
import { useState } from 'react'

// eslint-disable-next-line react/prop-types
export function LoginUser({ emp }) {
  const [showChangePasword, setShowChangePasword] = useState(false)
  const { logout, user } = useAuth()
  const { id, nombres, apellidos, username, correo, proceso, rol } = user

  const handleShowChangePassword = () => {
    setShowChangePasword(!showChangePasword)
  }

  return (
    <nav className='bg-slate-600 m-2 rounded-md p-2'>
      <section className='text-white rounded-md'>
        <div className='flex text-xs text-center justify-around border py-1 rounded-md my-1'>
          <UserIcon />
          <p className='flex flex-col'>Bienvenid@ <span className='font-semibold'>{nombres} {apellidos} </span></p>
          <p className='flex flex-col'>Empresa: {emp !== null || undefined ? <span className='font-semibold'>{emp}</span> : null}</p>
        </div>
        <div className='flex text-xs text-center justify-around border py-1 rounded-md my-1'>
          <p className='flex flex-col'>Usuario: <span className='font-semibold'>{username}</span></p>
          <p className='flex flex-col'>Proceso: <span className='font-semibold'>{proceso}</span></p>
          <p className='flex flex-col'>Cargo: <span className='font-semibold'>{rol}</span></p>
        </div>
        <div className='flex flex-col text-xs border py-1 rounded-md my-1'>
          <p className='flex gap-10 justify-around'> Correo: <span className='font-semibold'>{correo} </span></p>
          <p className='flex gap-10 justify-around'>ID: <span className='font-semibold'>{id}</span></p>
        </div>
      </section>

      <div className='flex justify-between'>
        <button onClick={handleShowChangePassword} className='w-42 p-2 bg-blue-400 rounded-md text-white font-semibold border'>
          Cambiar Contraseña
        </button>

        <button onClick={logout} className='w-42 text-white text-center flex items-center justify-center px-2 py-1 border rounded-md'>
          <CloseSession />
          Cerrar Sesión
        </button>
      </div>

      <section className=''>
        {showChangePasword === true ? <ChangedPassword username={username} close={handleShowChangePassword} /> : null}
      </section>

    </nav>
  )
}
