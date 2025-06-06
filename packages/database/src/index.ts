import { PrismaClient } from '@prisma/client'

// Global instance para evitar múltiplas conexões em desenvolvimento
declare global {
  var __prisma: PrismaClient | undefined
}

const prisma = global.__prisma || new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
})

if (process.env.NODE_ENV === 'development') {
  global.__prisma = prisma
}

export { prisma as db }
export * from '@prisma/client'

// Utility functions para multi-tenancy
export const withAgencyFilter = <T extends { agencyId: string }>(
  agencyId: string,
  data: Omit<T, 'agencyId'>
): T => {
  return { ...data, agencyId } as T
}

export const getAgencyContext = (agencyId: string) => {
  return {
    where: { agencyId },
    include: {
      agency: true
    }
  }
}

// Helper para validar acesso à agência
export const validateAgencyAccess = async (agencyId: string, userId: string) => {
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
      agencyId,
      isActive: true
    },
    include: {
      agency: true
    }
  })

  if (!user) {
    throw new Error('Acesso negado à agência')
  }

  return user
}

// Helper para obter limites da agência
export const getAgencyLimits = async (agencyId: string) => {
  const agency = await prisma.agency.findUnique({
    where: { id: agencyId },
    select: {
      plan: true,
      settings: true,
      usage: true
    }
  })

  if (!agency) {
    throw new Error('Agência não encontrada')
  }

  const settings = agency.settings as any
  const usage = agency.usage as any

  const limits = agency.plan === 'FREE' ? {
    maxClients: 3,
    maxProjects: 5,
    maxAIGenerations: 20,
    maxUsers: 3
  } : {
    maxClients: 999999,
    maxProjects: 999999,
    maxAIGenerations: 500,
    maxUsers: 999999
  }

  return {
    limits,
    usage: {
      currentClients: usage.currentClients || 0,
      currentProjects: usage.currentProjects || 0,
      aiGenerationsThisMonth: usage.aiGenerationsThisMonth || 0,
      storageUsedMB: usage.storageUsedMB || 0
    }
  }
}

// Helper para verificar se pode criar cliente
export const canCreateClient = async (agencyId: string) => {
  const { limits, usage } = await getAgencyLimits(agencyId)
  return usage.currentClients < limits.maxClients
}

// Helper para verificar se pode criar projeto
export const canCreateProject = async (agencyId: string) => {
  const { limits, usage } = await getAgencyLimits(agencyId)
  return usage.currentProjects < limits.maxProjects
}

// Helper para verificar se pode usar IA
export const canUseAI = async (agencyId: string) => {
  const { limits, usage } = await getAgencyLimits(agencyId)
  return usage.aiGenerationsThisMonth < limits.maxAIGenerations
}

// Helper para incrementar uso de IA
export const incrementAIUsage = async (agencyId: string) => {
  const agency = await prisma.agency.findUnique({
    where: { id: agencyId },
    select: { usage: true }
  })

  if (!agency) return

  const usage = agency.usage as any
  const newUsage = {
    ...usage,
    aiGenerationsThisMonth: (usage.aiGenerationsThisMonth || 0) + 1
  }

  await prisma.agency.update({
    where: { id: agencyId },
    data: { usage: newUsage }
  })
}
