import { useState, useEffect } from 'react'
import { Loading } from './Loading'
import axios from 'axios'

export function UserChatBot () {
  const [usuarios, setUsuarios] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    axios.get('/clientes')
      .then((response) => {
        const fetchedUsers = response.data
        const cedulas = fetchedUsers.map(user => user.cedula)
        axios.post('/getCF', { ccs: cedulas })
          .then(response => {
            const updatedUsers = fetchedUsers.map((user, index) => ({
              ...user,
              ...response.data[index]
            }))
            setUsuarios(updatedUsers)
            setLoading(false)
          })
      })
      .catch((error) => {
        console.log(error)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <Loading />
  }

  return (
    <>
    <h1 className='mx-2 text-center bg-blue-500 text-white font-bold py-2 rounded-lg'>Usuarios Registrados Por Chat Boot</h1>
    <table className='text-center mx-2'>
      <tr>
        <th>N°</th>
        <th>Nombre</th>
        <th>Cedula</th>
        <th>Correo</th>
        <th>Telefono</th>
        <th>Fecha de Registro</th>
        <th>Estado</th>
        <th>Opc Usuario</th>
      </tr>
        { usuarios.map((usuario, index) => {
          return (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{usuario.nombre}</td>
            <td>{usuario.cedula}</td>
            <td>{usuario.correo}</td>
            <td>{usuario.telefono}</td>
            <td>{usuario.fregistro.split('T')[0]}</td>
            {
              usuario.Estado === 'Si Existe'
                ? <td className='bg-green-400'>Registrado</td>
                : <td className='bg-red-400'>No Registrado</td>
            }
            {
              usuario.Estado === 'Si Existe'
                ? <td className='bg-green-400'>User Ok</td>
                : <td className='bg-yellow-400'>Opc User</td>
            }
          </tr>
          )
        })
        }
    </table>
    </>
  )
}
