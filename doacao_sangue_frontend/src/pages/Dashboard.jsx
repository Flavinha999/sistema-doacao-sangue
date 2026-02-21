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

      const [
        doadoresRes,
        agendamentosRes,
        tiposRes,
        statusRes
      ] = await Promise.all([
        axios.get(`${API_URL}/doadores`),
        axios.get(`${API_URL}/agendamentos`),
        axios.get(`${API_URL}/relatorios/doadores-por-tipo`),
        axios.get(`${API_URL}/relatorios/agendamentos-por-status`)
      ])

      const totalDoadores = doadoresRes.data.length

      const agendamentosHoje = agendamentosRes.data.filter(a => {
        const data = new Date(a.data_agendamento).toDateString()
        return data === new Date().toDateString()
      }).length

      setStats({
        totalDoadores,
        agendamentosHoje,
        tiposSanguineos: tiposRes.data,
        agendamentosPorStatus: statusRes.data
      })

    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse text-gray-500 text-lg">
          Carregando dados do sistema...
        </div>
      </div>
    )
  }

  const totalStatus = stats.agendamentosPorStatus.reduce(
    (acc, item) => acc + item.total,
    0
  )
return (
  <div>
    <h1 className="text-3xl font-bold text-gray-800 mb-6">
      Painel Administrativo
    </h1>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white shadow-md rounded-xl p-6">
        <h2 className="text-gray-500 text-sm">TOTAL DE DOADORES</h2>
        <p className="text-3xl font-bold text-primary mt-2">0</p>
      </div>

      <div className="bg-white shadow-md rounded-xl p-6">
        <h2 className="text-gray-500 text-sm">AGENDAMENTOS HOJE</h2>
        <p className="text-3xl font-bold text-primary mt-2">0</p>
      </div>

      <div className="bg-white shadow-md rounded-xl p-6">
        <h2 className="text-gray-500 text-sm">TIPOS SANGUÍNEOS</h2>
        <p className="text-3xl font-bold text-primary mt-2">0</p>
      </div>

      <div className="bg-white shadow-md rounded-xl p-6">
        <h2 className="text-gray-500 text-sm">STATUS AGENDAMENTOS</h2>
        <p className="text-3xl font-bold text-primary mt-2">0</p>
      </div>
    </div>
  </div>
)
}