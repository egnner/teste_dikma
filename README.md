# Sistema de Gerenciamento de Tarefas

Este é um sistema full stack para gerenciamento de tarefas, construído com NestJS (backend) e Next.js (frontend).

## 🚀 Tecnologias

### Backend
- NestJS
- TypeScript
- Jest para testes
- Swagger para documentação da API

### Frontend
- Next.js
- TypeScript
- Material UI
- Tailwind CSS
- React Testing Library

### DevOps
- Docker
- Docker Compose
- GitHub Actions (CI/CD)

## 📁 Estrutura do Projeto

```
.
├── backend/           # API NestJS
├── frontend/         # Aplicação Next.js
│   ├── public/      
│   │   └── images/   # Imagens estáticas
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/
│       ├── styles/
│       └── types/
└── docker-compose.yml
```

## 🔧 Como Executar

### Usando Docker (Recomendado)

1. Clone o repositório
2. Execute:
```bash
docker-compose up
```

O frontend estará disponível em `http://localhost:3000`
A API estará disponível em `http://localhost:3001`
Documentação Swagger: `http://localhost:3001/api`

### Desenvolvimento Local

#### Backend
```bash
cd backend
npm install
npm run start:dev
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 📝 Decisões Técnicas

### Backend
- Utilização de UUID para IDs das tarefas
- Armazenamento em memória usando array no service
- Validações usando class-validator
- Testes unitários com Jest
- Prevenção de títulos duplicados
- Tratamento de erros específicos (409 Conflict)

### Frontend
- Interface responsiva com Material UI e Tailwind CSS
- Design moderno com header personalizado
- Componentes reutilizáveis
- Sistema de busca reativo
- Feedback visual para ações do usuário (toasts)
- Layout adaptativo para mobile e desktop
- Botão de ação flutuante (FAB) responsivo
- Validações de formulário
- Tratamento de erros específicos

#### Componentes Principais
- Header com imagem de fundo personalizada
- TaskCard para exibição de tarefas
- TaskForm para criação/edição
- Footer com link para GitHub

#### Recursos de UI/UX
- Busca em tempo real
- Filtro por status
- Feedback visual para todas as ações
- Design responsivo para todos os dispositivos
- Animações e transições suaves

## 🚀 Deploy

### Frontend
O frontend pode ser facilmente deployado na Vercel:
1. Conecte o repositório do GitHub
2. Configure as variáveis de ambiente
3. A Vercel automaticamente detectará o projeto Next.js e fará o deploy

### Backend
Para o backend, recomenda-se AWS ECS (Elastic Container Service):
1. Criar um cluster ECS
2. Configurar uma task definition usando a imagem Docker do backend
3. Configurar um Application Load Balancer
4. Usar AWS ECR para armazenar a imagem Docker