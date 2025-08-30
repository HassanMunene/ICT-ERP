import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <html lang="en">
      <body suppressHydrationWarning className="antialiased">
        <App />
      </body>
    </html>
  </StrictMode>,
)
