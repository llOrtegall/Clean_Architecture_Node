import { useEffect, useState } from 'react'
import axios from 'axios'

// eslint-disable-next-line react/prop-types
export function ValidarUsuarios ({ fun }) {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState([])
  const handleActiveComponent = fun

  useEffect(() => {
    const timer = setTimeout(() => {
      const usuarios = JSON.parse(localStorage.getItem('usuarios'))
      const ccs = usuarios.map(user => user.cedula)

      axios.post('/getCF', { ccs })
        .then(response => {
          console.log(response)
          setUser(response.data)
          setLoading(false)
        })
        .catch(error => {
          console.error(error)
          setLoading(false)
        })
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return <div className=''>Cargando Validaciones Usuarios...</div>
  }

  return (
    <>
    <table className='w-4/12'>
        <thead>
          <tr className=''>
            <th className=''>User Cliente Fiel</th>
            <th className=''>Opciones Usuario</th>
          </tr>
        </thead>
        <tbody>
          {user.map((usuario, index) => (
            usuario.Estado === 'Si Existe'
              ? <tr key={index} className='text-center'>
                  <td className='bg-green-400' id={usuario.user}>Registrado</td>
                  <td className='bg-green-400' id={usuario.user}>User Ok</td>

                </tr>
              : <tr key={index} className='text-center'>
                  <td className='bg-red-400' id={usuario.user}>No Registrado</td>
                  <td className='bg-yellow-400'
                    onClick={() => handleActiveComponent({ user: usuario.user, isAtive: true })}
                  id={usuario.user}>Opc Usuario</td>
                </tr>
          ))}
        </tbody>
      </table>

    </>

  )
}
