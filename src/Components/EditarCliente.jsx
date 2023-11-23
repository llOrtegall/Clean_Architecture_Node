import { useState, useEffect } from 'react'
import { separarNombre } from '../services/funtionsReutilizables.js'
import axios from 'axios'
import { CloseIcon } from './IconSvg'

// eslint-disable-next-line react/prop-types
export function EditarClienteChat ({ client }) {
  // eslint-disable-next-line react/prop-types
  const { cedula, nombre, telefono, correo } = client
  const { nombre1, nombre2, apellido1, apellido2 } = separarNombre(nombre)
  const [updateUser, setUpdateUser] = useState({})
  const [status, setStatus] = useState(null)

  // eslint-disable-next-line react/prop-types
  function StatusMessage ({ status }) {
    if (status === 'loading') {
      return <div className='absolute -bottom-11 xl:-bottom-6 text-center font-semibold text-blue-300'>Cargando...</div>
    } else if (status === 'success') {
      return <div className='absolute -bottom-11 xl:-bottom-6 text-center ext-center font-semibold text-green-300 '>La información del usuario ha sido actualizada.</div>
    } else if (status === 'error') {
      return <div className='absolute -bottom-11 xl:-bottom-6 text-center font-semibold text-red-400'>Ha ocurrido un error al actualizar la información del usuario.</div>
    } else {
      return null
    }
  }

  useEffect(() => {
    setUpdateUser({ nombre1, nombre2, apellido1, apellido2, telefono, correo, cedula })
  }, [nombre1, nombre2, apellido1, apellido2, telefono, correo, cedula])

  const handleChange = ({ target: { name, value } }) => {
    setUpdateUser(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await axios.put('/cliente', { updateUser })
      if (res.status === 200) {
        setStatus('success')
        setTimeout(() => {
        }, 1500)
      } else if (res.status === 'error') {
        setStatus('error')
      }
    } catch (err) {
      setStatus('error')
    }
  }

  return (
    <article className='w-full relative md:text-xs xl:text-md '>
      <form onSubmit={handleSubmit} className='bg-gray-400 rounded-xl p-4 flex flex-col xl:p-2.5'>
        <div className='flex items-center'>
          <label className='w-28 font-semibold p-2 m-2'>Nombre 1:</label>
          <input className='rounded-md p-2 m-2' type='text' name='nombre1' value={updateUser.nombre1 || ''} onChange={handleChange} required />
          <label className='w-28 font-semibold p-2 m-2'>Nombre 2:</label>
          <input className='rounded-md p-2 m-2' type='text' name='nombre2' value={updateUser.nombre2 || ''} onChange={handleChange} />
        </div>
        <div className='flex items-center'>
          <label className='w-28 font-semibold p-2 m-2'>Apellido 1:</label>
          <input className='rounded-md p-2 m-2' type='text' name='apellido1' value={updateUser.apellido1 || ''} onChange={handleChange} required />
          <label className='w-28 font-semibold p-2 m-2'>Apellido 2:</label>
          <input className='rounded-md  p-2 m-2' type='text' name='apellido2' value={updateUser.apellido2 || ''} onChange={handleChange} />
        </div>
        <div className='flex'>
          <label className='w-28 font-semibold p-2 m-2'>Telefono:</label>
          <input className='rounded-md p-2 m-2 w-36' type='text' name='telefono' value={updateUser.telefono || ''} onChange={handleChange} />
          <label className='font-semibold p-2 m-2'>Correo:</label>
          <input className='rounded-md  p-2 m-2 text-center w-full' type='text' name='correo' value={updateUser.correo || ''} onChange={handleChange} />
        </div>
        <div className='flex justify-center items-center relative'>
          <button className='px-4 py-3 w-40 bg-green-400 rounded-md shadow-md font-semibold hover:bg-white'>Actualizar</button>
          <StatusMessage status={status} />
        </div>
      </form>

      <button className='absolute top-0 right-0 rounded-full hover:bg-red-500 hover:text-white' >
        <CloseIcon />
      </button>
    </article>
  )
}
