import { ChangedPassword } from './ChangedPassword.jsx'
import { UserIcon, CloseSession, Menu } from './IconSvg.jsx'
import { useAuth } from '../Auth/AuthContext.jsx'
import { useState } from 'react'

// eslint-disable-next-line react/prop-types
export function LoginUser ({ emp }) {
  const [showChangePasword, setShowChangePasword] = useState(false)
  const [visible, setVisible] = useState(false) // [visible, setVisible
  const { logout, user } = useAuth()
  const { id, nombres, apellidos, username, correo, proceso, rol } = user

  const handleShowChangePassword = () => {
    setShowChangePasword(!showChangePasword)
  }

  const handleClickMenu = () => {
    setVisible(!visible)
  }

  return (
    <nav className='bg-slate-600 m-2 p-2 rounded-md text-white'>

      <section className='w-full grid gap-2 text-xs lg:text-sm lg:grid-cols-4'>
        <div className='border rounded-md p-1 text-center'>
          <figure className=''> <UserIcon /> </figure>
          <p className='grid w-full'>Bienvenid@ <span className='font-bold'>{nombres} {apellidos} </span></p>
          <p className='grid w-full'>Empresa: {emp !== null || undefined ? <span className='font-bold'>{emp}</span> : null}</p>
          <button className='lg:hidden' onClick={handleClickMenu}>
            <Menu />
          </button>
        </div>

        {visible && (
          <>
            <div className='border rounded-md p-1 text-center '>
              <p className='grid w-full'>Usuario: <span className='font-bold'>{username}</span></p>
              <p className='grid w-full'>Proceso: <span className='font-bold'>{proceso}</span></p>
              <p className='grid w-full'>Cargo: <span className='font-bold'>{rol}</span></p>
            </div>
            <div className='border rounded-md p-1 text-center '>
              <p> Correo: <span className='font-bold'>{correo} </span></p>
              <p>ID: <span className='font-bold'>{id}</span></p>
            </div>
            <div className='border rounded-md p-1'>
              <button onClick={handleShowChangePassword} className='flex justify-center items-center w-full p-2 bg-blue-400 rounded-md text-white font-semibold border'>
                Cambiar Contraseña
              </button>
              <button onClick={logout} className='flex items-center w-full text-white text-center justify-center px-2 py-1 border rounded-md'>
                <CloseSession />
                Cerrar Sesión
              </button>
            </div>
          </>
        )}
      </section>

      <section className='absolute'>
        {showChangePasword === true ? <ChangedPassword username={username} close={handleShowChangePassword} /> : null}
      </section>

    </nav>
  )
}
