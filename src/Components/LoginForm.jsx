import { useAuth } from '../Auth/AuthContext.jsx'
import { useState } from 'react'
import axios from 'axios'

export const LoginForm = () => {
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const { login } = useAuth()

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('/login', { user, password })
      .then(res => {
        login(res.data)
      })
      .catch(err => {
        setError(err.response.data.error)
        setTimeout(() => {
          setError(null)
        }, 3000)
      })
  }

  return (
    <section className='w-screen h-screen flex flex-col items-center justify-center relative fondo'>
      <form onSubmit={handleSubmit} className='bg-white w-96 h-2/3 rounded-xl p-12 shadow-2xl relative flex flex-col gap-8 justify-between'>
      <h1 className='text-orange-600 font-bold text-3xl text-center'>ChatBot Validator</h1>
      <br />
      {/* // TODO: usuario */}
      <input type='text' placeholder='Usuario | Eje: CP1118333444' className='border-b-2 p-2' required onChange={ev => setUser(ev.target.value)} />
      {/* // TODO: contraseña */}
      <input type='password' placeholder='Contraseña | Eje: CP***' className='border-b-2 p-2' required onChange={ev => setPassword(ev.target.value)} />
      <a className='text-orange-500 text-sm font-semibold text-end pt-2 pb-4'>Olvidaste tu contraseña</a>
      <button className='bg-orange-400 w-full rounded-lg p-3 text-white text-sm shadow-md hover:bg-green-100 hover:text-black'>Iniciar Sesión</button>
      {error ? <p className='absolute bottom-24 left-28 text-red-600 font-semibold'>{error}</p> : null}

    </form>
    </section>
  )
}
