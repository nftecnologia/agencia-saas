import { BaseEntity } from './common'

export type Revenue = BaseEntity & {
  agencyId: string
  clientId: string
  projectId?: string
  title: string
  description?: string
  amount: number
  currency: string
  type: 'recurring' | 'one_time'
  status: 'pending' | 'received' | 'overdue' | 'cancelled'
  dueDate: Date
  receivedDate?: Date
  invoiceNumber?: string
  paymentMethod?: string
  category?: string
  tags?: string[]
}

export type Expense = BaseEntity & {
  agencyId: string
  title: string
  description?: string
  amount: number
  currency: string
  category: string
  subcategory?: string
  supplier?: string
  date: Date
  paymentMethod?: string
  receipt?: string
  isRecurring: boolean
  tags?: string[]
}

export type ExpenseCategory = BaseEntity & {
  agencyId: string
  name: string
  description?: string
  color?: string
  isDefault: boolean
  subcategories?: string[]
}

export type FinancialGoal = BaseEntity & {
  agencyId: string
  type: 'revenue' | 'profit' | 'clients' | 'projects'
  title: string
  targetValue: number
  currentValue: number
  period: 'monthly' | 'quarterly' | 'yearly'
  startDate: Date
  endDate: Date
  status: 'active' | 'completed' | 'paused'
}

export type CashFlow = {
  month: string // YYYY-MM
  totalRevenue: number
  totalExpenses: number
  profit: number
  profitMargin: number
}

export type FinancialSummary = {
  currentMonth: CashFlow
  previousMonth: CashFlow
  yearToDate: {
    revenue: number
    expenses: number
    profit: number
  }
  topClients: Array<{
    clientId: string
    clientName: string
    totalRevenue: number
  }>
  topExpenseCategories: Array<{
    category: string
    totalAmount: number
    percentage: number
  }>
}

export type RecurringRevenue = BaseEntity & {
  agencyId: string
  clientId: string
  title: string
  amount: number
  currency: string
  frequency: 'weekly' | 'monthly' | 'quarterly' | 'yearly'
  startDate: Date
  endDate?: Date
  nextDueDate: Date
  isActive: boolean
  lastGenerated?: Date
}

export type Invoice = BaseEntity & {
  agencyId: string
  clientId: string
  projectId?: string
  invoiceNumber: string
  title: string
  description?: string
  items: InvoiceItem[]
  subtotal: number
  tax?: number
  taxRate?: number
  total: number
  currency: string
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled'
  issueDate: Date
  dueDate: Date
  paidDate?: Date
  notes?: string
}

export type InvoiceItem = {
  description: string
  quantity: number
  unitPrice: number
  total: number
}

export type CreateRevenueData = Omit<Revenue, 'id' | 'createdAt' | 'updatedAt' | 'agencyId'>
export type UpdateRevenueData = Partial<CreateRevenueData>

export type CreateExpenseData = Omit<Expense, 'id' | 'createdAt' | 'updatedAt' | 'agencyId'>
export type UpdateExpenseData = Partial<CreateExpenseData>
