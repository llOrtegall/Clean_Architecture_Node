import { LoginUser } from './LoginUser.jsx'
import { RenderUsuarios } from './RenderUsuarios.jsx'

// eslint-disable-next-line react/prop-types
export function DashBoard () {
  return (
    <>
      <LoginUser />
      <RenderUsuarios />
    </>
  )
}
