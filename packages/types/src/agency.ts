import { BaseEntity } from './common'

export type Agency = BaseEntity & {
  name: string
  slug: string
  ownerId: string
  plan: 'free' | 'pro'
  status: 'active' | 'suspended' | 'cancelled'
  settings: AgencySettings
  billing?: BillingInfo
  usage: UsageStats
}

export type AgencySettings = {
  branding: {
    logo?: string
    primaryColor?: string
    secondaryColor?: string
  }
  features: {
    socialMediaEnabled: boolean
    financialEnabled: boolean
    aiEnabled: boolean
  }
  limits: {
    maxClients: number
    maxProjects: number
    maxAIGenerations: number
    maxUsers: number
  }
  notifications: {
    emailOnNewClient: boolean
    emailOnProjectComplete: boolean
    emailOnPayment: boolean
  }
}

export type BillingInfo = {
  guruCustomerId?: string
  guruSubscriptionId?: string
  currentPeriodStart: Date
  currentPeriodEnd: Date
  cancelAtPeriodEnd: boolean
}

export type UsageStats = {
  currentClients: number
  currentProjects: number
  aiGenerationsThisMonth: number
  storageUsedMB: number
  lastResetAt: Date
}

export type AgencyInvite = BaseEntity & {
  agencyId: string
  email: string
  role: 'admin' | 'member'
  invitedBy: string
  acceptedAt?: Date
  expiresAt: Date
  token: string
}

export type AgencyUpgradeRequest = {
  agencyId: string
  planRequested: 'pro'
  redirectUrl: string
}
