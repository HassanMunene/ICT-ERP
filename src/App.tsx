import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import ClientBody from './components/ClientBody';

function App() {
  const [count, setCount] = useState(0)

  return (
    <html lang="en">
      <body suppressHydrationWarning className="antialiased">
        <ClientBody>
          <div className="flex h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
              <Header />
              <main className="flex-1 overflow-auto p-6">
                {children}
              </main>
            </div>
          </div>
        </ClientBody>
      </body>
    </html>
  )
}

export default App
