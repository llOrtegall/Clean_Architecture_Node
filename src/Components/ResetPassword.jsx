import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

export function ResetPassword () {
  const [token, setToken] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('/resetPassword', { token, password })
      .then(res => {
        if (res.status === 200) {
          setMessage('Contraseña Actualizada Correctamente :D ¡Inicia Sesión! ')
          setTimeout(() => {
            navigate('/chat_bot')
          }, 4500)
        } else if (res.status === 400) {
          console.log(res.data)
        }
      })
      .catch(err => {
        if (err.response.status === 400) {
          setError('Token no válido o expirado')
          setTimeout(() => {
            setError('')
          }, 3500)
        }
      })
  }

  return (
    <section className='w-full h-screen flex flex-col items-center justify-center fondo relative'>
      <form className="w-96 items-center flex flex-col gap-2 justify-center bg-white p-8 rounded-lg relative" onSubmit={handleSubmit}>
        <h2 className="text-orange-600 font-semibold text-xl pb-8">Creación Nueva Contraseña</h2>
        <label className="">Token Recibido</label>
        <input type="text" className="p-2 rounded-md border w-60" required value={token} onChange={e => setToken(e.target.value)}
          placeholder="" />
        <label className="">Nueva Contraseña</label>
        <input type="password" className="p-2 rounded-md border w-60" required value={password} onChange={e => setPassword(e.target.value)}
          placeholder="********" />
        <button className="bg-blue-400 rounded-md mt-6 p-2 text-white font-semibold w-60">
          Confirmar Nueva Contraseña
        </button>
        <Link to='/chat_bot' className='text-xs absolute bottom-2 right-2 text-orange-600 hover:underline' >Volver al inicio</Link>
      </form>
      {message && <div className='absolute bottom-36 text-green-600 font-semibold text-center'>{message}</div>}
      {error && <div className='absolute bottom-36 text-red-600 font-semibold text-center'>{error}</div>}
    </section>
  )
}
