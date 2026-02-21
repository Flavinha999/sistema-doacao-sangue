const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(',') || '*',
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuração da conexão com o banco de dados
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

// Conectar ao banco de dados
db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    process.exit(1);
  }
  console.log('✅ Conectado ao banco de dados MySQL com sucesso!');
});

// Rota de teste
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Servidor de Doação de Sangue está rodando!',
    timestamp: new Date()
  });
});

// ========== ROTAS DE DOADORES ==========

// GET - Listar todos os doadores
app.get('/api/doadores', (req, res) => {
  const sql = 'SELECT * FROM doadores';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao buscar doadores:', err);
      return res.status(500).json({ error: 'Erro ao buscar doadores' });
    }
    res.status(200).json(results);
  });
});

// GET - Buscar doador por ID
app.get('/api/doadores/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM doadores WHERE id_doador = ?';
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Erro ao buscar doador:', err);
      return res.status(500).json({ error: 'Erro ao buscar doador' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Doador não encontrado' });
    }
    res.status(200).json(results[0]);
  });
});

// POST - Cadastrar novo doador
app.post('/api/doadores', (req, res) => {
  const {
    nome_completo,
    cpf,
    data_nascimento,
    sexo,
    tipo_sanguineo,
    email,
    telefone,
    endereco,
    cidade,
    estado,
    cep
  } = req.body;

  // Validação básica
  if (!nome_completo || !cpf || !data_nascimento || !sexo || !tipo_sanguineo || !email) {
    return res.status(400).json({ error: 'Campos obrigatórios não preenchidos' });
  }

  const sql = `INSERT INTO doadores 
    (nome_completo, cpf, data_nascimento, sexo, tipo_sanguineo, email, telefone, endereco, cidade, estado, cep) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(sql, [
    nome_completo,
    cpf,
    data_nascimento,
    sexo,
    tipo_sanguineo,
    email,
    telefone,
    endereco,
    cidade,
    estado,
    cep
  ], (err, results) => {
    if (err) {
      console.error('Erro ao cadastrar doador:', err);
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ error: 'CPF ou E-mail já cadastrado' });
      }
      return res.status(500).json({ error: 'Erro ao cadastrar doador' });
    }
    res.status(201).json({
      message: 'Doador cadastrado com sucesso!',
      id_doador: results.insertId
    });
  });
});

// PUT - Atualizar doador
app.put('/api/doadores/:id', (req, res) => {
  const { id } = req.params;
  const {
    nome_completo,
    data_nascimento,
    sexo,
    tipo_sanguineo,
    email,
    telefone,
    endereco,
    cidade,
    estado,
    cep,
    apto_doar
  } = req.body;

  const sql = `UPDATE doadores SET 
    nome_completo = ?, 
    data_nascimento = ?, 
    sexo = ?, 
    tipo_sanguineo = ?, 
    email = ?, 
    telefone = ?, 
    endereco = ?, 
    cidade = ?, 
    estado = ?, 
    cep = ?,
    apto_doar = ?
    WHERE id_doador = ?`;

  db.query(sql, [
    nome_completo,
    data_nascimento,
    sexo,
    tipo_sanguineo,
    email,
    telefone,
    endereco,
    cidade,
    estado,
    cep,
    apto_doar,
    id
  ], (err, results) => {
    if (err) {
      console.error('Erro ao atualizar doador:', err);
      return res.status(500).json({ error: 'Erro ao atualizar doador' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Doador não encontrado' });
    }
    res.status(200).json({ message: 'Doador atualizado com sucesso!' });
  });
});

// DELETE - Deletar doador
app.delete('/api/doadores/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM doadores WHERE id_doador = ?';
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Erro ao deletar doador:', err);
      return res.status(500).json({ error: 'Erro ao deletar doador' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Doador não encontrado' });
    }
    res.status(200).json({ message: 'Doador deletado com sucesso!' });
  });
});

// ========== ROTAS DE AGENDAMENTOS ==========

// GET - Listar todos os agendamentos
app.get('/api/agendamentos', (req, res) => {
  const sql = `SELECT a.*, d.nome_completo, d.tipo_sanguineo, d.email, d.telefone 
    FROM agendamentos a 
    JOIN doadores d ON a.id_doador = d.id_doador 
    ORDER BY a.data_agendamento DESC`;
  
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao buscar agendamentos:', err);
      return res.status(500).json({ error: 'Erro ao buscar agendamentos' });
    }
    res.status(200).json(results);
  });
});

// POST - Criar novo agendamento
app.post('/api/agendamentos', (req, res) => {
  const {
    id_doador,
    data_agendamento,
    observacoes
  } = req.body;

  if (!id_doador || !data_agendamento) {
    return res.status(400).json({ error: 'Campos obrigatórios não preenchidos' });
  }

  const sql = `INSERT INTO agendamentos (id_doador, data_agendamento, observacoes) 
    VALUES (?, ?, ?)`;

  db.query(sql, [id_doador, data_agendamento, observacoes], (err, results) => {
    if (err) {
      console.error('Erro ao criar agendamento:', err);
      return res.status(500).json({ error: 'Erro ao criar agendamento' });
    }
    res.status(201).json({
      message: 'Agendamento criado com sucesso!',
      id_agendamento: results.insertId
    });
  });
});

// PUT - Atualizar status do agendamento
app.put('/api/agendamentos/:id', (req, res) => {
  const { id } = req.params;
  const { status, observacoes } = req.body;

  const sql = 'UPDATE agendamentos SET status = ?, observacoes = ? WHERE id_agendamento = ?';
  db.query(sql, [status, observacoes, id], (err, results) => {
    if (err) {
      console.error('Erro ao atualizar agendamento:', err);
      return res.status(500).json({ error: 'Erro ao atualizar agendamento' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Agendamento não encontrado' });
    }
    res.status(200).json({ message: 'Agendamento atualizado com sucesso!' });
  });
});

// DELETE - Cancelar agendamento
app.delete('/api/agendamentos/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM agendamentos WHERE id_agendamento = ?';
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Erro ao cancelar agendamento:', err);
      return res.status(500).json({ error: 'Erro ao cancelar agendamento' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Agendamento não encontrado' });
    }
    res.status(200).json({ message: 'Agendamento cancelado com sucesso!' });
  });
});

// ========== ROTAS DE ESTOQUE ==========

// GET - Listar estoque de sangue
app.get('/api/estoque', (req, res) => {
  const sql = 'SELECT * FROM estoque_sangue ORDER BY tipo_sanguineo';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao buscar estoque:', err);
      return res.status(500).json({ error: 'Erro ao buscar estoque' });
    }
    res.status(200).json(results);
  });
});

// PUT - Atualizar quantidade do estoque
app.put('/api/estoque/:tipo', (req, res) => {
  const { tipo } = req.params;
  const { quantidade_ml } = req.body;

  if (quantidade_ml === undefined) {
    return res.status(400).json({ error: 'Quantidade não informada' });
  }

  const sql = 'UPDATE estoque_sangue SET quantidade_ml = ? WHERE tipo_sanguineo = ?';
  db.query(sql, [quantidade_ml, tipo], (err, results) => {
    if (err) {
      console.error('Erro ao atualizar estoque:', err);
      return res.status(500).json({ error: 'Erro ao atualizar estoque' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Tipo sanguíneo não encontrado' });
    }
    res.status(200).json({ message: 'Estoque atualizado com sucesso!' });
  });
});

// ========== ROTAS DE RELATÓRIOS ==========

// GET - Relatório de doadores por tipo sanguíneo
app.get('/api/relatorios/doadores-por-tipo', (req, res) => {
  const sql = `SELECT tipo_sanguineo, COUNT(*) as total 
    FROM doadores 
    GROUP BY tipo_sanguineo 
    ORDER BY tipo_sanguineo`;
  
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao gerar relatório:', err);
      return res.status(500).json({ error: 'Erro ao gerar relatório' });
    }
    res.status(200).json(results);
  });
});

// GET - Relatório de agendamentos por status
app.get('/api/relatorios/agendamentos-por-status', (req, res) => {
  const sql = `SELECT status, COUNT(*) as total 
    FROM agendamentos 
    GROUP BY status`;
  
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao gerar relatório:', err);
      return res.status(500).json({ error: 'Erro ao gerar relatório' });
    }
    res.status(200).json(results);
  });
});

// Rota 404
app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`📊 API de Doação de Sangue - Fundação Cassiano Ricardo`);
});

module.exports = app;
