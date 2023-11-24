import { createRoot } from 'react-dom/client'
import { App } from './App.jsx'
import './index.css'
import { AuthProvider } from './Auth/AuthContext.jsx'
// import { App2 } from './seungdaExample/App2.jsx'

createRoot(document.getElementById('root')).render(
    <AuthProvider>
        <App />
    </AuthProvider>
)
