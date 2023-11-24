import { useState, useEffect } from 'react'
import { Validacion } from './Validacion'
import axios from 'axios'

// eslint-disable-next-line react/prop-types
function TableRow ({ user, index, fun }) {
  // eslint-disable-next-line react/prop-types
  const { nombre, cedula, correo, telefono, telwhats } = user
  const handleShowComponent = fun

  return (
    <tr key={cedula}>
      <td>{index + 1}</td>
      <td>{nombre}</td>
      <td>{cedula}</td>
      <td>{correo}</td>
      <td>{telefono}</td>
      <td>{telwhats}</td>
      <Validacion user={cedula} fun={handleShowComponent}/>
    </tr>
  )
}

// eslint-disable-next-line react/prop-types
export function UserChatBot ({ fun }) {
  const [usuarios, setUsuarios] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  const handleShowComponent = fun

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

  const userNoRepetidos = usuarios.filter((user, index, self) =>
    index === self.findIndex((t) => (
      t.cedula === user.cedula
    ))
  )

  return (
    <>
    {error !== null
      ? <p className='text-center'>Hubo un error al consultar las bases de Datos: {error}</p>
      : loading === true
        ? <p className='text-center'>Cargando...</p>
        : <table className='w-full text-center'>
            <thead>
                <tr>
                  <th>N°</th>
                  <th>Nombre</th>
                  <th>Cedula</th>
                  <th>Correo</th>
                  <th>Telefono</th>
                  <th>N° Registro</th>
                  <th>Estado</th>
                  <th>Opc Usuario</th>
                </tr>
            </thead>
            <tbody className=''>
            {
              userNoRepetidos.map((user, index) => (
              <TableRow key={user.cedula} index={index} user={user} fun={handleShowComponent}/>
              ))
            }
            </tbody>
          </table>
      }
    </>
  )
}
