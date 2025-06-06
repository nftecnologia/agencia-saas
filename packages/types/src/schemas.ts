import { z } from 'zod'

// Auth schemas
export const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres')
})

export const registerSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
  agencyName: z.string().min(2, 'Nome da agência deve ter pelo menos 2 caracteres'),
  agencySlug: z.string().min(2, 'Slug da agência deve ter pelo menos 2 caracteres')
    .regex(/^[a-z0-9-]+$/, 'Slug deve conter apenas letras minúsculas, números e hífens')
})

// Client schemas
export const clientSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('E-mail inválido').optional().or(z.literal('')),
  phone: z.string().optional(),
  company: z.string().optional(),
  industry: z.string().optional(),
  website: z.string().url('URL inválida').optional().or(z.literal('')),
  contactPerson: z.string().optional(),
  status: z.enum(['active', 'inactive', 'prospect']),
  contractValue: z.number().optional(),
  contractType: z.enum(['monthly', 'project', 'hourly']),
  notes: z.string().optional(),
  tags: z.array(z.string()).optional()
})

// Project schemas
export const projectSchema = z.object({
  clientId: z.string().min(1, 'Cliente é obrigatório'),
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  description: z.string().optional(),
  status: z.enum(['planning', 'in_progress', 'review', 'completed', 'on_hold', 'cancelled']),
  priority: z.enum(['low', 'medium', 'high', 'urgent']),
  budget: z.number().optional(),
  currency: z.string().default('BRL'),
  startDate: z.date().optional(),
  deadline: z.date().optional(),
  assignedUsers: z.array(z.string()),
  tags: z.array(z.string()).optional()
})

export const taskSchema = z.object({
  projectId: z.string().min(1, 'Projeto é obrigatório'),
  boardId: z.string().min(1, 'Board é obrigatório'),
  title: z.string().min(2, 'Título deve ter pelo menos 2 caracteres'),
  description: z.string().optional(),
  status: z.enum(['todo', 'in_progress', 'review', 'done']),
  priority: z.enum(['low', 'medium', 'high', 'urgent']),
  assignedTo: z.string().optional(),
  dueDate: z.date().optional(),
  estimatedHours: z.number().optional(),
  tags: z.array(z.string()).optional()
})

// Financial schemas
export const revenueSchema = z.object({
  clientId: z.string().min(1, 'Cliente é obrigatório'),
  projectId: z.string().optional(),
  title: z.string().min(2, 'Título deve ter pelo menos 2 caracteres'),
  description: z.string().optional(),
  amount: z.number().positive('Valor deve ser positivo'),
  currency: z.string().default('BRL'),
  type: z.enum(['recurring', 'one_time']),
  status: z.enum(['pending', 'received', 'overdue', 'cancelled']),
  dueDate: z.date(),
  receivedDate: z.date().optional(),
  invoiceNumber: z.string().optional(),
  paymentMethod: z.string().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional()
})

export const expenseSchema = z.object({
  title: z.string().min(2, 'Título deve ter pelo menos 2 caracteres'),
  description: z.string().optional(),
  amount: z.number().positive('Valor deve ser positivo'),
  currency: z.string().default('BRL'),
  category: z.string().min(1, 'Categoria é obrigatória'),
  subcategory: z.string().optional(),
  supplier: z.string().optional(),
  date: z.date(),
  paymentMethod: z.string().optional(),
  isRecurring: z.boolean().default(false),
  tags: z.array(z.string()).optional()
})

// AI schemas
export const aiGenerationSchema = z.object({
  clientId: z.string().min(1, 'Cliente é obrigatório'),
  projectId: z.string().optional(),
  agentId: z.string().min(1, 'Agente é obrigatório'),
  title: z.string().min(2, 'Título deve ter pelo menos 2 caracteres'),
  prompt: z.string().min(10, 'Prompt deve ter pelo menos 10 caracteres'),
  metadata: z.record(z.any()).default({}),
  tags: z.array(z.string()).default([])
})

export const metaAdsInputSchema = z.object({
  businessType: z.string().min(2, 'Tipo de negócio é obrigatório'),
  targetAudience: z.string().min(5, 'Público-alvo deve ser mais específico'),
  objective: z.enum(['awareness', 'traffic', 'engagement', 'leads', 'sales']),
  tone: z.enum(['professional', 'casual', 'urgent', 'emotional']),
  productService: z.string().min(5, 'Produto/serviço deve ser mais específico'),
  keyBenefits: z.array(z.string()).min(1, 'Pelo menos um benefício é obrigatório'),
  budget: z.number().optional()
})

export const instagramCaptionInputSchema = z.object({
  postType: z.enum(['photo', 'carousel', 'reel', 'story']),
  theme: z.string().min(5, 'Tema deve ser mais específico'),
  tone: z.enum(['formal', 'casual', 'divertido', 'inspiracional']),
  includeHashtags: z.boolean().default(true),
  maxLength: z.number().optional(),
  callToAction: z.string().optional()
})

export const feedStoryBriefingSchema = z.object({
  theme: z.string().min(5, 'Tema deve ser mais específico'),
  style: z.enum(['minimalista', 'moderno', 'corporativo', 'vibrante', 'elegante']),
  colors: z.array(z.string()).optional(),
  targetAudience: z.string().min(5, 'Público-alvo deve ser mais específico'),
  callToAction: z.string().optional(),
  includeText: z.boolean().default(true),
  textContent: z.string().optional(),
  format: z.enum(['feed_square', 'feed_portrait', 'story', 'both']),
  brandElements: z.object({
    logo: z.boolean().optional(),
    brandColors: z.boolean().optional(),
    brandFonts: z.boolean().optional()
  }).optional()
})

// Pagination schema
export const paginationSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(20),
  search: z.string().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc')
})
