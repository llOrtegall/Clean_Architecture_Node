import { UserChatBot } from './UsersChatBot'
import { ValidarUsuarios } from './ValidarUsuarios'

export function RenderUsuarios () {
  return (
    <section className='flex m-2'>
      <UserChatBot />
      <ValidarUsuarios />
    </section>
  )
}
