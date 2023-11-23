import { useEffect, useState } from 'react'
import axios from 'axios'

// eslint-disable-next-line react/prop-types
export function Validacion ({ user }) {
  const [cf2, setCf2] = useState([])

  useEffect(() => {
    axios.post('/getCF2', { cc: user })
      .then(res => {
        setCf2(res.data)
      })
  })

  return (
    <>
      {
        cf2.Estado === 'Si Existe'
          ? <>
            <td className='bg-green-400'>Registrado</td>
            <td className='bg-green-400'>User Ok</td>
          </>
          : <>
            <td className='bg-red-400'>No Registrado</td>
            <td className='bg-yellow-400'>Opc Usuario</td>
          </>
      }
    </>
  )
}
