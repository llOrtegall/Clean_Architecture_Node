import axios from 'axios'
import { useState, useEffect } from 'react'
import { separarNombre } from '../services/funtionsReutilizables'

// eslint-disable-next-line react/prop-types
export function CrearClienteFiel ({ client }) {
  // eslint-disable-next-line react/prop-types
  const { cedula, nombre, telefono, correo } = client
  const [loading, setLoading] = useState(false)
  const [userOk, setUserOk] = useState('')
  const [messageError, setMessageError] = useState('')
  const [selectedValue, setSelectedValue] = useState(null)

  const handleChange = (ev) => {
    setSelectedValue(ev.target.value)
  }

  const sendCreateClient = () => {
    if (selectedValue === null || selectedValue === ' ') {
      setMessageError('Por favor, selecciona una opción sexo, antes de continuar.')
      setTimeout(() => {
        setMessageError('')
      }, 3000)
      return
    }
    setLoading(true)
    axios.post('/newCF', { cedula, nombre, telefono, correo, sexo: selectedValue })
      .then(res => {
        setUserOk('Usuario creado con exito')
        setLoading(false)
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      })
      .catch(err => {
        setLoading(false)
        if (err.response.status === 409) {
          const error = (err.response.data.message)
          setMessageError(error)
          setTimeout(() => {
            setMessageError('')
          }, 2500)
        }
      })
  }

  return (
    <article className='bg-blue-400 relative rounded-lg p-2'>
      <section className='p-2 m-2 flex items-center'>
        <div className='flex flex-col pl-10'>
          <dd className='text-black '><span className='text-black font-bold pr-2'>Nombre: </span>{nombre}</dd>
          <dd className='text-black '><span className='text-black font-bold pr-2'>N° Documento: </span>{cedula}</dd>
          <dd className='text-black '><span className='text-black font-bold pr-2'>Tel / Cel: </span>{telefono}</dd>
          <dd className='text-black '><span className='text-black font-bold pr-2'>Correo: </span>{correo}</dd>
          <div>
            <label className='text-white font-bold pr-2'> <span className='text-black font-bold pr-2'>Sexo: </span> </label>
            <select className='rounded-md bg-gray-300 text-black w-40 text-center p-1' value={selectedValue} onChange={handleChange}>
              <option> </option>
              <option value='33'>Maculino</option>
              <option value='34'>Femenino</option>
            </select>
          </div>
        </div>
        <button onClick={sendCreateClient} className='bg-green-500 rounded-md h-12 ml-24 text-white font-semibold p-2 mt-4 hover:bg-white hover:text-black'>
          Crea Cliente Fiel
        </button>

        {loading && <p className='text-center absolute bottom-0 left-40'>Creando Usuario ...</p>}
        {userOk && <p className='text-center text-green-600 font-bold absolute bottom-0 left-40'> {userOk} </p>}
        {messageError && <p className='text-center text-red-600 font-semibold absolute bottom-0 left-40'> {messageError} </p>}
      </section>
    </article>
  )
}

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
          window.location.reload()
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
    </article>
  )
}

// eslint-disable-next-line react/prop-types
export function SolicitarEliminacion ({ client }) {
  // eslint-disable-next-line react/prop-types
  const { cedula, nombre, telefono, correo } = client

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [responseOk, setResponseOk] = useState(null)
  const [motivo, setMotivo] = useState('')

  const sendCreateClient = () => {
    setLoading(true)
    axios.post('/reportClient', { client, motivo })
      .then(res => {
        console.log(res)
        setResponseOk(res.status)
        setLoading(false)
        setTimeout(() => {
          window.location.reload()
        }, 1500)
      })
      .catch(err => {
        setError(err.response.data.message)
        setLoading(false)
        setTimeout(() => {
          setError(null)
        }, 3000)
      })
  }

  return (
    <article className='bg-red-500 rounded-lg xl:text-xs'>
      <section className='p-4 m-4'>
        <div className=''>
          <dd className='text-white '><span className='text-black font-semibold pr-2'>Nombre: </span>{nombre}</dd>
          <dd className='text-white '><span className='text-black font-semibold pr-2'>N° Documento: </span>{cedula}</dd>
          <dd className='text-white '><span className='text-black font-semibold pr-2'>Tel / Cel: </span>{telefono}</dd>
          <dd className='text-white '><span className='text-black font-semibold pr-2'>Correo: </span>{correo}</dd>
          <textarea name='text' id='motivo' placeholder='Motivo' rows='2' className='w-full mt-2 rounded-md p-2' onChange={ev => setMotivo(ev.target.value)} />
          <button onClick={sendCreateClient} className='bg-blue-500 rounded-md text-white font-semibold w-full p-2 mt-4 hover:bg-white hover:text-black'>
            Solicitar Eliminar Registro
          </button>
          {loading && <p className='text-center'>Enviando Reporte De Usuario ...</p>}
          {error && <p className='text-white text-center'>Error: <span className='font-semibold'>{error}</span></p>}
          {responseOk && <p className='text-center'> Reporte Enviado </p>}
        </div>
      </section>
    </article>
  )
}
