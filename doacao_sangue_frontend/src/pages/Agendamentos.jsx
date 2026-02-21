import React, { useState, useEffect } from 'react'
import axios from 'axios'

const API_URL = 'http://localhost:5000/api'

export default function Agendamentos() {
  const [agendamentos, setAgendamentos] = useState([])
  const [doadores, setDoadores] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [message, setMessage] = useState('')
  const [formData, setFormData] = useState({
    id_doador: '',
    data_agendamento: '',
    observacoes: ''
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [agendamentosRes, doadoresRes] = await Promise.all([
        axios.get(`${API_URL}/agendamentos`),
        axios.get(`${API_URL}/doadores`)
      ])
      setAgendamentos(agendamentosRes.data)
      setDoadores(doadoresRes.data)
    } catch (error) {
      console.error('Erro ao buscar dados:', error)
      setMessage({ type: 'error', text: 'Erro ao carregar agendamentos' })
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${API_URL}/agendamentos`, formData)
      setMessage({ type: 'success', text: 'Agendamento criado com sucesso!' })
      setFormData({ id_doador: '', data_agendamento: '', observacoes: '' })
      setShowForm(false)
      fetchData()
    } catch (error) {
      setMessage({ type: 'error', text: 'Erro ao criar agendamento' })
    }
  }

  const handleStatusChange = async (id, novoStatus) => {
    try {
      await axios.put(`${API_URL}/agendamentos/${id}`, { status: novoStatus })
      setMessage({ type: 'success', text: 'Status atualizado com sucesso!' })
      fetchData()
    } catch (error) {
      setMessage({ type: 'error', text: 'Erro ao atualizar status' })
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja cancelar este agendamento?')) {
      try {
        await axios.delete(`${API_URL}/agendamentos/${id}`)
        setMessage({ type: 'success', text: 'Agendamento cancelado com sucesso!' })
        fetchData()
      } catch (error) {
        setMessage({ type: 'error', text: 'Erro ao cancelar agendamento' })
      }
    }
  }

  if (loading) {
    return <div className="text-center py-8">Carregando...</div>
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'Realizado': return 'bg-green-100 text-green-800'
      case 'Confirmado': return 'bg-blue-100 text-blue-800'
      case 'Cancelado': return 'bg-red-100 text-red-800'
      default: return 'bg-yellow-100 text-yellow-800'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-800">Agendamentos</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
        >
          {showForm ? '✕ Fechar' : '+ Novo Agendamento'}
        </button>
      </div>

      {message && (
        <div className={`p-4 rounded-lg ${
          message.type === 'success'
            ? 'bg-green-100 border border-green-400 text-green-700'
            : 'bg-red-100 border border-red-400 text-red-700'
        }`}>
          {message.text}
        </div>
      )}

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Doador *</label>
              <select
                name="id_doador"
                value={formData.id_doador}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-600"
              >
                <option value="">Selecione um doador</option>
                {doadores.map(doador => (
                  <option key={doador.id_doador} value={doador.id_doador}>
                    {doador.nome_completo} ({doador.tipo_sanguineo})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Data e Hora *</label>
              <input
                type="datetime-local"
                name="data_agendamento"
                value={formData.data_agendamento}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-600"
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Observações</label>
            <textarea
              name="observacoes"
              value={formData.observacoes}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-600"
              rows="3"
              placeholder="Observações adicionais..."
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-lg transition-colors"
          >
            Criar Agendamento
          </button>
        </form>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Doador</th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Tipo Sanguíneo</th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Data/Hora</th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Status</th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Ações</th>
              </tr>
            </thead>
            <tbody>
              {agendamentos.map(agendamento => (
                <tr key={agendamento.id_agendamento} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-3 text-gray-800">{agendamento.nome_completo}</td>
                  <td className="px-6 py-3 text-gray-800">{agendamento.tipo_sanguineo}</td>
                  <td className="px-6 py-3 text-gray-800">
                    {new Date(agendamento.data_agendamento).toLocaleString('pt-BR')}
                  </td>
                  <td className="px-6 py-3">
                    <select
                      value={agendamento.status}
                      onChange={(e) => handleStatusChange(agendamento.id_agendamento, e.target.value)}
                      className={`px-3 py-1 rounded-full font-semibold cursor-pointer ${getStatusColor(agendamento.status)}`}
                    >
                      <option value="Pendente">Pendente</option>
                      <option value="Confirmado">Confirmado</option>
                      <option value="Realizado">Realizado</option>
                      <option value="Cancelado">Cancelado</option>
                    </select>
                  </td>
                  <td className="px-6 py-3">
                    <button
                      onClick={() => handleDelete(agendamento.id_agendamento)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition-colors"
                    >
                      Cancelar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
