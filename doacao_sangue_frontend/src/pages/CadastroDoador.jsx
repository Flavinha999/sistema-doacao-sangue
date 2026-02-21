import React, { useState } from 'react'
import axios from 'axios'

const API_URL = 'http://localhost:5000/api'

export default function CadastroDoador() {
  const [formData, setFormData] = useState({
    nome_completo: '',
    cpf: '',
    data_nascimento: '',
    sexo: 'M',
    tipo_sanguineo: 'O+',
    email: '',
    telefone: '',
    endereco: '',
    cidade: '',
    estado: 'SP',
    cep: ''
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const response = await axios.post(`${API_URL}/doadores`, formData)
      setMessage({ type: 'success', text: 'Doador cadastrado com sucesso!' })
      setFormData({
        nome_completo: '',
        cpf: '',
        data_nascimento: '',
        sexo: 'M',
        tipo_sanguineo: 'O+',
        email: '',
        telefone: '',
        endereco: '',
        cidade: '',
        estado: 'SP',
        cep: ''
      })
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.error || 'Erro ao cadastrar doador'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Cadastrar Novo Doador</h2>

      {message && (
        <div className={`mb-6 p-4 rounded-lg ${
          message.type === 'success'
            ? 'bg-green-100 border border-green-400 text-green-700'
            : 'bg-red-100 border border-red-400 text-red-700'
        }`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md space-y-6">
        {/* Linha 1: Nome e CPF */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Nome Completo *</label>
            <input
              type="text"
              name="nome_completo"
              value={formData.nome_completo}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-600"
              placeholder="João Silva Santos"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">CPF *</label>
            <input
              type="text"
              name="cpf"
              value={formData.cpf}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-600"
              placeholder="123.456.789-10"
            />
          </div>
        </div>

        {/* Linha 2: Data de Nascimento e Sexo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Data de Nascimento *</label>
            <input
              type="date"
              name="data_nascimento"
              value={formData.data_nascimento}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-600"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Sexo *</label>
            <select
              name="sexo"
              value={formData.sexo}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-600"
            >
              <option value="M">Masculino</option>
              <option value="F">Feminino</option>
              <option value="O">Outro</option>
            </select>
          </div>
        </div>

        {/* Linha 3: Tipo Sanguíneo e Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Tipo Sanguíneo *</label>
            <select
              name="tipo_sanguineo"
              value={formData.tipo_sanguineo}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-600"
            >
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-600"
              placeholder="joao@example.com"
            />
          </div>
        </div>

        {/* Linha 4: Telefone */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Telefone</label>
          <input
            type="tel"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-600"
            placeholder="(12) 98765-4321"
          />
        </div>

        {/* Linha 5: Endereço */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Endereço</label>
          <input
            type="text"
            name="endereco"
            value={formData.endereco}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-600"
            placeholder="Rua das Flores, 123"
          />
        </div>

        {/* Linha 6: Cidade, Estado e CEP */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Cidade</label>
            <input
              type="text"
              name="cidade"
              value={formData.cidade}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-600"
              placeholder="São José dos Campos"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Estado</label>
            <input
              type="text"
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              maxLength="2"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-600"
              placeholder="SP"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">CEP</label>
            <input
              type="text"
              name="cep"
              value={formData.cep}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-600"
              placeholder="12211-000"
            />
          </div>
        </div>

        {/* Botão de Envio */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? 'Cadastrando...' : 'Cadastrar Doador'}
          </button>
          <button
            type="reset"
            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 rounded-lg transition-colors"
          >
            Limpar Formulário
          </button>
        </div>
      </form>
    </div>
  )
}
