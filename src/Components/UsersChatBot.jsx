import { useState, useEffect } from 'react'
import { RenderUsers } from './RenderUsers'
import { Loading } from './IconSvg.jsx'
import axios from 'axios'

function useFilters ({ usuarios }) {
  const [filterUsers, setFilterUsers] = useState('Ninguno')
  const userfiltrados = () => {
    if (filterUsers === 'Ninguno') return usuarios
    else if (filterUsers === 'No Existe') return usuarios.filter(user => user.Estado === 'No Existe')
    else if (filterUsers === 'Si Existe') return usuarios.filter(user => user.Estado === 'Si Existe')
    else return usuarios
  }
  return { userfiltrados, setFilterUsers }
}

export function UserChatBot () {
  const [usuarios, setUsuarios] = useState([])
  const { userfiltrados, setFilterUsers } = useFilters({ usuarios })
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

  const handleFilter = (ev) => {
    console.log(ev.target.value)
    setFilterUsers(ev.target.value)
  }

  if (loading) {
    return <Loading />
  }

  return (
    <>
      <h1 className='text-center bg-blue-500 text-white font-bold py-2 rounded-lg'>Usuarios Registrados Por Chat Boot</h1>
        <table className='text-center'>
          <tr>
            <th>N°</th>
            <th>Nombre</th>
            <th>Cedula</th>
            <th>Correo</th>
            <th>Telefono</th>
            <th>Fecha de Registro</th>
            <th>Estado
              <select id="estado" onChange={ev => handleFilter(ev)} className='ml-3 rounded-md text-black'>
                <option value="Ninguno" className='text-black' selected>Ninguno</option>
                <option value="No Existe" className='text-black'>No Existe</option>
                <option value="Si Existe" className='text-black'>Si Existe</option>
              </select>
            </th>
            <th>Opc Usuario</th>
          </tr>
            <RenderUsers usuarios={userfiltrados(usuarios)}/>
        </table>
    </>
  )
}
