export type BaseEntity = {
  id: string
  createdAt: Date
  updatedAt: Date
}

export type PaginationParams = {
  page?: number
  limit?: number
  search?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export type PaginatedResult<T> = {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

export type ActionResponse<T = unknown> =
  | { success: true; data: T }
  | { success: false; error: AppError }

export type AppError = {
  code: string
  message: string
  details?: Record<string, any>
}

export const appErrors = {
  UNAUTHORIZED: { code: 'UNAUTHORIZED', message: 'Não autorizado' },
  FORBIDDEN: { code: 'FORBIDDEN', message: 'Acesso negado' },
  NOT_FOUND: { code: 'NOT_FOUND', message: 'Não encontrado' },
  VALIDATION_ERROR: { code: 'VALIDATION_ERROR', message: 'Erro de validação' },
  LIMIT_EXCEEDED: { code: 'LIMIT_EXCEEDED', message: 'Limite excedido' },
  PAYMENT_REQUIRED: { code: 'PAYMENT_REQUIRED', message: 'Pagamento necessário' },
  UNEXPECTED_ERROR: { code: 'UNEXPECTED_ERROR', message: 'Erro inesperado' }
} as const
