import { useEffect, useState } from 'react'
import axios from 'axios'
import { Loading } from './Loading'

// eslint-disable-next-line react/prop-types
export function Validacion ({ user, fun }) {
  const [cf2, setCf2] = useState(null)
  const [loading, setLoading] = useState(true)
  const handleShowComponent = fun

  const handleClick = () => {
    handleShowComponent(user)
  }

  useEffect(() => {
    axios.post('/getCF2', { cc: user })
      .then(res => {
        setCf2(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, []) // array vacío como segundo argumento

  if (loading) {
    return <Loading />
  }

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
            <td className='bg-yellow-400' onClick={handleClick}>Opc Usuario</td>
          </>
      }
    </>
  )
}
