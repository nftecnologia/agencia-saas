import { BaseEntity } from './common'
import { Agency, AgencySettings, BillingInfo, UsageStats } from './agency'

export type User = BaseEntity & {
  agencyId: string
  name: string
  email: string
  role: 'admin' | 'member'
  avatar?: string
  permissions: string[]
  isActive: boolean
  lastLoginAt?: Date
}

export type Session = {
  user: User
  agency: Agency
}

export type LoginCredentials = {
  email: string
  password: string
}

export type RegisterData = {
  name: string
  email: string
  password: string
  agencyName: string
  agencySlug: string
}
