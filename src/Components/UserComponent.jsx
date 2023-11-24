import { useEffect, useState } from 'react'

// eslint-disable-next-line react/prop-types
export function UserComponent ({ user }) {
  const [usuarios, setUsuarios] = useState([])
  const cedula = user

  useEffect(() => {
    const storedUser = localStorage.getItem('usuarios')
    if (storedUser) {
      const ObjectUser = (JSON.parse(storedUser))
      // eslint-disable-next-line react/prop-types
      const foundUser = ObjectUser.find(user => user.cedula === cedula)
      if (foundUser) {
        setUsuarios([foundUser])
      }
    }
  }, [cedula])

  return (
   <div className="w-auto bg-gray-400 p-4 h-80 rounded-md">
    <h4>Aquí Esta</h4>
    {usuarios.map((user, index) => {
      // eslint-disable-next-line react/prop-types
      const { nombre, cedula, correo, telefono, telwhats } = user
      return (
        <div key={cedula}>
          <p>{index + 1}</p>
          <p>{nombre}</p>
          <p>{cedula}</p>
          <p>{correo}</p>
          <p>{telefono}</p>
          <p>{telwhats}</p>
        </div>
      )
    })}
   </div>
  )
}
