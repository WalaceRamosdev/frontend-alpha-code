# Alpha Code - Projeto Refatorado

Este é o repositório principal do projeto Alpha Code, agora limpo e organizado.

## 🚀 Estrutura do Projeto

- `src/`: Código fonte da aplicação Astro.
- `backend/`: Servidor Express para processamento de contratos e funcionalidades auxiliares.
- `prisma/`: Esquema do banco de dados e migrações.
- `scripts/`: Scripts utilitários para manutenção e geração de conteúdo.
- `public/`: Assets estáticos.

## 🛠️ Comandos Principais

### Frontend (Raiz)
- `npm run dev`: Inicia o servidor de desenvolvimento.
- `npm run build`: Gera o build de produção (gera Prisma client + Astro build).
- `npx prisma studio`: Abre a interface visual do banco de dados.

### Backend (`/backend`)
- `node server.js`: Inicia o servidor backend.

## 🗄️ Banco de Dados
O projeto utiliza **SQLite** (`dev.db`) para desenvolvimento local via Prisma ORM.

## 🧹 Limpeza Realizada
O projeto passou por uma varredura completa onde foram removidos:
- Arquivos de log e erro acumulados.
- Pastas temporárias (`tmp`, `refactored-site`).
- Scripts de debug e testes unitários pontuais que já não eram necessários.
- Pasta de identidade visual redundante (assets principais estão em `public/`).
