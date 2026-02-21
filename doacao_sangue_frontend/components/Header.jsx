import React from 'react'

export default function Header({ user, currentPage, setCurrentPage }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'cadastro', label: 'Cadastrar Doador', icon: '👤' },
    { id: 'agendamentos', label: 'Agendamentos', icon: '📅' },
    { id: 'estoque', label: 'Estoque de Sangue', icon: '🩸' },
  ]

  return (
    <header className="bg-red-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🩸</span>
            <div>
              <h1 className="text-2xl font-bold">Sistema de Doação de Sangue</h1>
              <p className="text-red-100 text-sm">Fundação Cultural Cassiano Ricardo</p>
            </div>
          </div>
          {user && (
            <div className="text-right">
              <p className="font-semibold">{user.nome}</p>
              <p className="text-red-100 text-sm">{user.perfil}</p>
            </div>
          )}
        </div>

        <nav className="flex gap-2 flex-wrap">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                currentPage === item.id
                  ? 'bg-white text-red-600 shadow-md'
                  : 'bg-red-700 hover:bg-red-800 text-white'
              }`}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  )
}
