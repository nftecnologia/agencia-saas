# 🚀 AgenciaSaaS

**Sistema SaaS completo para gestão de agências criativas e de desenvolvimento**

Uma plataforma moderna e profissional para gerenciar projetos, clientes, finanças e equipes, construída com tecnologias de ponta.

## ✨ Funcionalidades Principais

### 📊 Dashboard Executivo
- **Métricas em tempo real** - Receitas, despesas, projetos ativos
- **Gráficos interativos** - Visualização de dados financeiros
- **KPIs importantes** - Indicadores de performance da agência

### 👥 Gestão de Clientes
- **CRUD completo** - Criar, visualizar, editar e excluir clientes
- **Informações detalhadas** - Contatos, empresa, valor de contrato
- **Interface intuitiva** - Cards responsivos com busca e filtros

### 📋 Sistema Kanban de Projetos
- **Drag & Drop visual** - Movimentação intuitiva entre colunas
- **Gestão completa de tarefas** - Tasks integradas em cada projeto
- **Prioridades e prazos** - Sistema de alertas e notificações
- **Integração com clientes** - Seleção automática e sincronização de dados

### 💰 Módulo Financeiro
- **Controle de receitas** - Faturamento e recebimentos
- **Gestão de despesas** - Custos operacionais e investimentos
- **Relatórios automáticos** - Balanços e demonstrativos

### 🤖 Assistente IA
- **Análises inteligentes** - Insights sobre projetos e performance
- **Automação de tarefas** - Sugestões e otimizações
- **Interface conversacional** - Chat integrado ao sistema

### 🔐 Autenticação Segura
- **Next Auth integrado** - Login seguro e gestão de sessões
- **Middleware de proteção** - Rotas protegidas automaticamente
- **Callbacks personalizados** - Logs detalhados de autenticação

## 🛠️ Stack Tecnológica

### **Frontend**
- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática e segurança
- **Tailwind CSS** - Design system responsivo
- **Shadcn/ui** - Componentes acessíveis e modernos
- **Radix UI** - Primitivos de interface avançados

### **Backend & Database**
- **Neon Postgres** - Banco de dados serverless e escalável
- **Prisma ORM** - Modelagem e migrations automáticas
- **Server Actions** - API integrada do Next.js

### **Estado & Performance**
- **React Query (TanStack)** - Cache inteligente e sincronização
- **Zod** - Validação de schemas e tipos
- **React Hook Form** - Formulários otimizados

### **DevOps & Deploy**
- **Turborepo** - Monorepo com builds otimizados
- **Vercel** - Deploy automático e preview branches
- **TypeScript** - Tipagem em todo o projeto

## 📁 Estrutura do Projeto

```
agenciasaas/
├── apps/
│   └── web/                 # Aplicação Next.js principal
│       ├── src/
│       │   ├── app/         # App Router do Next.js
│       │   ├── components/  # Componentes reutilizáveis
│       │   ├── hooks/       # Hooks customizados (queries/mutations)
│       │   ├── lib/         # Utilitários e configurações
│       │   └── types/       # Definições de tipos
│       ├── public/          # Arquivos estáticos
│       └── package.json
├── packages/
│   ├── database/            # Schema Prisma e configurações DB
│   └── types/               # Tipos compartilhados
├── turbo.json              # Configuração do Turborepo
└── package.json            # Dependências do workspace
```

## 🚀 Começando

### **Pré-requisitos**
- Node.js 18+ 
- pnpm (recomendado)
- Conta no Neon Database

### **Instalação**

1. **Clone o repositório**
```bash
git clone <seu-repositorio>
cd agenciasaas
```

2. **Instale as dependências**
```bash
pnpm install
```

3. **Configure o banco de dados**
```bash
# Copie o arquivo de exemplo
cp .env.example .env.local

# Configure as variáveis de ambiente no .env.local:
# DATABASE_URL="sua-connection-string-neon"
# NEXTAUTH_SECRET="seu-secret-aqui"
# NEXTAUTH_URL="http://localhost:3000"
```

4. **Execute as migrations**
```bash
cd packages/database
pnpm db:push
pnpm db:seed
```

5. **Inicie o servidor de desenvolvimento**
```bash
pnpm dev
```

6. **Acesse a aplicação**
- URL: `http://localhost:3000`
- Login: `admin@teste.com` / `123456`

## 📱 Funcionalidades por Módulo

### **Dashboard (`/dashboard`)**
- Visão geral da agência
- Métricas financeiras
- Projetos em andamento
- Gráfico de receitas

### **Clientes (`/clientes`)**
- Listagem com busca e filtros
- Formulário de cadastro completo
- Edição e exclusão
- Cards responsivos

### **Projetos (`/projetos`)**
- Lista tradicional de projetos
- Filtros avançados
- Formulários detalhados

### **Kanban (`/kanban`)**
- Board visual drag & drop
- Gestão de tasks integrada
- Prioridades e prazos
- Integração com clientes

### **Financeiro (`/financeiro`)**
- Receitas e despesas
- Categorização automática
- Relatórios visuais

### **IA (`/ia`)**
- Assistente inteligente
- Análises de dados
- Sugestões de otimização

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
pnpm dev                    # Inicia servidor de desenvolvimento
pnpm build                  # Build de produção
pnpm start                  # Inicia servidor de produção

# Database
pnpm db:push               # Sincroniza schema com DB
pnpm db:seed               # Popula dados iniciais
pnpm db:studio             # Interface visual do Prisma

# Qualidade de código
pnpm lint                  # Executa ESLint
pnpm type-check           # Verifica tipos TypeScript
```

## 🌟 Destaques Técnicos

### **Architecture Patterns**
- **Server Components** - Performance otimizada por padrão
- **Client Components** - Interatividade quando necessário
- **Server Actions** - API type-safe integrada

### **Performance**
- **Static Generation** - Páginas pré-renderizadas
- **Incremental Static Regeneration** - Atualizações automáticas
- **Image Optimization** - Carregamento otimizado de imagens

### **Developer Experience**
- **TypeScript strict** - Tipagem rigorosa em todo projeto
- **Auto-imports** - Imports automáticos configurados
- **Hot Reload** - Desenvolvimento ágil

### **UI/UX**
- **Design System** - Componentes consistentes
- **Responsive Design** - Mobile-first approach
- **Accessibility** - Componentes acessíveis (WCAG)

## 🚦 Status do Projeto

- ✅ **Autenticação** - Completa e funcional
- ✅ **Dashboard** - Métricas e gráficos implementados
- ✅ **Gestão de Clientes** - CRUD completo
- ✅ **Sistema Kanban** - Drag & Drop + Tasks integradas
- ✅ **Módulo Financeiro** - Receitas e despesas
- ✅ **Integração entre Módulos** - Projetos + Clientes conectados
- 🔄 **Assistente IA** - Em desenvolvimento
- 📋 **Próximos passos** - Notificações e relatórios avançados

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🆘 Suporte

Se você encontrar algum problema ou tiver sugestões:

1. Verifique as [Issues existentes](../../issues)
2. Crie uma nova Issue com detalhes do problema
3. Entre em contato através dos canais de suporte

---

**Desenvolvido com ❤️ para revolucionar a gestão de agências criativas**
