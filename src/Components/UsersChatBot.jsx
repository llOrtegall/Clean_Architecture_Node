import { useState, useEffect } from 'react'
import axios from 'axios'
import { Validacion } from './Validacion'

export function UserChatBot () {
  const [usuarios, setUsuarios] = useState([])

  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUsuarios = async () => {
      setLoading(true)
      try {
        const { data } = await axios.get('/clientes')
        setUsuarios(data)
        localStorage.setItem('usuarios', JSON.stringify(data))
        setLoading(false)
      } catch (err) {
        setError(err.response.message)
        setLoading(false)
      }
    }

    fetchUsuarios()
  }, [])

  return (
    error !== null
      ? <p className='text-center'>Hubo un error al consultar las bases de Datos: {error}</p>
      : loading === true
        ? <p className='text-center'>Cargando...</p>
        : <table className='w-full m-2 h-80 overflow-auto'>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Cedula</th>
              <th>Correo</th>
              <th>Telefono</th>
              <th>N° Registro</th>
              <th>Estado</th>
              <th>Opc Usuario</th>
            </tr>
          </thead>
          <tbody className='text-center'>
            {
              usuarios.map((user, index) => {
                return (
                  <tr key={index}>
                    <td>{user.nombre}</td>
                    <td>{user.cedula}</td>
                    <td>{user.correo}</td>
                    <td>{user.telefono}</td>
                    <td>{user.telwhats}</td>
                    <Validacion user={user.cedula} />
                  </tr>
                )
              })
            }

          </tbody>
        </table>

  )
}
