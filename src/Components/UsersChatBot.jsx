import { UserContext } from '../context/UserContext.jsx'
import { useState, useContext, useEffect } from 'react'
import { RenderUsers } from './RenderUsers.jsx'
import { Loading } from './IconSvg.jsx'
import { useAuth } from '../Auth/AuthContext.jsx'

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
  const { user } = useAuth()
  const { signalUser } = useContext(UserContext)

  const { empresa } = user

  const handleSelect = async (ev) => {
    const { value } = ev.target
    if (value === 'Multired') {
      await getDataEmpresaMultired()
    } else if (value === 'Servired') {
      await getDataEmpresaServired()
    } else if (value === 'Multired y Servired') {
      setLoading(false)
    }
  }

  const getDataEmpresaMultired = async () => {
    setLoading(true)
    try {
      const response = await fetch('http://localhost:6060/clientes')
      if (response.status === 200) {
        const data = await response.json()
        const cedulas = data.map(user => user.cedula)

        const response2 = await fetch('http://localhost:6060/getCF', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ ccs: cedulas })
        })

        if (response2.status === 200) {
          const data2 = await response2.json()
          const updatedUsers = data.map((user, index) => ({
            ...user,
            ...data2[index]
          }))
          setUsuarios(updatedUsers)
          setLoading(false)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getDataEmpresaServired = async () => {
    setLoading(true)
    try {
      const response = await fetch('http://localhost:6060/clientesServired')
      if (response.status === 200) {
        const data = await response.json()
        const cedulas = data.map(user => user.cedula)

        const response2 = await fetch('http://localhost:6060/getCF', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ ccs: cedulas })
        })

        if (response2.status === 200) {
          const data2 = await response2.json()
          const updatedUsers = data.map((user, index) => ({
            ...user,
            ...data2[index]
          }))
          setUsuarios(updatedUsers)
          setLoading(false)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (empresa === 'Multired y Servired') {
      setLoading(false)
    } else if (empresa === 'Multired') {
      getDataEmpresaMultired()
    } else if (empresa === 'Servired') {
      getDataEmpresaServired()
    }
  }, [])

  const handleFilter = (ev) => {
    setFilterUsers(ev.target.value)
  }

  if (loading) {
    return <Loading />
  }

  return (
    <>
      <h1 className='text-center bg-blue-500 text-white font-bold py-2 rounded-lg flex items-center justify-center'>
        Usuarios Registrados Por Chat Boot
        {
          empresa === 'Multired y Servired'
            ? <select className='ml-6 text-black' onChange={handleSelect}>
                <option >Seleccione Empresa</option>
                <option value='Servired'>Servired</option>
                <option value='Multired'>Multired</option>
              </select>
            : null
        }
      </h1>
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
        <RenderUsers usuarios={userfiltrados(usuarios)} />
      </table>
    </>
  )
}
