import { useState, useEffect } from 'react'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import CadastroDoador from './pages/CadastroDoador'
import Agendamentos from './pages/Agendamentos'
import Estoque from './pages/Estoque'

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Simular login do usuário
    setUser({ nome: 'Administrador', perfil: 'Admin' })
  }, [])

  const renderPage = () => {
    switch(currentPage) {
      case 'dashboard':
        return <Dashboard />
      case 'cadastro':
        return <CadastroDoador />
      case 'agendamentos':
        return <Agendamentos />
      case 'estoque':
        return <Estoque />
      default:
        return <Dashboard />
    }
  }

  return (
  <div className="min-h-screen bg-gray-100">
    <Header 
      user={user} 
      currentPage={currentPage} 
      setCurrentPage={setCurrentPage} 
    />

    <main className="max-w-7xl mx-auto px-6 py-10">
      {renderPage()}
    </main>
  </div>
)
}

export default App
