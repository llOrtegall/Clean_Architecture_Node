import { AuthProvider } from './Auth/AuthContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { App } from './App.jsx'
import './index.css'
// import { App2 } from './seungdaExample/App2.jsx'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <AuthProvider>
            <App />
        </AuthProvider>
    </BrowserRouter>
)
