import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './App.css'
import ClientBody from './components/ClientBody';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import MainDashboard from './pages/MainDashboard';

function App() {
  return (
    <Router>
      <ClientBody>
        <div className="flex h-screen bg-gray-50">
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <Header />
            <main className="flex-1 overflow-auto p-6">
              <Routes>
                <Route path="/" element={<MainDashboard />} />
              </Routes>
            </main>
          </div>
        </div>
      </ClientBody>
    </Router>
  )
}

export default App
