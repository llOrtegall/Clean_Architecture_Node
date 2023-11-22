import { useState } from 'react'
import { UserIcon, CloseSession } from './IconSvg.jsx'
import { useAuth } from '../Auth/AuthContext.jsx'
import { ChangedPassword } from './ChangedPassword.jsx'

export function LoginUser () {
  const [showChangePasword, setShowChangePasword] = useState(false)
  const { user, logout } = useAuth()
  const { nombres, apellidos, username, correo } = user

  const handleShowChangePassword = () => {
    setShowChangePasword(!showChangePasword)
  }

  return (
    <>
      <nav className='flex items-center justify-between bg-slate-600 m-2 px-4 py-6 mx rounded-xl text-white md:text-xs xl:text-base'>
        <figure className='flex items-center'>
          <UserIcon />
          <section>
            <h3 className='font-semibold text-xl md:text-xs xl:text-base'>
              Bienvenid@ <span>{nombres}</span><span> {apellidos} </span>
            </h3>
            <div className='flex'>
              <p className='small-text'>Usuario: <span className='font-bold pr-2'>{username}</span>  Correo: <span className='font-semibold lowercase'>{correo} </span></p>
            </div>
          </section>
        </figure>

        <button onClick={handleShowChangePassword} className='bg-blue-400 p-3 font-bold rounded-md hover:bg-green-200 hover:text-gray-700'>
          Cambiar Contraseña
        </button>

        <button id='close-session' className='flex flex-col items-center text-center' onClick={logout}>
          <CloseSession />
          <p>Cerrar Sesión</p>
        </button>

      </nav>
      <section className='absolute right-1/3'>
        {showChangePasword === true ? <ChangedPassword username={username} /> : null}
      </section>
    </>

  )
}
