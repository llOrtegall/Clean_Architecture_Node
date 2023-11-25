import { InfoIcon } from './IconSvg'
// import { CrearClienteFiel, EditarClienteChat, SolicitarEliminacion } from './OptionsUser.jsx'

export function InfoUserChat () {
  return (
    <section className='bg-slate-600 rounded-xl flex items-center justify-around p-2 m-2 h-80 md:text-xs xl:text-base xl:h-60'>
      <article className='flex w-4/12 items-center'>
        <div className='p-2'>
          <InfoIcon className='text-white' />
        </div>
        <div className='w-full'>
          <dd className='text-white w-full'> <span className='text-green-200 font-semibold pr-2'>Nombres: </span>{}</dd>
          <dd className='text-white w-full'><span className='text-green-200 font-semibold pr-2'>N° Documento: </span>{}</dd>
          <dd className='text-white w-full'><span className='text-green-200 font-semibold pr-2'>Tel / Cel: </span>{}</dd>
          <dd className='text-white w-full'><span className='text-green-200 font-semibold pr-2'>Correo: </span>{}</dd>
          <dd className='text-white w-full'><span className='text-green-200 font-semibold pr-2'>Registro: </span>{}</dd>
        </div>
      </article>
    </section>
  )
}
