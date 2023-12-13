import { useContext, useEffect, useState } from 'react'
import { InfoIcon } from './IconSvg'
import { Button } from './Button'
import { EditarClienteChat, CrearClienteFiel, SolicitarEliminacion } from './OptionsUser'
import { UserContext } from '../context/UserContext'

// eslint-disable-next-line react/prop-types
export function InfoUserChat ({ emp }) {
  const [activeComponent, setActiveComponent] = useState(null)
  const { usuario } = useContext(UserContext)
  const empresa = emp

  console.log(empresa)

  const closeComponent = () => {
    setActiveComponent(null)
  }

  const components = {
    EditarClienteChat: <EditarClienteChat client={usuario} emp={empresa} funClose={closeComponent} />,
    CrearClienteFiel: <CrearClienteFiel client={usuario} emp={empresa} funClose={closeComponent} />,
    SolicitarEliminacion: <SolicitarEliminacion client={usuario} emp={empresa} funClose={closeComponent} />
  }

  const handleButtonClick = (componentName) => {
    setActiveComponent(components[componentName])
  }

  useEffect(() => {
    setActiveComponent(null)
  }, [usuario])

  return (
    usuario && (
    <section className='bg-slate-600 rounded-xl flex items-center justify-around p-2 m-2 h-80 md:text-xs xl:text-base xl:h-60'>
      <article className='flex w-4/12 items-center'>
        <div className='p-2'>
          <InfoIcon className='text-white' />
        </div>
        <div className='w-full'>
          <dd className='text-white w-full'> <span className='text-green-200 font-semibold pr-2'>Nombres: </span>{usuario.nombre}</dd>
          <dd className='text-white w-full'><span className='text-green-200 font-semibold pr-2'>N° Documento: </span>{usuario.cedula}</dd>
          <dd className='text-white w-full'><span className='text-green-200 font-semibold pr-2'>Tel / Cel: </span>{usuario.telefono}</dd>
          <dd className='text-white w-full'><span className='text-green-200 font-semibold pr-2'>Correo: </span>{usuario.correo}</dd>
          <dd className='text-white w-full'><span className='text-green-200 font-semibold pr-2'>Registro: </span>{usuario.fregistro.split('T')[0]}</dd>
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
  )
}
