import React, { useState, useEffect } from 'react'
import axios from 'axios'

const API_URL = 'http://localhost:5000/api'

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalDoadores: 0,
    agendamentosHoje: 0,
    tiposSanguineos: [],
    agendamentosPorStatus: []
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      setLoading(true)
      const [doadores, agendamentos, tiposSanguineos, statusAgendamentos] = await Promise.all([
        axios.get(`${API_URL}/doadores`),
        axios.get(`${API_URL}/agendamentos`),
        axios.get(`${API_URL}/relatorios/doadores-por-tipo`),
        axios.get(`${API_URL}/relatorios/agendamentos-por-status`)
      ])

      setStats({
        totalDoadores: doadores.data.length,
        agendamentosHoje: agendamentos.data.filter(a => {
          const data = new Date(a.data_agendamento).toDateString()
          return data === new Date().toDateString()
        }).length,
        tiposSanguineos: tiposSanguineos.data,
        agendamentosPorStatus: statusAgendamentos.data
      })
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="text-center py-8">Carregando...</div>
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-600">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total de Doadores</p>
              <p className="text-3xl font-bold text-gray-800">{stats.totalDoadores}</p>
            </div>
            <span className="text-4xl">👥</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-600">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-600 text-sm font-medium">Agendamentos Hoje</p>
              <p className="text-3xl font-bold text-gray-800">{stats.agendamentosHoje}</p>
            </div>
            <span className="text-4xl">📅</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-600">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-600 text-sm font-medium">Tipos Sanguíneos</p>
              <p className="text-3xl font-bold text-gray-800">{stats.tiposSanguineos.length}</p>
            </div>
            <span className="text-4xl">🩸</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-600">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-600 text-sm font-medium">Status Agendamentos</p>
              <p className="text-3xl font-bold text-gray-800">{stats.agendamentosPorStatus.length}</p>
            </div>
            <span className="text-4xl">✓</span>
          </div>
        </div>
      </div>

      {/* Gráficos e Tabelas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Doadores por Tipo Sanguíneo */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Doadores por Tipo Sanguíneo</h3>
          <div className="space-y-3">
            {stats.tiposSanguineos.map(tipo => (
              <div key={tipo.tipo_sanguineo} className="flex items-center justify-between">
                <span className="font-medium text-gray-700">{tipo.tipo_sanguineo}</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-red-600 h-2 rounded-full"
                      style={{ width: `${(tipo.total / stats.totalDoadores) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-gray-600 font-semibold">{tipo.total}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Status dos Agendamentos */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Agendamentos por Status</h3>
          <div className="space-y-3">
            {stats.agendamentosPorStatus.map(status => (
              <div key={status.status} className="flex items-center justify-between">
                <span className="font-medium text-gray-700">{status.status}</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        status.status === 'Realizado' ? 'bg-green-600' :
                        status.status === 'Confirmado' ? 'bg-blue-600' :
                        status.status === 'Cancelado' ? 'bg-red-600' :
                        'bg-yellow-600'
                      }`}
                      style={{ width: `${(status.total / stats.agendamentosPorStatus.reduce((a, b) => a + b.total, 0)) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-gray-600 font-semibold">{status.total}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Informações Importantes */}
      <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-lg">
        <h3 className="text-lg font-bold text-blue-900 mb-2">ℹ️ Informações Importantes</h3>
        <ul className="text-blue-800 space-y-2">
          <li>• Verifique regularmente o estoque de sangue para garantir disponibilidade</li>
          <li>• Confirme os agendamentos com antecedência para melhor planejamento</li>
          <li>• Mantenha os dados dos doadores sempre atualizados</li>
          <li>• Gere relatórios mensais para análise de desempenho</li>
        </ul>
      </div>
    </div>
  )
}
