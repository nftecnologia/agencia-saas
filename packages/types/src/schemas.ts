import { z } from "zod"

export const clientSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("E-mail inválido").optional(),
  phone: z.string().optional(),
  company: z.string().optional(),
  address: z.string().optional(),
  notes: z.string().optional(),
  contractValue: z.number().min(0).optional(),
  tags: z.array(z.string()).optional(),
})

export const projectSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  description: z.string().optional(),
  clientId: z.string().min(1, "Cliente é obrigatório"),
  status: z.enum(["planning", "in_progress", "review", "completed", "on_hold", "cancelled"]),
  priority: z.enum(["low", "medium", "high", "urgent"]),
  budget: z.number().min(0).optional(),
  currency: z.string().default("BRL"),
  startDate: z.string().optional(),
  deadline: z.string().optional(),
  assignedUsers: z.array(z.string()).default([]),
  tags: z.array(z.string()).optional(),
  customFields: z.record(z.any()).optional(),
})

export const revenueSchema = z.object({
  amount: z.number().min(0.01, "Valor deve ser maior que zero"),
  description: z.string().min(1, "Descrição é obrigatória"),
  date: z.string().min(1, "Data é obrigatória"),
  category: z.string().optional(),
  clientId: z.string().optional(),
  projectId: z.string().optional(),
})

export const expenseSchema = z.object({
  amount: z.number().min(0.01, "Valor deve ser maior que zero"),
  description: z.string().min(1, "Descrição é obrigatória"),
  date: z.string().min(1, "Data é obrigatória"),
  category: z.string().optional(),
  projectId: z.string().optional(),
})
