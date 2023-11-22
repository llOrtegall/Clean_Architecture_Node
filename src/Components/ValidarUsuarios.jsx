import { useEffect, useState } from 'react'
import axios from 'axios'

// eslint-disable-next-line react/prop-types
function User ({ user }) {
  console.log(user)
  // eslint-disable-next-line react/prop-types
  if (user.Estado === 'Si Existe') {
    return (
      <section className='flex justify-center'>
        <div className='w-full p-2 border bg-green-400'>Registrado</div>
        <div className='w-full p-2 border bg-green-400'>User Ok</div>
      </section>
    )
  } else {
    return (
      <section className='flex justify-center'>
        <div className='w-full p-2 border bg-red-400'>No Registrado</div>
        <div className='w-full p-2 border bg-yellow-400 hover:cursor-pointer hover:bg-blue-400'>Opc Usuario</div>
      </section>
    )
  }
}

export function ValidarUsuarios () {
  const usuarios = (JSON.parse(localStorage.getItem('usuarios')))
  const ccs = usuarios.map(user => user.cedula)

  useEffect(() => {
    axios.post('/getCF', { ccs })
      .then(response => {
        console.log(response)
        setData(response.data)
      })
      .catch(error => {
        console.error(error)
      })
  }, [])

  const [data, setData] = useState([])

  return (
    <section className='w-1/3 md:text-xs xl:text-base'>
      <div className='flex justify-around p-2 bg-indigo-600 border text-white font-bold'>
        <h3 className='text-center'>User Cliente Fiel</h3>
        <h3 className='text-center'>Opciones Usuario</h3>
      </div>
      <div className='flex flex-col w-full h-auto text-center'>
         {data.map((user, index) => (
          <User key={index} user={user} />))}
      </div>
    </section>
  )
}
