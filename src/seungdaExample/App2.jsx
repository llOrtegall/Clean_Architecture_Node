import { useEffect, useState } from 'react'
import axios from 'axios'
import { Header } from './Header'

export function App2 () {
  const [usuarios, setUsuarios] = useState([])
  const [filterUsers, setFilterUsers] = useState({
    Estado: 'No Existe'
  })

  useEffect(() => {
    axios.get('http://localhost:4040/clientes')
      .then((response) => {
        const fetchedUsers = response.data
        const cedulas = fetchedUsers.map(user => user.cedula)
        axios.post('http://localhost:4040/getCF', { ccs: cedulas })
          .then(response => {
            const updatedUsers = fetchedUsers.map((user, index) => ({
              ...user,
              ...response.data[index]
            }))
            setUsuarios(updatedUsers)
          })
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const userfiltrados = () => {
    return usuarios.filter(usuario => usuario.Estado === filterUsers.Estado)
  }

  return (
    <>
      <Header changeFilters={setFilterUsers}/>
      <Users usuarios={userfiltrados(usuarios)} />
    </>
  )
}

export function Users ({ usuarios }) {
  return (
    usuarios.map((usuario, index) => {
      return (
        <>
          <div key={index} className='bg-blue-200 m-2 p-2'>
            <h1>{usuario.nombre}</h1>
            <h1>{usuario.cedula}</h1>
            <h1>{usuario.correo}</h1>
            <h1>{usuario.telefono}</h1>
            <h1>{usuario.fregistro.split('T')[0]}</h1>
            <h1>{usuario.Estado}</h1>
          </div>
        </>
      )
    })
  )
}
