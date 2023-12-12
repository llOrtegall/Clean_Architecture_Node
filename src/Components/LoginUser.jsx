import { ChangedPassword } from './ChangedPassword.jsx'
import { UserIcon, CloseSession } from './IconSvg.jsx'
import { useAuth } from '../Auth/AuthContext.jsx'
import { useState } from 'react'

export function LoginUser () {
  const [showChangePasword, setShowChangePasword] = useState(false)
  const { logout, user, company } = useAuth()

  const { id, nombres, apellidos, username, correo, proceso, rol } = user

  const handleShowChangePassword = () => {
    setShowChangePasword(!showChangePasword)
  }

  return (
    <>
      <nav className='flex items-center justify-between bg-slate-600 m-2 px-4 py-6 mx rounded-xl text-white relative'>
        <figure className='flex items-center'>
          <UserIcon />
          <section>
            <h3 className='font-semibold'>
              Bienvenid@ <span className='pl-2'>{nombres}</span><span> {apellidos} --- </span> Empresa: { company !== null || undefined ? <span className='font-bold pl-2'>{company}</span> : null}
            </h3>
            <div className='flex'>
              <p className='small-text'>Usuario: <span className='font-bold pr-2'>{username}</span>  Correo: <span className='font-semibold lowercase'>{correo} </span></p>
            </div>
            <div className='flex justify-between'>
              <p>Proceso: <span className='font-bold pr-2'>{proceso}</span></p> <p>Cargo: <span className='font-bold pr-2'>{rol}</span></p> <p>ID: <span className='font-bold pr-2'>{id}</span></p>
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
      <section className='absolute 2xl:right-1/4 xl:right-96 lg:right-80'>
        {showChangePasword === true ? <ChangedPassword username={username} close={handleShowChangePassword}/> : null}
      </section>
    </>

  )
}
