const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function testLogin() {
  try {
    console.log('🔍 Verificando usuário no banco de dados...')
    
    const user = await prisma.user.findUnique({
      where: { email: 'admin@teste.com' },
      include: { agency: true }
    })
    
    if (!user) {
      console.log('❌ Usuário não encontrado!')
      return
    }
    
    console.log('✅ Usuário encontrado:')
    console.log('📧 Email:', user.email)
    console.log('👤 Nome:', user.name)
    console.log('🏢 Agência:', user.agency.name)
    console.log('🔑 Role:', user.role)
    console.log('✅ Ativo:', user.isActive)
    
    // Testar senha
    const passwordTest = await bcrypt.compare('123456', user.password)
    console.log('🔐 Senha "123456" válida:', passwordTest ? '✅ Sim' : '❌ Não')
    
    if (!passwordTest) {
      console.log('🔄 Recriando usuário com senha correta...')
      
      const hashedPassword = await bcrypt.hash('123456', 12)
      
      await prisma.user.update({
        where: { id: user.id },
        data: { password: hashedPassword }
      })
      
      console.log('✅ Senha atualizada com sucesso!')
    }
    
  } catch (error) {
    console.error('💥 Erro:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testLogin()
