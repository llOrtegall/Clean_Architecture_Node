import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Loadin2 } from './IconSvg'

export function ForgotPassword () {
  const [username, setUsername] = useState('')
  const [correo, setCorreo] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    console.log(username, correo)
    axios.post('/forgotPassword', { username, correo })
      .then(res => {
        if (res.status === 200) {
          setMessage('Se ha generado la solicitud para recuperar contraseña contacte al administrador del Sistema')
          setTimeout(() => {
            setLoading(false)
            navigate('/resetPassword')
            setMessage('')
          }, 4500)
        }
      })
      .catch(err => {
        setLoading(false)
        if (err.response.status === 400) {
          setError('Usuario o Correo no registrado, debe proporcionar un usuario y correo registrado correctamente')
          setTimeout(() => {
            setError('')
          }, 5000)
        }
      })
  }

  return (
    <section className='w-full h-screen flex flex-col items-center justify-center fondo'>
      <form className="w-96 items-center flex flex-col gap-2 justify-center bg-white p-8 rounded-lg shadow-2xl relative" onSubmit={handleSubmit}>
        <h2 className="text-orange-600 font-semibold text-xl pb-8">Recuperar Contraseña</h2>
        <label className="">Usuario Registrado</label>
        <input type="text" className="p-2 rounded-md border w-60" required value={username} onChange={e => setUsername(e.target.value)}
          placeholder="CP*******" />
        <label className="">Correo Registrado</label>
        <input type="email" className="p-2 rounded-md border w-60" required value={correo} onChange={e => setCorreo(e.target.value)}
          placeholder="correo@correo.com" />
        <button className="bg-blue-400 rounded-md mt-6 p-2 text-white font-semibold w-60 shadow-lg">
          Enviar
        </button>
        <Link to='/' className='text-xs absolute bottom-2 right-2 text-orange-600 hover:underline' >Volver al inicio</Link>
      </form>
      {error && <div className='absolute bottom-44 text-red-600 font-semibold'>{error}</div>}
      {message && <div className='absolute bottom-36 text-green-600 font-semibold'>{message}</div>}
      {loading &&
        <div className='absolute bottom-44'>
          <Loadin2 />
        </div>
      }
    </section>
  )
}
