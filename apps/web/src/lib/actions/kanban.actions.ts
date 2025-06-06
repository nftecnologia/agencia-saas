"use server"

import { createSafeActionClient } from "next-safe-action"
import { z } from "zod"
import { auth } from "@/lib/auth"
import { db as prisma } from "@agenciasaas/database"

export type ActionResponse<T = unknown> =
  | { success: true; data: T }
  | { success: false; error: { message: string; code: string } }

export type KanbanProject = {
  id: string
  name: string
  description: string | null
  status: string
  priority: string
  budget: number | null
  startDate: Date | null
  deadline: Date | null
  completedAt: Date | null
  client: {
    id: string
    name: string
    company: string | null
  }
  assignedUsers: string[]
  tags: string[]
  tasks: {
    id: string
    title: string
    status: string
    assignedTo: string | null
    assignee?: {
      name: string
    } | null
    completed: boolean
  }[]
  progress: number
}

const moveProjectSchema = z.object({
  projectId: z.string(),
  newStatus: z.enum(["PLANNING", "IN_PROGRESS", "REVIEW", "COMPLETED"])
})

const updateProjectSchema = z.object({
  projectId: z.string(),
  name: z.string().optional(),
  description: z.string().optional(), 
  budget: z.number().optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]).optional(),
  deadline: z.string().optional()
})

const createTaskSchema = z.object({
  projectId: z.string(),
  title: z.string().min(1, "Título é obrigatório"),
  description: z.string().optional(),
  assignedTo: z.string().optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]).default("MEDIUM"),
  dueDate: z.string().optional()
})

const updateTaskSchema = z.object({
  taskId: z.string(),
  title: z.string().optional(),
  completed: z.boolean().optional(),
  status: z.enum(["TODO", "IN_PROGRESS", "REVIEW", "DONE"]).optional()
})

const deleteTaskSchema = z.object({
  taskId: z.string()
})

const deleteProjectSchema = z.object({
  projectId: z.string()
})

export const getKanbanProjects = createSafeActionClient()
  .action(async (): Promise<ActionResponse<KanbanProject[]>> => {
    try {
      const session = await auth()
      if (!session?.user?.agencyId) {
        return { success: false, error: { message: "Não autorizado", code: "UNAUTHORIZED" } }
      }

      const projects = await prisma.project.findMany({
        where: {
          agencyId: session.user.agencyId
        },
        include: {
          client: {
            select: {
              id: true,
              name: true,
              company: true
            }
          },
          tasks: {
            include: {
              assignee: {
                select: {
                  name: true
                }
              }
            },
            orderBy: {
              position: 'asc'
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      })

      const kanbanProjects: KanbanProject[] = projects.map((project: any) => {
        const completedTasks = project.tasks.filter((task: any) => task.status === 'DONE').length
        const totalTasks = project.tasks.length
        const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

        return {
          id: project.id,
          name: project.name,
          description: project.description,
          status: project.status,
          priority: project.priority,
          budget: project.budget ? Number(project.budget) : null,
          startDate: project.startDate,
          deadline: project.deadline,
          completedAt: project.completedAt,
          client: {
            id: project.client.id,
            name: project.client.name,
            company: project.client.company
          },
          assignedUsers: Array.isArray(project.assignedUsers) ? project.assignedUsers as string[] : [],
          tags: Array.isArray(project.tags) ? project.tags as string[] : [],
          tasks: project.tasks.map((task: any) => ({
            id: task.id,
            title: task.title,
            status: task.status,
            assignedTo: task.assignedTo,
            assignee: task.assignee,
            completed: task.status === 'DONE'
          })),
          progress
        }
      })

      return { success: true, data: kanbanProjects }
    } catch (error) {
      console.error("Erro ao buscar projetos do kanban:", error)
      return { success: false, error: { message: "Erro interno do servidor", code: "INTERNAL_ERROR" } }
    }
  })

export const moveProject = createSafeActionClient()
  .schema(moveProjectSchema)
  .action(async ({ projectId, newStatus }): Promise<ActionResponse<{ id: string; status: string }>> => {
    try {
      const session = await auth()
      if (!session?.user?.agencyId) {
        return { success: false, error: { message: "Não autorizado", code: "UNAUTHORIZED" } }
      }

      const updatedProject = await prisma.project.update({
        where: {
          id: projectId,
          agencyId: session.user.agencyId
        },
        data: {
          status: newStatus,
          completedAt: newStatus === 'COMPLETED' ? new Date() : null
        }
      })

      return { 
        success: true, 
        data: { 
          id: updatedProject.id, 
          status: updatedProject.status 
        } 
      }
    } catch (error) {
      console.error("Erro ao mover projeto:", error)
      return { success: false, error: { message: "Erro ao mover projeto", code: "INTERNAL_ERROR" } }
    }
  })

export const updateProject = createSafeActionClient()
  .schema(updateProjectSchema)
  .action(async ({ projectId, ...data }): Promise<ActionResponse<{ id: string }>> => {
    try {
      const session = await auth()
      if (!session?.user?.agencyId) {
        return { success: false, error: { message: "Não autorizado", code: "UNAUTHORIZED" } }
      }

      const updateData: any = {}
      
      if (data.name !== undefined) updateData.name = data.name
      if (data.description !== undefined) updateData.description = data.description
      if (data.budget !== undefined) updateData.budget = data.budget
      if (data.priority !== undefined) updateData.priority = data.priority
      if (data.deadline !== undefined) updateData.deadline = new Date(data.deadline)

      await prisma.project.update({
        where: {
          id: projectId,
          agencyId: session.user.agencyId
        },
        data: updateData
      })

      return { success: true, data: { id: projectId } }
    } catch (error) {
      console.error("Erro ao atualizar projeto:", error)
      return { success: false, error: { message: "Erro ao atualizar projeto", code: "INTERNAL_ERROR" } }
    }
  })

export const deleteProject = createSafeActionClient()
  .schema(deleteProjectSchema)
  .action(async ({ projectId }): Promise<ActionResponse<{ id: string }>> => {
    try {
      const session = await auth()
      if (!session?.user?.agencyId) {
        return { success: false, error: { message: "Não autorizado", code: "UNAUTHORIZED" } }
      }

      await prisma.project.delete({
        where: {
          id: projectId,
          agencyId: session.user.agencyId
        }
      })

      return { success: true, data: { id: projectId } }
    } catch (error) {
      console.error("Erro ao excluir projeto:", error)
      return { success: false, error: { message: "Erro ao excluir projeto", code: "INTERNAL_ERROR" } }
    }
  })

export const createTask = createSafeActionClient()
  .schema(createTaskSchema)
  .action(async ({ projectId, title, description, assignedTo, priority, dueDate }): Promise<ActionResponse<{ id: string }>> => {
    try {
      const session = await auth()
      if (!session?.user?.agencyId) {
        return { success: false, error: { message: "Não autorizado", code: "UNAUTHORIZED" } }
      }

      // Verificar se o projeto existe e pertence à agência
      const project = await prisma.project.findFirst({
        where: {
          id: projectId,
          agencyId: session.user.agencyId
        }
      })

      if (!project) {
        return { success: false, error: { message: "Projeto não encontrado", code: "NOT_FOUND" } }
      }

      // Buscar ou criar um board padrão para o projeto
      let board = await prisma.board.findFirst({
        where: {
          projectId: projectId,
          agencyId: session.user.agencyId
        }
      })

      if (!board) {
        board = await prisma.board.create({
          data: {
            projectId: projectId,
            agencyId: session.user.agencyId,
            name: "Main Board",
            position: 0
          }
        })
      }

      // Buscar a posição para a nova task
      const lastTask = await prisma.task.findFirst({
        where: {
          projectId: projectId,
          boardId: board.id
        },
        orderBy: {
          position: 'desc'
        }
      })

      const task = await prisma.task.create({
        data: {
          projectId: projectId,
          boardId: board.id,
          agencyId: session.user.agencyId,
          title,
          description,
          assignedTo,
          priority,
          dueDate: dueDate ? new Date(dueDate) : null,
          position: (lastTask?.position || 0) + 1
        }
      })

      return { success: true, data: { id: task.id } }
    } catch (error) {
      console.error("Erro ao criar task:", error)
      return { success: false, error: { message: "Erro ao criar task", code: "INTERNAL_ERROR" } }
    }
  })

export const updateTask = createSafeActionClient()
  .schema(updateTaskSchema)
  .action(async ({ taskId, title, completed, status }): Promise<ActionResponse<{ id: string }>> => {
    try {
      const session = await auth()
      if (!session?.user?.agencyId) {
        return { success: false, error: { message: "Não autorizado", code: "UNAUTHORIZED" } }
      }

      const updateData: any = {}
      
      if (title !== undefined) updateData.title = title
      if (completed !== undefined) updateData.status = completed ? 'DONE' : 'TODO'
      if (status !== undefined) updateData.status = status

      if (updateData.status === 'DONE') {
        updateData.completedAt = new Date()
      } else if (updateData.status !== undefined) {
        updateData.completedAt = null
      }

      await prisma.task.update({
        where: {
          id: taskId,
          agencyId: session.user.agencyId
        },
        data: updateData
      })

      return { success: true, data: { id: taskId } }
    } catch (error) {
      console.error("Erro ao atualizar task:", error)
      return { success: false, error: { message: "Erro ao atualizar task", code: "INTERNAL_ERROR" } }
    }
  })

export const deleteTask = createSafeActionClient()
  .schema(deleteTaskSchema)
  .action(async ({ taskId }): Promise<ActionResponse<{ id: string }>> => {
    try {
      const session = await auth()
      if (!session?.user?.agencyId) {
        return { success: false, error: { message: "Não autorizado", code: "UNAUTHORIZED" } }
      }

      await prisma.task.delete({
        where: {
          id: taskId,
          agencyId: session.user.agencyId
        }
      })

      return { success: true, data: { id: taskId } }
    } catch (error) {
      console.error("Erro ao excluir task:", error)
      return { success: false, error: { message: "Erro ao excluir task", code: "INTERNAL_ERROR" } }
    }
  })
