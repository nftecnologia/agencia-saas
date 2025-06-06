import { BaseEntity } from './common'

export type Project = BaseEntity & {
  agencyId: string
  clientId: string
  name: string
  description?: string
  status: 'planning' | 'in_progress' | 'review' | 'completed' | 'on_hold' | 'cancelled'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  budget?: number
  currency: string
  startDate?: Date
  deadline?: Date
  completedAt?: Date
  assignedUsers: string[]
  tags?: string[]
  customFields?: Record<string, any>
}

export type Board = BaseEntity & {
  projectId: string
  agencyId: string
  name: string
  description?: string
  position: number
  color?: string
}

export type Task = BaseEntity & {
  projectId: string
  boardId: string
  agencyId: string
  title: string
  description?: string
  status: 'todo' | 'in_progress' | 'review' | 'done'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  assignedTo?: string
  dueDate?: Date
  completedAt?: Date
  position: number
  estimatedHours?: number
  actualHours?: number
  tags?: string[]
}

export type TaskComment = BaseEntity & {
  taskId: string
  agencyId: string
  userId: string
  content: string
  isInternal: boolean
}

export type TaskAttachment = BaseEntity & {
  taskId: string
  agencyId: string
  userId: string
  fileName: string
  fileUrl: string
  fileSize: number
  mimeType: string
}

export type ProjectTemplate = BaseEntity & {
  agencyId: string
  name: string
  description?: string
  boards: Omit<Board, 'id' | 'projectId' | 'agencyId' | 'createdAt' | 'updatedAt'>[]
  defaultTasks: Omit<Task, 'id' | 'projectId' | 'boardId' | 'agencyId' | 'createdAt' | 'updatedAt'>[]
  isPublic: boolean
}

export type CreateProjectData = Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'agencyId'>
export type UpdateProjectData = Partial<CreateProjectData>

export type CreateTaskData = Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'agencyId' | 'position'>
export type UpdateTaskData = Partial<CreateTaskData>
