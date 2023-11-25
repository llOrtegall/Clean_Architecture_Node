import { useContext } from 'react'
import { UserContext } from '../context/UserContext'

export function RenderUsers ({ usuarios }) {
  const { setUsuario } = useContext(UserContext)

  const handleClick = (user) => {
    setUsuario(user)
  }

  return (
    usuarios.map((user, index) => {
      return (
        <tr key={index}>
          <td>{index + 1}</td>
            <td>{user.nombre}</td>
            <td>{user.cedula}</td>
            <td>{user.correo}</td>
            <td>{user.telefono}</td>
            <td>{user.fregistro.split('T')[0]}</td>
            {
              user.Estado === 'Si Existe'
                ? <td className='bg-green-400'>Registrado</td>
                : <td className='bg-red-400'>No Registrado</td>
            }
            {
              user.Estado === 'Si Existe'
                ? <td className='bg-green-400'>User Ok</td>
                : <td className='bg-yellow-400 hover:bg-blue-400 hover:cursor-pointer' onClick={() => handleClick(user)}>Opc User</td>
            }
        </tr>
      )
    })
  )
}
