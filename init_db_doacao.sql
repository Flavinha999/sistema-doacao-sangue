-- Criação do Banco de Dados
CREATE DATABASE IF NOT EXISTS doacao_sangue_db;
USE doacao_sangue_db;

-- Tabela de Doadores
CREATE TABLE IF NOT EXISTS doadores (
    id_doador INT AUTO_INCREMENT PRIMARY KEY,
    nome_completo VARCHAR(255) NOT NULL,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    data_nascimento DATE NOT NULL,
    sexo ENUM('M', 'F', 'O') NOT NULL,
    tipo_sanguineo VARCHAR(3) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    telefone VARCHAR(20),
    endereco VARCHAR(255),
    cidade VARCHAR(100),
    estado VARCHAR(2),
    cep VARCHAR(10),
    ultima_doacao DATE,
    apto_doar BOOLEAN DEFAULT TRUE,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Usuários (Administradores)
CREATE TABLE IF NOT EXISTS usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nome_usuario VARCHAR(50) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    perfil ENUM('Admin', 'Operador') DEFAULT 'Operador',
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Agendamentos
CREATE TABLE IF NOT EXISTS agendamentos (
    id_agendamento INT AUTO_INCREMENT PRIMARY KEY,
    id_doador INT NOT NULL,
    data_agendamento DATETIME NOT NULL,
    status ENUM('Pendente', 'Confirmado', 'Realizado', 'Cancelado') DEFAULT 'Pendente',
    observacoes TEXT,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_doador) REFERENCES doadores(id_doador) ON DELETE CASCADE
);

-- Tabela de Estoque de Sangue
CREATE TABLE IF NOT EXISTS estoque_sangue (
    id_estoque INT AUTO_INCREMENT PRIMARY KEY,
    tipo_sanguineo VARCHAR(3) UNIQUE NOT NULL,
    quantidade_ml INT DEFAULT 0,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Inserção de Tipos Sanguíneos Iniciais no Estoque
INSERT IGNORE INTO estoque_sangue (tipo_sanguineo, quantidade_ml) VALUES 
('A+', 0), ('A-', 0), ('B+', 0), ('B-', 0), 
('AB+', 0), ('AB-', 0), ('O+', 0), ('O-', 0);

-- Inserção de um Usuário Administrador Inicial (Senha: admin123 - será criptografada no sistema real)
-- Aqui usamos um hash simples para exemplo, no sistema real usaremos bcrypt
INSERT IGNORE INTO usuarios (nome_usuario, senha, email, perfil) VALUES 
('admin', '$2b$10$X7v/K/K7v/K7v/K7v/K7v.K7v/K7v/K7v/K7v/K7v/K7v/K7v/K7v', 'admin@fccr.sp.gov.br', 'Admin');
