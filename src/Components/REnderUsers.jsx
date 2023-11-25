import { useUser } from '../context/user'

export function RenderUsers ({ usuarios }) {
  const { setUser } = useUser()

  const handleLogin = (user) => {
    setUser(user)
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
                : <td className='bg-yellow-400' onClick={() => handleLogin(user)}>Opc User</td>
            }
        </tr>
      )
    })
  )
}
