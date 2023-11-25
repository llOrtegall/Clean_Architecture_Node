export function RenderUsers ({ usuarios }) {
  return (
    usuarios.map((usuario, index) => {
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
  )
}
