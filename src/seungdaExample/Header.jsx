import { Filters } from './Filters'

// eslint-disable-next-line react/prop-types
export function Header ({ changeFilters }) {
  return (
    <header className='p-2 my-2 text-center'>
      <h1>Usuarios Registrados</h1>
      <Filters onChange={changeFilters}/>
    </header>
  )
}
