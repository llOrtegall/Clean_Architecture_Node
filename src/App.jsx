import { Routes, Route } from 'react-router-dom'
import { LoginForm } from './Components/LoginForm'
import { DashBoard } from './Components/DashBoard'
import axios from 'axios'
import { UserProvider } from './context/UserContext'

export const API = 'http://localhost:3000'

// TODO: Definir variables de API
axios.defaults.baseURL = API

export function App () {
  return (
    <Routes>
      <Route path='/' element={<LoginForm />} />
      <Route path='/dashboard' element={
        <UserProvider>
          <DashBoard />
        </UserProvider>
      } />
    </Routes>
  )
}
