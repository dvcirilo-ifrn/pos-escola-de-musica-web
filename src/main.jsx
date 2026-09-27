import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './custom.scss'
import 'bootstrap-icons/font/bootstrap-icons.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
