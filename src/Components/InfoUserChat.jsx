import { useEffect, useState } from 'react'
import { InfoIcon } from './IconSvg'
import { Button } from './Button'
import { EditarClienteChat, CrearClienteFiel, SolicitarEliminacion } from './OptionsUser'

// eslint-disable-next-line react/prop-types
export function InfoUserChat ({ user }) {
  const [activeComponent, setActiveComponent] = useState(null)

  const closeComponent = () => {
    setActiveComponent(null)
  }

  const components = {
    EditarClienteChat: <EditarClienteChat client={user} funClose={closeComponent} />,
    CrearClienteFiel: <CrearClienteFiel client={user} funClose={closeComponent} />,
    SolicitarEliminacion: <SolicitarEliminacion client={user} funClose={closeComponent} />
  }

  const handleButtonClick = (componentName) => {
    setActiveComponent(components[componentName])
  }

  useEffect(() => {
    setActiveComponent(null)
  }, [user])

  return (
    <section className='bg-slate-600 rounded-xl flex items-center justify-around p-2 m-2 h-80 md:text-xs xl:text-base xl:h-60'>
      <article className='flex w-4/12 items-center'>
        <div className='p-2'>
          <InfoIcon className='text-white' />
        </div>
        <div className='w-full'>
          <dd className='text-white w-full'> <span className='text-green-200 font-semibold pr-2'>Nombres: </span>{user.nombre}</dd>
          <dd className='text-white w-full'><span className='text-green-200 font-semibold pr-2'>N° Documento: </span>{user.cedula}</dd>
          <dd className='text-white w-full'><span className='text-green-200 font-semibold pr-2'>Tel / Cel: </span>{user.telefono}</dd>
          <dd className='text-white w-full'><span className='text-green-200 font-semibold pr-2'>Correo: </span>{user.correo}</dd>
          <dd className='text-white w-full'><span className='text-green-200 font-semibold pr-2'>Registro: </span>{user.fregistro.split('T')[0]}</dd>
        </div>
      </article>

      <article className='flex flex-col w-2/12'>
        <Button color='blue' onClick={() => handleButtonClick('EditarClienteChat')}>Editar Usuario</Button>
        <Button color='green' onClick={() => handleButtonClick('CrearClienteFiel')}>Agregar Usuario</Button>
        <Button color='red' onClick={() => handleButtonClick('SolicitarEliminacion')}>Eliminar</Button>
      </article>

      <article className='p-4 m-4 w-5/12'>{activeComponent}</article>
    </section>
  )
}
