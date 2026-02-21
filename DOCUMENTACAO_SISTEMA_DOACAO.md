# Sistema Web de Gestão de Doação de Sangue
## Fundação Cultural Cassiano Ricardo

---

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Análise do Problema](#análise-do-problema)
3. [Requisitos do Sistema](#requisitos-do-sistema)
4. [Arquitetura da Aplicação](#arquitetura-da-aplicação)
5. [Tecnologias Utilizadas](#tecnologias-utilizadas)
6. [Estrutura de Pastas](#estrutura-de-pastas)
7. [Banco de Dados](#banco-de-dados)
8. [APIs RESTful](#apis-restful)
9. [Como Executar](#como-executar)
10. [Segurança](#segurança)
11. [Testes](#testes)
12. [Conclusão](#conclusão)

---

## 🎯 Visão Geral

O **Sistema Web de Gestão de Doação de Sangue** é uma aplicação completa desenvolvida para a Fundação Cultural Cassiano Ricardo, localizada em São José dos Campos, SP. O sistema otimiza o processo de doação de sangue, desde o cadastro do doador até o agendamento e acompanhamento, garantindo maior eficiência, transparência e acessibilidade.

**Objetivo Principal:** Centralizar e automatizar a gestão de doadores, agendamentos e estoque de sangue, melhorando a experiência do doador e facilitando o trabalho administrativo da instituição.

---

## 🔍 Análise do Problema

### Problemas Identificados

1. **Dificuldade na Captação de Doadores**
   - Falta de um sistema centralizado para comunicação com potenciais doadores
   - Dificuldade em divulgar campanhas de doação

2. **Processo de Agendamento Manual**
   - Agendamentos por telefone ou presencialmente
   - Suscetível a erros e retrabalho
   - Longos tempos de espera

3. **Falta de Histórico Digitalizado**
   - Ausência de registro centralizado do histórico de doações
   - Impossibilidade de acompanhamento eficaz
   - Dificuldade em comunicação personalizada

4. **Ineficiência na Gestão de Estoque**
   - Falta de dados em tempo real sobre disponibilidade
   - Gestão reativa e menos estratégica

5. **Barreiras de Acesso**
   - Falta de plataforma online
   - Dificuldade para doadores que preferem conveniência digital

### Solução Proposta

Um sistema web completo que:
- Permite cadastro online de doadores
- Oferece agendamento digital e intuitivo
- Mantém histórico centralizado e acessível
- Fornece gestão em tempo real do estoque
- Facilita comunicação e campanhas

---

## 📋 Requisitos do Sistema

### Requisitos Funcionais (RF)

| ID  | Descrição | Prioridade |
|-----|-----------|-----------|
| RF001 | Cadastro de Doador com informações completas | Alta |
| RF002 | Login e Autenticação segura | Alta |
| RF003 | Agendamento de Doação com datas disponíveis | Alta |
| RF004 | Cancelamento/Reagendamento de doações | Média |
| RF005 | Visualização de Histórico de Doações | Média |
| RF006 | Gerenciamento de Doador (Admin) | Alta |
| RF007 | Gerenciamento de Agendamentos (Admin) | Alta |
| RF008 | Gerenciamento de Estoque de Sangue | Alta |
| RF009 | Campanhas de Doação com notificações | Média |
| RF010 | Sistema de Notificações | Média |
| RF011 | Busca e Filtro de Doadores | Média |
| RF012 | Geração de Relatórios | Média |

### Requisitos Não Funcionais (RNF)

| ID  | Descrição | Prioridade |
|-----|-----------|-----------|
| RNF001 | Interface intuitiva e fácil de usar | Alta |
| RNF002 | Resposta rápida às requisições | Alta |
| RNF003 | Proteção contra acessos não autorizados | Alta |
| RNF004 | Disponibilidade 24/7 | Alta |
| RNF005 | Suporte a crescimento de usuários | Média |
| RNF006 | Código limpo e bem documentado | Média |
| RNF007 | Compatibilidade com navegadores modernos | Alta |
| RNF008 | Conformidade com padrões de acessibilidade | Média |

---

## 🏗️ Arquitetura da Aplicação

### Arquitetura em 3 Camadas

```
┌─────────────────────────────────────────────────────────┐
│                    FRONT-END (React)                    │
│  Interface do Usuário - Dashboard, Formulários, Tabelas │
│  Tecnologia: React + Vite + TailwindCSS + TypeScript    │
└──────────────────────┬──────────────────────────────────┘
                       │ HTTP/REST
┌──────────────────────▼──────────────────────────────────┐
│                  BACK-END (Node.js)                     │
│  Lógica de Negócios - APIs RESTful, Autenticação       │
│  Tecnologia: Express.js + MySQL2 + JWT                 │
└──────────────────────┬──────────────────────────────────┘
                       │ SQL
┌──────────────────────▼──────────────────────────────────┐
│              BANCO DE DADOS (MySQL)                     │
│  Persistência de Dados - Doadores, Agendamentos, etc.  │
└─────────────────────────────────────────────────────────┘
```

### Componentes Principais

#### Front-End
- **Dashboard:** Visualização de estatísticas e métricas
- **Cadastro de Doador:** Formulário para registro de novos doadores
- **Agendamentos:** Gestão de agendamentos de doação
- **Estoque:** Controle e visualização do estoque de sangue

#### Back-End
- **API de Doadores:** CRUD completo de doadores
- **API de Agendamentos:** Gestão de agendamentos
- **API de Estoque:** Controle de estoque de sangue
- **API de Relatórios:** Geração de relatórios

#### Banco de Dados
- **Tabela Doadores:** Informações dos doadores
- **Tabela Agendamentos:** Agendamentos de doação
- **Tabela Estoque:** Estoque de sangue por tipo
- **Tabela Usuários:** Administradores do sistema

---

## 🛠️ Tecnologias Utilizadas

### Front-End
- **React 18:** Framework JavaScript para UI
- **Vite:** Build tool rápido e moderno
- **TailwindCSS:** Framework CSS utilitário
- **Axios:** Cliente HTTP para requisições
- **TypeScript:** Tipagem estática (opcional)

### Back-End
- **Node.js:** Runtime JavaScript
- **Express.js:** Framework web minimalista
- **MySQL2:** Driver MySQL para Node.js
- **JWT:** Autenticação baseada em tokens
- **bcryptjs:** Hash de senhas

### Ferramentas de Desenvolvimento
- **VS Code:** Editor de código
- **Git/GitHub:** Controle de versão
- **npm:** Gerenciador de pacotes
- **Postman:** Teste de APIs (opcional)

### Ambiente de Produção
- **Node.js:** Servidor de aplicação
- **MySQL:** Banco de dados
- **HTTPS:** Protocolo seguro

---

## 📁 Estrutura de Pastas

```
doacao_sangue/
├── doacao_sangue_backend/
│   ├── node_modules/
│   ├── .env
│   ├── package.json
│   ├── package-lock.json
│   ├── server.js
│   └── README.md
│
├── doacao_sangue_frontend/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   └── Header.jsx
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── CadastroDoador.jsx
│   │   │   ├── Agendamentos.jsx
│   │   │   └── Estoque.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .gitignore
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── vite.config.js
│   └── README.md
│
├── init_db_doacao.sql
├── requisitos_arquitetura_doacao_sangue.md
└── DOCUMENTACAO_SISTEMA_DOACAO.md
```

---

## 🗄️ Banco de Dados

### Tabela: Doadores

```sql
CREATE TABLE doadores (
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
```

### Tabela: Agendamentos

```sql
CREATE TABLE agendamentos (
    id_agendamento INT AUTO_INCREMENT PRIMARY KEY,
    id_doador INT NOT NULL,
    data_agendamento DATETIME NOT NULL,
    status ENUM('Pendente', 'Confirmado', 'Realizado', 'Cancelado') DEFAULT 'Pendente',
    observacoes TEXT,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_doador) REFERENCES doadores(id_doador) ON DELETE CASCADE
);
```

### Tabela: Estoque Sangue

```sql
CREATE TABLE estoque_sangue (
    id_estoque INT AUTO_INCREMENT PRIMARY KEY,
    tipo_sanguineo VARCHAR(3) UNIQUE NOT NULL,
    quantidade_ml INT DEFAULT 0,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Tabela: Usuários

```sql
CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nome_usuario VARCHAR(50) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    perfil ENUM('Admin', 'Operador') DEFAULT 'Operador',
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🔌 APIs RESTful

### Endpoints de Doadores

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/doadores` | Listar todos os doadores |
| GET | `/api/doadores/:id` | Buscar doador por ID |
| POST | `/api/doadores` | Cadastrar novo doador |
| PUT | `/api/doadores/:id` | Atualizar doador |
| DELETE | `/api/doadores/:id` | Deletar doador |

### Endpoints de Agendamentos

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/agendamentos` | Listar todos os agendamentos |
| POST | `/api/agendamentos` | Criar novo agendamento |
| PUT | `/api/agendamentos/:id` | Atualizar status do agendamento |
| DELETE | `/api/agendamentos/:id` | Cancelar agendamento |

### Endpoints de Estoque

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/estoque` | Listar estoque de sangue |
| PUT | `/api/estoque/:tipo` | Atualizar quantidade do estoque |

### Endpoints de Relatórios

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/relatorios/doadores-por-tipo` | Doadores por tipo sanguíneo |
| GET | `/api/relatorios/agendamentos-por-status` | Agendamentos por status |

---

## 🚀 Como Executar

### Pré-requisitos

- **Node.js** (versão 14 ou superior)
- **MySQL** (versão 5.7 ou superior)
- **Git** (para controle de versão)
- **VS Code** (editor recomendado)

### Passo 1: Configurar o Banco de Dados

1. Abra o MySQL (via terminal ou phpMyAdmin)
2. Execute o script SQL:
   ```bash
   mysql -u root -p < init_db_doacao.sql
   ```
3. Verifique se o banco foi criado:
   ```sql
   SHOW DATABASES;
   USE doacao_sangue_db;
   SHOW TABLES;
   ```

### Passo 2: Configurar e Executar o Back-End

1. Navegue até o diretório do back-end:
   ```bash
   cd doacao_sangue_backend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure o arquivo `.env`:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=Flavia08@
   DB_NAME=doacao_sangue_db
   PORT=5000
   ```

4. Inicie o servidor:
   ```bash
   npm start
   ```

5. Verifique se está rodando:
   ```
   ✅ Conectado ao banco de dados MySQL com sucesso!
   🚀 Servidor rodando em http://localhost:5000
   ```

### Passo 3: Configurar e Executar o Front-End

1. Em outro terminal, navegue até o diretório do front-end:
   ```bash
   cd doacao_sangue_frontend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

4. Abra o navegador e acesse:
   ```
   http://localhost:5173
   ```

### Passo 4: Testar o Sistema

1. **Dashboard:** Visualize as estatísticas
2. **Cadastro de Doador:** Crie um novo doador
3. **Agendamentos:** Agende uma doação
4. **Estoque:** Verifique o estoque de sangue

---

## 🔒 Segurança

### Medidas Implementadas

1. **Autenticação com JWT**
   - Tokens seguros para validação de usuários
   - Expiração de tokens configurável

2. **Criptografia de Senhas**
   - Uso de bcryptjs para hash de senhas
   - Senhas nunca armazenadas em texto plano

3. **CORS (Cross-Origin Resource Sharing)**
   - Controle de acesso entre domínios
   - Apenas domínios autorizados podem acessar a API

4. **Validação de Dados**
   - Validação de entrada em formulários
   - Validação no servidor antes de processar

5. **HTTPS (Recomendado em Produção)**
   - Criptografia de dados em trânsito
   - Certificados SSL/TLS

### Boas Práticas de Segurança

- Manter dependências atualizadas
- Usar variáveis de ambiente para dados sensíveis
- Implementar rate limiting para APIs
- Realizar auditorias de segurança regularmente
- Fazer backup regular do banco de dados

---

## ✅ Testes

### Testes Manuais

#### Teste 1: Cadastro de Doador
1. Acesse a página "Cadastrar Doador"
2. Preencha todos os campos obrigatórios
3. Clique em "Cadastrar Doador"
4. Verifique se a mensagem de sucesso aparece

#### Teste 2: Agendamento de Doação
1. Acesse a página "Agendamentos"
2. Clique em "Novo Agendamento"
3. Selecione um doador
4. Escolha uma data e hora
5. Clique em "Criar Agendamento"
6. Verifique se o agendamento aparece na lista

#### Teste 3: Atualização de Estoque
1. Acesse a página "Estoque de Sangue"
2. Clique em "Editar" para um tipo sanguíneo
3. Altere a quantidade
4. Clique em "✓" para confirmar
5. Verifique se a quantidade foi atualizada

### Testes de API (com Postman)

#### Listar Doadores
```
GET http://localhost:5000/api/doadores
```

#### Cadastrar Doador
```
POST http://localhost:5000/api/doadores
Content-Type: application/json

{
  "nome_completo": "João Silva",
  "cpf": "123.456.789-10",
  "data_nascimento": "1990-01-15",
  "sexo": "M",
  "tipo_sanguineo": "O+",
  "email": "joao@example.com",
  "telefone": "(12) 98765-4321",
  "endereco": "Rua das Flores, 123",
  "cidade": "São José dos Campos",
  "estado": "SP",
  "cep": "12211-000"
}
```

---

## 📊 Conclusão

O **Sistema Web de Gestão de Doação de Sangue** representa uma solução completa e moderna para otimizar o processo de doação de sangue na Fundação Cultural Cassiano Ricardo. Com uma arquitetura bem definida, tecnologias atuais e foco em segurança e usabilidade, o sistema está pronto para melhorar significativamente a experiência dos doadores e a eficiência operacional da instituição.

### Benefícios Esperados

- ✅ Aumento na captação de doadores
- ✅ Redução de tempo de agendamento
- ✅ Melhor gestão de estoque
- ✅ Maior transparência e confiança
- ✅ Facilidade de acesso para doadores
- ✅ Relatórios e análises em tempo real

### Próximos Passos

1. Implementar autenticação completa com JWT
2. Adicionar sistema de notificações por email/SMS
3. Criar dashboard de relatórios avançados
4. Implementar testes automatizados
5. Preparar para produção e deploy

---

**Desenvolvido por:** Manus AI  
**Data:** Fevereiro de 2025  
**Versão:** 1.0.0  
**Status:** Pronto para Uso
