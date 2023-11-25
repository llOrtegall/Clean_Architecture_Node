import { InfoIcon } from './IconSvg'

// eslint-disable-next-line react/prop-types
export function InfoUserChat ({ user }) {
  const { nombre, cedula, correo, telefono, fregistro } = user

  return (
    <section className='bg-slate-600 rounded-xl flex items-center justify-around p-2 m-2 h-80 md:text-xs xl:text-base xl:h-60'>
      <article className='flex w-4/12 items-center'>
        <div className='p-2'>
          <InfoIcon className='text-white' />
        </div>
        <div className='w-full'>
          <dd className='text-white w-full'> <span className='text-green-200 font-semibold pr-2'>Nombres: </span>{nombre}</dd>
          <dd className='text-white w-full'><span className='text-green-200 font-semibold pr-2'>N° Documento: </span>{cedula}</dd>
          <dd className='text-white w-full'><span className='text-green-200 font-semibold pr-2'>Tel / Cel: </span>{telefono}</dd>
          <dd className='text-white w-full'><span className='text-green-200 font-semibold pr-2'>Correo: </span>{correo}</dd>
          <dd className='text-white w-full'><span className='text-green-200 font-semibold pr-2'>Registro: </span>{fregistro.split('T')[0]}</dd>
        </div>
      </article>
    </section>
  )
}
