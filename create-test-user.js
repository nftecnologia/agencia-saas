const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function createTestUser() {
  try {
    // Criar agência de teste
    console.log('Criando agência de teste...')
    const agency = await prisma.agency.create({
      data: {
        name: 'Agência Teste',
        slug: 'agencia-teste',
        ownerId: 'temp', // Será atualizado depois
        plan: 'FREE',
        status: 'ACTIVE',
      }
    })

    // Hash da senha
    const hashedPassword = await bcrypt.hash('123456', 12)

    // Criar usuário de teste
    console.log('Criando usuário de teste...')
    const user = await prisma.user.create({
      data: {
        agencyId: agency.id,
        name: 'Admin Teste',
        email: 'admin@teste.com',
        password: hashedPassword,
        role: 'ADMIN',
        isActive: true,
      }
    })

    // Atualizar agência com o owner correto
    await prisma.agency.update({
      where: { id: agency.id },
      data: { ownerId: user.id }
    })

    console.log('✅ Usuário criado com sucesso!')
    console.log('📧 Email: admin@teste.com')
    console.log('🔑 Senha: 123456')
    console.log('🏢 Agência:', agency.name)

  } catch (error) {
    console.error('❌ Erro ao criar usuário:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createTestUser()
