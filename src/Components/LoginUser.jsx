import { ChangedPassword } from './ChangedPassword.jsx'
import { UserIcon, CloseSession, Menu, Lock } from './IconSvg.jsx'
import { useAuth } from '../Auth/AuthContext.jsx'
import { useState } from 'react'

// eslint-disable-next-line react/prop-types
export function LoginUser ({ emp }) {
  const [showChangePasword, setShowChangePasword] = useState(false)
  const [visible, setVisible] = useState(true) // [visible, setVisible
  const { logout, user } = useAuth()
  const { id, nombres, apellidos, username, correo, proceso, rol } = user

  const handleShowChangePassword = () => {
    setShowChangePasword(!showChangePasword)
  }

  const handleClickMenu = () => {
    setVisible(!visible)
  }

  return (
    <nav className='bg-slate-600 m-2 p-2 rounded-md text-white relative'>

      <section className='grid gap-2 text-xs xl:grid-cols-12 xl:text-base'>

        <div className='flex w-full border rounded-md p-1 text-center justify-between items-center xl:justify-around xl:col-span-3'>
          <figure className='flex items-center justify-center'> <UserIcon /> </figure>
          <p className='flex flex-col'>Bienvenid@ <span className='font-bold'>{nombres} {apellidos} </span></p>
          <p className='flex flex-col'>Empresa: {emp !== null || undefined ? <span className='font-bold'>{emp}</span> : null}</p>
          <button className='flex items-center justify-center xl:justify-around xl:hidden' onClick={handleClickMenu}>
            <Menu />
          </button>
        </div>

        {visible === true
          ? <>
          <div className='flex w-full border rounded-md p-1 text-center justify-between items-center xl:col-span-4'>
            <p className='grid w-full '>Usuario: <span className='font-bold'>{username}</span></p>
            <p className='grid w-full '>Proceso: <span className='font-bold'>{proceso}</span></p>
            <p className='grid w-full '>Cargo: <span className='font-bold'>{rol}</span></p>
          </div>

          <div className='w-full border rounded-md text-center justify-center xl:flex xl:flex-col xl:col-span-3'>
            <p> Correo: <span className='font-bold'>{correo} </span></p>
            <p>ID: <span className='font-bold'>{id}</span></p>
          </div>

          <div className='grid grid-cols-2 gap-2 lg:grid-cols-1 xl:col-span-2'>
            <button onClick={handleShowChangePassword}
              className='flex text-black gap-2 p-1 w-full rounded-md text-xs items-center justify-center bg-yellow-400 hover:bg-white'>
              <figure>
                <Lock />
              </figure>
              Cambiar Contraseña
            </button>
            <button onClick={logout}
              className='flex text-black gap-2 p-1 w-full rounded-md text-xs items-center justify-center bg-blue-400 hover:bg-white'>
              <figure>
                <CloseSession />
              </figure>
              Cerrar Sesión
            </button>
          </div>
        </>
          : null
        }

      </section>

      <section className='absolute top-0 right-0'>
        {showChangePasword === true ? <ChangedPassword username={username} close={handleShowChangePassword} /> : null}
      </section>

    </nav >
  )
}
