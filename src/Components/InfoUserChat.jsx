import { InfoIcon } from './IconSvg.jsx'

// eslint-disable-next-line react/prop-types
export function InfoUserChat ({ inf }) {
  const userS = parseInt(inf)

  const usuario = JSON.parse(localStorage.getItem('usuarios')).filter(user => user.cedula === userS)
  const { nombre, cedula, telefono, correo, telwhats } = usuario[0]
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
          <dd className='text-white w-full'><span className='text-green-200 font-semibold pr-2'>Registro: </span>{telwhats}</dd>
        </div>
      </article>

      <article className='flex flex-col w-2/12'>

      </article>

      <article className='p-4 m-4 w-5/12'>{}</article>
    </section>
  )
}
