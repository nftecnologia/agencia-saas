import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function seed() {
  console.log('🌱 Iniciando seed do banco de dados...')

  // Criar agência de exemplo
  const hashedPassword = await bcrypt.hash('123456', 10)

  const agency = await prisma.agency.upsert({
    where: { slug: 'agencia-demo' },
    update: {},
    create: {
      name: 'Agência Demo',
      slug: 'agencia-demo',
      ownerId: '', // Será preenchido após criar o usuário
      plan: 'PRO',
      status: 'ACTIVE',
      settings: {
        branding: {
          logo: null,
          primaryColor: '#3B82F6',
          secondaryColor: '#64748B'
        },
        features: {
          socialMediaEnabled: true,
          financialEnabled: true,
          aiEnabled: true
        },
        limits: {
          maxClients: 999999,
          maxProjects: 999999,
          maxAIGenerations: 500,
          maxUsers: 999999
        },
        notifications: {
          emailOnNewClient: true,
          emailOnProjectComplete: true,
          emailOnPayment: true
        }
      },
      usage: {
        currentClients: 0,
        currentProjects: 0,
        aiGenerationsThisMonth: 0,
        storageUsedMB: 0,
        lastResetAt: new Date().toISOString()
      }
    }
  })

  // Criar usuário admin
  const user = await prisma.user.upsert({
    where: { email: 'admin@agenciademo.com' },
    update: {},
    create: {
      agencyId: agency.id,
      name: 'Admin Demo',
      email: 'admin@agenciademo.com',
      password: hashedPassword,
      role: 'ADMIN',
      isActive: true,
      permissions: ['*'] // Todas as permissões
    }
  })

  // Atualizar o ownerId da agência
  await prisma.agency.update({
    where: { id: agency.id },
    data: { ownerId: user.id }
  })

  // Criar clientes de exemplo
  const client1 = await prisma.client.create({
    data: {
      agencyId: agency.id,
      name: 'TechCorp Ltda',
      email: 'contato@techcorp.com',
      phone: '(11) 99999-9999',
      company: 'TechCorp Ltda',
      industry: 'Tecnologia',
      website: 'https://techcorp.com',
      contactPerson: 'João Silva',
      status: 'ACTIVE',
      contractType: 'MONTHLY',
      contractValue: 5000,
      notesText: 'Cliente premium com foco em marketing digital'
    }
  })

  const client2 = await prisma.client.create({
    data: {
      agencyId: agency.id,
      name: 'Café & Cia',
      email: 'marketing@cafeecia.com',
      phone: '(11) 88888-8888',
      company: 'Café & Cia',
      industry: 'Alimentação',
      website: 'https://cafeecia.com',
      contactPerson: 'Maria Santos',
      status: 'ACTIVE',
      contractType: 'PROJECT',
      contractValue: 3000,
      notesText: 'Rede de cafeterias com 5 lojas'
    }
  })

  // Criar projetos de exemplo
  const project1 = await prisma.project.create({
    data: {
      agencyId: agency.id,
      clientId: client1.id,
      name: 'Campanha Black Friday 2024',
      description: 'Campanha completa para Black Friday incluindo Meta Ads, Google Ads e conteúdo para redes sociais',
      status: 'IN_PROGRESS',
      priority: 'HIGH',
      budget: 15000,
      currency: 'BRL',
      startDate: new Date('2024-10-01'),
      deadline: new Date('2024-11-30'),
      assignedUsers: [user.id],
      tags: ['campanha', 'black-friday', 'ads']
    }
  })

  const project2 = await prisma.project.create({
    data: {
      agencyId: agency.id,
      clientId: client2.id,
      name: 'Gestão de Redes Sociais',
      description: 'Gestão mensal das redes sociais Instagram e Facebook',
      status: 'IN_PROGRESS',
      priority: 'MEDIUM',
      budget: 3000,
      currency: 'BRL',
      startDate: new Date('2024-01-01'),
      assignedUsers: [user.id],
      tags: ['social-media', 'mensal']
    }
  })

  // Criar boards padrão para os projetos
  const boards = [
    { name: 'A Fazer', position: 0, color: '#EF4444' },
    { name: 'Em Andamento', position: 1, color: '#F59E0B' },
    { name: 'Revisão', position: 2, color: '#3B82F6' },
    { name: 'Concluído', position: 3, color: '#10B981' }
  ]

  for (const project of [project1, project2]) {
    for (const boardData of boards) {
      await prisma.board.create({
        data: {
          projectId: project.id,
          agencyId: agency.id,
          ...boardData
        }
      })
    }
  }

  // Criar categorias de despesas padrão
  const expenseCategories = [
    { name: 'Marketing', color: '#3B82F6', subcategories: ['Google Ads', 'Facebook Ads', 'Materiais'] },
    { name: 'Operacional', color: '#10B981', subcategories: ['Aluguel', 'Luz', 'Internet'] },
    { name: 'Pessoal', color: '#F59E0B', subcategories: ['Salários', 'Benefícios', 'Treinamentos'] },
    { name: 'Tecnologia', color: '#8B5CF6', subcategories: ['Software', 'Hardware', 'Licenças'] }
  ]

  for (const categoryData of expenseCategories) {
    await prisma.expenseCategory.create({
      data: {
        agencyId: agency.id,
        name: categoryData.name,
        color: categoryData.color,
        isDefault: true,
        subcategories: categoryData.subcategories
      }
    })
  }

  console.log('✅ Seed completado!')
  console.log(`📧 Email: admin@agenciademo.com`)
  console.log(`🔑 Senha: 123456`)
}

seed()
  .catch((e) => {
    console.error('❌ Erro no seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
