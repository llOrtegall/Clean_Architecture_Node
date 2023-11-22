import { UserChatBot } from './UsersChatBot'
import { ValidarUsuarios } from './ValidarUsuarios'

// eslint-disable-next-line react/prop-types
export function RenderUsuarios ({ fun }) {
  const handleActiveComponent = fun

  return (
    <section className='flex m-2 h-96 overflow-auto'>
      <UserChatBot />
      <ValidarUsuarios fun={handleActiveComponent}/>
    </section>
  )
}
