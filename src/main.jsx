import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import "./styles/globales.css"

import App from "./App"

import { AuthProvider } from './context/Autenticar'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </AuthProvider>
  
)
