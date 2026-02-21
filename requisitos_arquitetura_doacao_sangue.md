# Sistema Web de Gestão de Doação de Sangue - 

## 1. Análise do Problema

Atualmente, a gestão de doadores de sangue e o agendamento de doações podem ser processos complexos e ineficientes, resultando em:

- **Dificuldade na captação de doadores:** A falta de um sistema centralizado dificulta a comunicação com potenciais doadores e a divulgação de campanhas.
- **Processo de agendamento manual:** Agendamentos feitos por telefone ou presencialmente são suscetíveis a erros, retrabalho e longos tempos de espera.
- **Falta de histórico do doador:** A ausência de um registro digitalizado e acessível do histórico de doações impede o acompanhamento eficaz e a comunicação personalizada.
- **Ineficiência na gestão de estoque:** Sem dados em tempo real sobre a disponibilidade de sangue, a gestão de estoque se torna reativa e menos estratégica.
- **Barreiras de acesso:** A falta de uma plataforma online pode dificultar o acesso de doadores que preferem a conveniência digital.

O objetivo deste sistema é otimizar o processo de doação de sangue, desde o cadastro do doador até o agendamento e acompanhamento, garantindo maior eficiência, transparência e acessibilidade.

## 2. Requisitos do Sistema

### 2.1. Requisitos Funcionais (RF)

O sistema deverá permitir:

- **RF001: Cadastro de Doador:** Registrar informações completas do doador (nome, CPF, data de nascimento, sexo, tipo sanguíneo, contato, endereço, histórico de doenças, etc.).
- **RF002: Login e Autenticação:** Permitir que doadores e administradores acessem o sistema com credenciais seguras.
- **RF003: Agendamento de Doação:** Doador poderá visualizar datas e horários disponíveis e agendar sua doação.
- **RF004: Cancelamento/Reagendamento:** Doador poderá cancelar ou reagendar sua doação.
- **RF005: Histórico de Doações:** Visualizar o histórico de doações realizadas por cada doador.
- **RF006: Gerenciamento de Doador (Admin):** Administradores poderão visualizar, editar e excluir cadastros de doadores.
- **RF007: Gerenciamento de Agendamentos (Admin):** Administradores poderão visualizar, confirmar, cancelar e gerenciar todos os agendamentos.
- **RF008: Gerenciamento de Estoque de Sangue (Admin):** Administradores poderão atualizar o estoque de cada tipo sanguíneo.
- **RF009: Campanhas de Doação (Admin):** Administradores poderão criar e gerenciar campanhas de doação, enviando notificações aos doadores.
- **RF010: Notificações:** Enviar lembretes de agendamento e convites para novas doações.
- **RF011: Busca e Filtro:** Pesquisar doadores por nome, tipo sanguíneo, data da última doação, etc.
- **RF012: Relatórios:** Gerar relatórios sobre doações realizadas, doadores ativos, estoque de sangue, etc.

### 2.2. Requisitos Não Funcionais (RNF)

- **RNF001: Usabilidade:** Interface intuitiva e fácil de usar para doadores e administradores.
- **RNF002: Desempenho:** O sistema deve responder rapidamente às requisições dos usuários.
- **RNF003: Segurança:** Proteção contra acessos não autorizados, vazamento de dados e ataques cibernéticos. Uso de HTTPS, criptografia de senhas e controle de acesso baseado em perfis.
- **RNF004: Confiabilidade:** O sistema deve estar disponível 24/7, com mínimo tempo de inatividade.
- **RNF005: Escalabilidade:** Capacidade de suportar um número crescente de usuários e dados sem perda de desempenho.
- **RNF006: Manutenibilidade:** Código limpo, modular e bem documentado para facilitar futuras atualizações e manutenções.
- **RNF007: Compatibilidade:** Compatível com os principais navegadores web (Chrome, Firefox, Edge, Safari) e dispositivos (desktop, tablet, mobile).
- **RNF008: Acessibilidade:** Conformidade com padrões de acessibilidade web (WCAG) para garantir uso por pessoas com deficiência.

## 3. Arquitetura da Aplicação

O sistema será desenvolvido utilizando uma arquitetura de três camadas (Front-End, Back-End e Banco de Dados), com comunicação via APIs RESTful.

### 3.1. Front-End

- **Tecnologia:** React (com Vite para agilidade no desenvolvimento)
- **Linguagem:** TypeScript
- **Estilização:** TailwindCSS (para responsividade e design moderno)
- **Descrição:** Interface do usuário responsiva e intuitiva, permitindo que doadores e administradores interajam com o sistema. Consumirá as APIs do Back-End para todas as operações de dados.

### 3.2. Back-End (API)

- **Tecnologia:** Node.js (com framework Express.js)
- **Linguagem:** JavaScript
- **Banco de Dados:** MySQL (via `mysql2`)
- **Descrição:** Responsável pela lógica de negócios, manipulação de dados, autenticação de usuários e exposição de APIs RESTful para o Front-End. Gerenciará o cadastro de doadores, agendamentos, estoque de sangue e outras funcionalidades administrativas.

### 3.3. Banco de Dados

- **Tecnologia:** MySQL
- **Descrição:** Armazenará todos os dados do sistema, incluindo informações de doadores, agendamentos, histórico de doações, tipos sanguíneos, estoque e usuários administradores.

### 3.4. Ferramentas de Desenvolvimento

- **IDE:** VS Code
- **Controle de Versão:** GitHub
- **Gerenciador de Pacotes:** npm

## 4. Modelagem de Dados (Esquema Preliminar)

### Tabela: `doadores`

| Campo             | Tipo de Dados      | Restrições        | Descrição                               |
|-------------------|--------------------|-------------------|-----------------------------------------|
| `id_doador`       | INT                | PRIMARY KEY, AI   | Identificador único do doador           |
| `nome_completo`   | VARCHAR(255)       | NOT NULL          | Nome completo do doador                 |
| `cpf`             | VARCHAR(14)        | UNIQUE, NOT NULL  | CPF do doador (formato XXX.XXX.XXX-XX)  |
| `data_nascimento` | DATE               | NOT NULL          | Data de nascimento do doador            |
| `sexo`            | ENUM("M", "F", "O") | NOT NULL          | Sexo do doador (Masculino, Feminino, Outro) |
| `tipo_sanguineo`  | VARCHAR(3)         | NOT NULL          | Tipo sanguíneo (ex: A+, O-, AB+)        |
| `email`           | VARCHAR(255)       | UNIQUE, NOT NULL  | E-mail do doador                        |
| `telefone`        | VARCHAR(20)        |                   | Telefone de contato                     |
| `endereco`        | VARCHAR(255)       |                   | Endereço completo                       |
| `cidade`          | VARCHAR(100)       |                   | Cidade                                  |
| `estado`          | VARCHAR(2)         |                   | Estado (UF)                             |
| `cep`             | VARCHAR(10)        |                   | CEP                                     |
| `ultima_doacao`   | DATE               |                   | Data da última doação                   |
| `apto_doar`       | BOOLEAN            | DEFAULT TRUE      | Indica se o doador está apto a doar     |
| `data_cadastro`   | TIMESTAMP          | DEFAULT CURRENT_TIMESTAMP | Data de registro do doador              |

### Tabela: `agendamentos`

| Campo             | Tipo de Dados      | Restrições        | Descrição                               |
|-------------------|--------------------|-------------------|-----------------------------------------|
| `id_agendamento`  | INT                | PRIMARY KEY, AI   | Identificador único do agendamento      |
| `id_doador`       | INT                | FOREIGN KEY       | Referência ao doador                    |
| `data_agendamento`| DATETIME           | NOT NULL          | Data e hora agendada para doação        |
| `status`          | ENUM("Pendente", "Confirmado", "Realizado", "Cancelado") | DEFAULT "Pendente" | Status do agendamento                   |
| `observacoes`     | TEXT               |                   | Observações adicionais                  |
| `data_criacao`    | TIMESTAMP          | DEFAULT CURRENT_TIMESTAMP | Data de criação do agendamento          |

### Tabela: `usuarios` (para administradores)

| Campo             | Tipo de Dados      | Restrições        | Descrição                               |
|-------------------|--------------------|-------------------|-----------------------------------------|
| `id_usuario`      | INT                | PRIMARY KEY, AI   | Identificador único do usuário          |
| `nome_usuario`    | VARCHAR(50)        | UNIQUE, NOT NULL  | Nome de usuário para login              |
| `senha`           | VARCHAR(255)       | NOT NULL          | Senha criptografada                     |
| `email`           | VARCHAR(255)       | UNIQUE, NOT NULL  | E-mail do usuário                       |
| `perfil`          | ENUM("Admin", "Operador") | DEFAULT "Operador" | Perfil de acesso                        |
| `data_cadastro`   | TIMESTAMP          | DEFAULT CURRENT_TIMESTAMP | Data de registro do usuário             |

### Tabela: `estoque_sangue`

| Campo             | Tipo de Dados      | Restrições        | Descrição                               |
|-------------------|--------------------|-------------------|-----------------------------------------|
| `id_estoque`      | INT                | PRIMARY KEY, AI   | Identificador único do estoque          |
| `tipo_sanguineo`  | VARCHAR(3)         | UNIQUE, NOT NULL  | Tipo sanguíneo (ex: A+, O-, AB+)        |
| `quantidade_ml`   | INT                | DEFAULT 0         | Quantidade em ml disponível             |
| `data_atualizacao`| TIMESTAMP          | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Última atualização do estoque           |

## 5. Próximos Passos

Com os requisitos e a arquitetura definidos, o próximo passo será a implementação do banco de dados MySQL, seguida pelo desenvolvimento do Back-End e Front-End.
