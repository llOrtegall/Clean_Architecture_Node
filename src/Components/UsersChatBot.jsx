import { useState, useEffect } from 'react'
import axios from 'axios'

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
        setLoading(false)
        localStorage.setItem('usuarios', JSON.stringify(data))
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
        : <table className='table-auto w-4/5 mx-auto text-center'>
            <thead className=''>
              <tr>
                <th>Nombres</th>
                <th>Documento</th>
                <th>Telefono</th>
                <th>Correo</th>
                <th>N° Registro</th>
              </tr>
            </thead>
            <tbody className='text-sm text-center'>
              {usuarios.map((usuario, index) => (
                <tr key={index}>
                  <td>{usuario.nombre}</td>
                  <td>{usuario.cedula}</td>
                  <td>{usuario.telefono}</td>
                  <td>{usuario.correo}</td>
                  <td>{usuario.telwhats}</td>
                </tr>
              ))}
            </tbody>
          </table>
  )
}
