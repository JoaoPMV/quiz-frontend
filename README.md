# Quiz

Aplicação web para ajudar pessoas a aprimorar inglês. Consiste em um jogo de perguntas e respostas com 3.716 perguntas no Banco de Dados.

### Objetivo

Oferecer uma experiência interativa de estudo com feedback sobre o desempenho.

## Tecnologias Utilizadas

### Frontend

- React + Vite
- JavaScript
- CSS
- React Router

### Backend (API)

- Python
- Flask
- JWT (autenticação)
- PostgreSQL
- bcrypt

---

## Funcionalidades

- Cadastro de usuários
- Login com autenticação JWT
- Rotas protegidas por token
- Codificação para evitar repetição de perguntas.
- Feedback sobre desempenho do usuário.
- Interface responsiva

---

## Melhorias Futuras

- [ ] Histórico de desempenho do usuário
- [ ] Suporte a múltiplos idiomas
- [ ] Modo revisão de palavras aprendidas

---

## Como Executar o Projeto

### Pré-requisitos

- Node.js instalado
- Backend da aplicação em execução

### 1. Clonar o repositório

```bash
git clone https://github.com/JoaoPMV/quiz-frontend.git
```

### 2. Acessar a pasta do projeto

```bash
cd frontend
```

### 3. Instalar as dependências

```bash
npm install
```

### 4. Configurar variáveis de ambiente

Crie um arquivo `.env.development` na raiz do projeto com:

```env
VITE_API_URL=http://SEU_BACKEND_HOST:PORTA
```

Exemplo:

```env
VITE_API_URL=http://localhost:3000
```

### 5. Executar o projeto

```bash
npm run dev
```

A aplicação ficará disponível em:

```bash
http://localhost:5173
```

---

## Backend da Aplicação

Este repositório contém apenas o frontend da aplicação.  
O backend (API) está disponível em:  
https://github.com/JoaoPMV/quiz-backend

---

## Autor

Desenvolvido por **JoaoPMV**  
GitHub: https://github.com/JoaoPMV
