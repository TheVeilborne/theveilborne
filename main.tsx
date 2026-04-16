import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'sonner'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Toaster 
      position="bottom-right"
      toastOptions={{
        style: {
          background: '#F4F1EC',
          color: '#141826',
          border: '1px solid rgba(20, 24, 38, 0.1)',
        },
      }}
    />
  </StrictMode>,
)
