# AgênciaOS - SaaS para Agências de Marketing Digital

Sistema completo para gestão de agências de marketing digital com 31+ agentes IA integrados.

## 🚀 Funcionalidades

### 📊 Módulos Principais
- **Gestão de Projetos** - Kanban com drag-and-drop, tasks, prazos e timeline
- **Social Media** - Calendário editorial, agendamento de posts, analytics
- **Financeiro** - Receitas recorrentes, despesas, relatórios e dashboard
- **Central IA** - 31 agentes especializados em Meta Ads, Instagram, YouTube, Blog, WhatsApp

### 🤖 Agentes IA Incluídos
- **Meta Ads**: Persona, Copy, Segmentação, Testes A/B
- **Instagram**: Legendas, Hashtags, Ideias, Carrossel, Planejamento
- **YouTube**: Roteiros, SEO, Títulos, Otimização
- **Blog/SEO**: Artigos, Estruturas, Meta Descriptions, FAQs
- **WhatsApp**: Scripts, Templates, Vendas, Atendimento
- **CRM**: Atendimento, Follow-up, Pesquisas de Satisfação
- **Feed & Stories**: Posts completos com imagem + texto + hashtags

### 💰 Planos
- **Free**: 3 clientes, 5 projetos, 20 gerações IA/mês
- **Pro**: Ilimitado, 500 gerações IA/mês, R$197/mês

## 🏗️ Arquitetura

### Stack Tecnológica
- **Frontend**: Next.js 14 + TypeScript + Tailwind CSS + Shadcn UI
- **Backend**: Node.js + Fastify (futuro)
- **Database**: Neon Postgres + Prisma ORM
- **Auth**: NextAuth.js v5
- **State**: React Query (TanStack Query)
- **Forms**: React Hook Form + Zod
- **UI**: Radix UI + Tailwind + Lucide Icons
- **IA**: OpenAI GPT-4 + DALL-E 3
- **Queue**: Trigger.dev
- **Payments**: Digital Manager Guru
- **Deploy**: Vercel

### Estrutura do Monorepo
```
agenciasaas/
├── apps/
│   ├── web/              # Frontend Next.js
│   ├── api/              # Backend API (futuro)
│   └── admin/            # Painel admin (futuro)
├── packages/
│   ├── types/            # Tipos TypeScript compartilhados
│   ├── database/         # Prisma + utilities
│   ├── ui/               # Componentes UI (futuro)
│   └── utils/            # Funções utilitárias (futuro)
└── services/
    ├── ai-worker/        # Processamento IA (futuro)
    └── email-worker/     # Envio de emails (futuro)
```

## 🚀 Quick Start

### Pré-requisitos
- Node.js 18+
- PostgreSQL (recomendo Neon)
- Conta OpenAI
- Conta Digital Manager Guru

### 1. Instalação
```bash
# Clone o repositório
git clone <repository-url>
cd agenciasaas

# Instale dependências
npm install --legacy-peer-deps

# Configure variáveis de ambiente
cp .env.example .env.local
# Edite .env.local com suas configurações
```

### 2. Configuração do Banco
```bash
# Gere o client Prisma
npm run db:generate

# Execute as migrations (quando tiver um banco configurado)
npm run db:push

# Execute o seed para dados de exemplo
npm run db:seed
```

### 3. Desenvolvimento
```bash
# Inicie o frontend
npm run web

# Ou use o Turbo para todos os projetos
npm run dev
```

## 🗄️ Banco de Dados

### Modelos Principais
- **Agency** - Dados da agência (multi-tenant)
- **User** - Usuários da agência
- **Client** - Clientes da agência
- **Project** - Projetos por cliente
- **Task** - Tasks do Kanban
- **Revenue/Expense** - Gestão financeira
- **AIGeneration** - Histórico de gerações IA

### Multi-tenancy
Todos os dados são isolados por `agencyId`, garantindo que cada agência veja apenas seus próprios dados.

## 🤖 Sistema de IA

### Estrutura dos Agentes
```typescript
interface AIAgent {
  id: string
  name: string
  category: 'meta_ads' | 'instagram' | 'youtube' | 'blog' | 'whatsapp' | 'crm'
  inputSchema: Record<string, any>
  outputType: 'text' | 'image' | 'both'
}
```

### Controle de Uso
- **Free**: 20 gerações/mês
- **Pro**: 500 gerações/mês
- Tracking automático por agência
- Rate limiting inteligente

## 💳 Sistema de Pagamentos

### Digital Manager Guru
- Checkout externo sem comissões
- Gestão de assinaturas
- Webhooks para ativação/desativação
- Portal do cliente para upgrades

### Fluxo de Upgrade
1. Usuário atinge limite no plano Free
2. Redirecionamento para checkout Guru
3. Webhook confirma pagamento
4. Ativação automática do plano Pro

## 🔐 Autenticação

### NextAuth.js v5
- Sessões JWT
- Providers: Email/Senha, Google, GitHub
- Middleware para proteção de rotas
- Context de agência automático

### Permissões
- **Admin**: Acesso total à agência
- **Member**: Acesso limitado aos projetos atribuídos

## 📱 Interface

### Design System
- **Shadcn UI**: Componentes base
- **Radix UI**: Primitivos acessíveis
- **Tailwind CSS**: Estilização
- **Lucide Icons**: Ícones
- **Dark/Light Mode**: Suporte completo

### Componentes Principais
- Dashboard com métricas
- Kanban drag-and-drop
- Formulários validados
- Modais e drawers
- Calendário editorial
- Gráficos e relatórios

## 🚀 Deploy

### Preparação para 1000+ Agências
- **Frontend**: Vercel Pro
- **Database**: Neon Scale
- **Cache**: Upstash Redis
- **Queue**: Trigger.dev
- **Storage**: AWS S3

### Custos Estimados
- **Desenvolvimento**: R$2.800/mês
- **Receita** (500 Pro): R$98.500/mês
- **Lucro**: R$95.700/mês

## 📋 Roadmap

### Fase 1 - MVP (2 semanas)
- [x] Setup monorepo
- [x] Database schema
- [x] Tipos TypeScript
- [ ] Dashboard básico
- [ ] CRUD clientes/projetos
- [ ] 5 agentes IA principais

### Fase 2 - Core (2 semanas)
- [ ] Sistema de autenticação
- [ ] Kanban completo
- [ ] Módulo financeiro
- [ ] Todos os agentes IA

### Fase 3 - Social Media (2 semanas)
- [ ] Calendário editorial
- [ ] Agendamento de posts
- [ ] Preview e biblioteca
- [ ] Integração APIs sociais

### Fase 4 - Polimento (1 semana)
- [ ] Testes de carga
- [ ] Otimizações
- [ ] Deploy
- [ ] Lançamento

## 🤝 Contribuindo

1. Fork o repositório
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

**AgênciaOS** - Transformando como agências gerenciam seus negócios com o poder da IA.
