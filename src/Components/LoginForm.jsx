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
    <section className='bg-blue-300 w-screen h-screen flex flex-col items-center justify-center relative'>
      <form onSubmit={handleSubmit} className='flex flex-col w-80 items-center'>
        <label className='flex m-2 w-72 items-center justify-between'>
          Usuario:
          <input
          className='p-1 rounded-md'
            type="text"
            value={user}
            onChange={({ target: { value } }) => setUser(value)}
          />
        </label>
        <label className='flex m-2 w-72 items-center justify-between'>
            Contraseña:
          <input
          className='p-1 rounded-md'
            type="password"
            value={password}
            onChange={({ target: { value } }) => setPassword(value)}
          />
        </label>
        <button className='bg-blue-700 w-52 rounded-md p-2 mt-4 text-white font-bold' type="submit">Ingresar</button>
      </form>
      {error && <p className='absolute bottom-60 text-red-600'>{error}</p>}
    </section>
  )
}
