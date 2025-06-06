# Comandos Úteis - AgênciaOS

## 🏗️ Setup Inicial

```bash
# Instalar dependências
npm install --legacy-peer-deps

# Gerar client Prisma
npm run db:generate

# Configurar banco (quando tiver DATABASE_URL)
npm run db:push
npm run db:seed
```

## 🚀 Desenvolvimento

```bash
# Rodar apenas o frontend
npm run web

# Rodar todos os projetos
npm run dev

# Build de todos os projetos
npm run build

# Verificar tipos
npm run type-check

# Linter
npm run lint

# Formatar código
npm run format
```

## 🗄️ Database

```bash
# Gerar client após mudanças no schema
npm run db:generate

# Push schema para banco (desenvolvimento)
npm run db:push

# Criar e executar migration
npm run db:migrate

# Reset completo do banco
npm run db:reset

# Executar seed
npm run db:seed

# Abrir Prisma Studio
npm run db:studio
```

## 📦 Workspaces

```bash
# Instalar dependência em workspace específico
npm install <package> --workspace=@agenciasaas/web

# Executar script em workspace específico
npm run build --workspace=@agenciasaas/database

# Listar workspaces
npm run workspaces list
```

## 🧪 Testing (Futuro)

```bash
# Executar testes
npm run test

# Testes em modo watch
npm run test:watch

# Coverage
npm run test:coverage
```

## 🚀 Deploy

```bash
# Build de produção
npm run build

# Deploy frontend (Vercel)
vercel deploy

# Deploy banco (migrate)
npm run db:migrate:deploy
```

## 🔧 Troubleshooting

```bash
# Limpar cache do Turbo
npx turbo clean

# Limpar node_modules
rm -rf node_modules
npm install --legacy-peer-deps

# Regenerar Prisma
npm run db:generate

# Verificar dependências
npm ls
