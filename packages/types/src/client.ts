import { BaseEntity } from './common'

export type Client = BaseEntity & {
  agencyId: string
  name: string
  email?: string
  phone?: string
  company?: string
  industry?: string
  website?: string
  address?: Address
  contactPerson?: string
  status: 'active' | 'inactive' | 'prospect'
  contractValue?: number
  contractType: 'monthly' | 'project' | 'hourly'
  notes?: string
  customFields?: Record<string, any>
  tags?: string[]
}

export type Address = {
  street?: string
  city?: string
  state?: string
  zipCode?: string
  country?: string
}

export type ClientContact = BaseEntity & {
  clientId: string
  name: string
  email?: string
  phone?: string
  role?: string
  isPrimary: boolean
}

export type ClientContract = BaseEntity & {
  clientId: string
  agencyId: string
  title: string
  description?: string
  value: number
  currency: string
  type: 'monthly' | 'project' | 'hourly'
  startDate: Date
  endDate?: Date
  status: 'draft' | 'active' | 'paused' | 'completed' | 'cancelled'
  paymentTerms?: string
  deliverables?: string[]
}

export type ClientNote = BaseEntity & {
  clientId: string
  agencyId: string
  userId: string
  content: string
  isPrivate: boolean
  tags?: string[]
}

export type CreateClientData = Omit<Client, 'id' | 'createdAt' | 'updatedAt' | 'agencyId'>
export type UpdateClientData = Partial<CreateClientData>
