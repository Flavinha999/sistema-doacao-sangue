import React, { useState, useEffect } from 'react'
import axios from 'axios'

const API_URL = 'http://localhost:5000/api'

export default function Estoque() {
  const [estoque, setEstoque] = useState([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [newQuantity, setNewQuantity] = useState('')

  useEffect(() => {
    fetchEstoque()
  }, [])

  const fetchEstoque = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${API_URL}/estoque`)
      setEstoque(response.data)
    } catch (error) {
      console.error('Erro ao buscar estoque:', error)
      setMessage({ type: 'error', text: 'Erro ao carregar estoque' })
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateQuantity = async (tipo) => {
    if (!newQuantity || isNaN(newQuantity)) {
      setMessage({ type: 'error', text: 'Quantidade inválida' })
      return
    }

    try {
      await axios.put(`${API_URL}/estoque/${tipo}`, {
        quantidade_ml: parseInt(newQuantity)
      })
      setMessage({ type: 'success', text: 'Estoque atualizado com sucesso!' })
      setEditingId(null)
      setNewQuantity('')
      fetchEstoque()
    } catch (error) {
      setMessage({ type: 'error', text: 'Erro ao atualizar estoque' })
    }
  }

  if (loading) {
    return <div className="text-center py-8">Carregando...</div>
  }

  const getTipoColor = (tipo) => {
    const base = tipo.replace(/[+-]/g, '')
    const colors = {
      'A': 'bg-blue-100 border-blue-500',
      'B': 'bg-red-100 border-red-500',
      'AB': 'bg-purple-100 border-purple-500',
      'O': 'bg-green-100 border-green-500'
    }
    return colors[base] || 'bg-gray-100 border-gray-500'
  }

  const getStockStatus = (quantidade) => {
    if (quantidade === 0) return { status: 'Crítico', color: 'text-red-600', bg: 'bg-red-50' }
    if (quantidade < 500) return { status: 'Baixo', color: 'text-yellow-600', bg: 'bg-yellow-50' }
    if (quantidade < 1000) return { status: 'Normal', color: 'text-blue-600', bg: 'bg-blue-50' }
    return { status: 'Alto', color: 'text-green-600', bg: 'bg-green-50' }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">Estoque de Sangue</h2>

      {message && (
        <div className={`p-4 rounded-lg ${
          message.type === 'success'
            ? 'bg-green-100 border border-green-400 text-green-700'
            : 'bg-red-100 border border-red-400 text-red-700'
        }`}>
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {estoque.map(item => {
          const status = getStockStatus(item.quantidade_ml)
          return (
            <div
              key={item.id_estoque}
              className={`p-6 rounded-lg border-2 ${getTipoColor(item.tipo_sanguineo)} ${status.bg}`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Tipo Sanguíneo</p>
                  <p className="text-3xl font-bold text-gray-800">{item.tipo_sanguineo}</p>
                </div>
                <span className="text-3xl">🩸</span>
              </div>

              <div className="mb-4">
                <p className="text-gray-600 text-sm font-medium">Quantidade</p>
                {editingId === item.id_estoque ? (
                  <div className="flex gap-2 mt-2">
                    <input
                      type="number"
                      value={newQuantity}
                      onChange={(e) => setNewQuantity(e.target.value)}
                      className="flex-1 px-2 py-1 border border-gray-300 rounded"
                      placeholder="ml"
                    />
                    <button
                      onClick={() => handleUpdateQuantity(item.tipo_sanguineo)}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                    >
                      ✓
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-2xl font-bold text-gray-800">{item.quantidade_ml} ml</p>
                    <button
                      onClick={() => {
                        setEditingId(item.id_estoque)
                        setNewQuantity(item.quantidade_ml)
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                    >
                      Editar
                    </button>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t">
                <p className={`text-sm font-semibold ${status.color}`}>
                  Status: {status.status}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Resumo e Recomendações */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Resumo e Recomendações</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📊</span>
            <div>
              <p className="font-semibold text-gray-800">Total em Estoque</p>
              <p className="text-gray-600">
                {estoque.reduce((a, b) => a + b.quantidade_ml, 0)} ml
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xl">⚠️</span>
            <div>
              <p className="font-semibold text-gray-800">Tipos em Nível Crítico</p>
              <p className="text-gray-600">
                {estoque.filter(e => e.quantidade_ml === 0).map(e => e.tipo_sanguineo).join(', ') || 'Nenhum'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <p className="font-semibold text-gray-800">Recomendação</p>
              <p className="text-gray-600">
                Mantenha um mínimo de 500ml por tipo sanguíneo para garantir disponibilidade
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Histórico de Atualizações */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Última Atualização</h3>
        <div className="space-y-2">
          {estoque.map(item => (
            <div key={item.id_estoque} className="flex justify-between items-center py-2 border-b">
              <span className="font-medium text-gray-800">{item.tipo_sanguineo}</span>
              <span className="text-gray-600 text-sm">
                {new Date(item.data_atualizacao).toLocaleString('pt-BR')}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
