"use server"

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

export async function getKanbanProjects(): Promise<KanbanProject[]> {
  const session = await auth()
  
  if (!session?.user?.agencyId) {
    throw new Error("Não autorizado")
  }

  try {
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

      // Mapear status do banco para status do Kanban
      const statusMap: Record<string, string> = {
        PLANNING: "planning",
        IN_PROGRESS: "in_progress",
        REVIEW: "review", 
        COMPLETED: "completed"
      }

      // Mapear prioridade do banco para prioridade do Kanban
      const priorityMap: Record<string, string> = {
        LOW: "low",
        MEDIUM: "medium",
        HIGH: "high",
        URGENT: "urgent"
      }

      return {
        id: project.id,
        name: project.name,
        description: project.description,
        status: statusMap[project.status] || project.status.toLowerCase(),
        priority: priorityMap[project.priority] || project.priority.toLowerCase(),
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

    return kanbanProjects
  } catch (error) {
    console.error("Erro ao buscar projetos do kanban:", error)
    throw new Error("Erro ao buscar projetos")
  }
}

export async function moveProject(data: { projectId: string; newStatus: "PLANNING" | "IN_PROGRESS" | "REVIEW" | "COMPLETED" }): Promise<ActionResponse<{ id: string; status: string }>> {
  const session = await auth()
  
  if (!session?.user?.agencyId) {
    return { success: false, error: { message: "Não autorizado", code: "UNAUTHORIZED" } }
  }

  try {
    const updatedProject = await prisma.project.update({
      where: {
        id: data.projectId,
        agencyId: session.user.agencyId
      },
      data: {
        status: data.newStatus,
        completedAt: data.newStatus === 'COMPLETED' ? new Date() : null
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
}

export async function updateProject(data: { 
  projectId: string; 
  name?: string; 
  description?: string; 
  budget?: number; 
  priority?: string; 
  deadline?: string; 
}): Promise<ActionResponse<{ id: string }>> {
  const session = await auth()
  
  if (!session?.user?.agencyId) {
    return { success: false, error: { message: "Não autorizado", code: "UNAUTHORIZED" } }
  }

  try {
    const updateData: any = {}
    
    if (data.name !== undefined) updateData.name = data.name
    if (data.description !== undefined) updateData.description = data.description
    if (data.budget !== undefined) updateData.budget = data.budget
    if (data.priority !== undefined) updateData.priority = data.priority.toUpperCase()
    if (data.deadline !== undefined) updateData.deadline = new Date(data.deadline)

    await prisma.project.update({
      where: {
        id: data.projectId,
        agencyId: session.user.agencyId
      },
      data: updateData
    })

    return { success: true, data: { id: data.projectId } }
  } catch (error) {
    console.error("Erro ao atualizar projeto:", error)
    return { success: false, error: { message: "Erro ao atualizar projeto", code: "INTERNAL_ERROR" } }
  }
}

export async function deleteProject(data: { projectId: string }): Promise<ActionResponse<{ id: string }>> {
  const session = await auth()
  
  if (!session?.user?.agencyId) {
    return { success: false, error: { message: "Não autorizado", code: "UNAUTHORIZED" } }
  }

  try {
    await prisma.project.delete({
      where: {
        id: data.projectId,
        agencyId: session.user.agencyId
      }
    })

    return { success: true, data: { id: data.projectId } }
  } catch (error) {
    console.error("Erro ao excluir projeto:", error)
    return { success: false, error: { message: "Erro ao excluir projeto", code: "INTERNAL_ERROR" } }
  }
}

export async function createTask(data: { 
  projectId: string; 
  title: string; 
  description?: string; 
  assignedTo?: string; 
  priority?: string; 
  dueDate?: string; 
}): Promise<ActionResponse<{ id: string }>> {
  const session = await auth()
  
  if (!session?.user?.agencyId) {
    return { success: false, error: { message: "Não autorizado", code: "UNAUTHORIZED" } }
  }

  try {
    // Verificar se o projeto existe e pertence à agência
    const project = await prisma.project.findFirst({
      where: {
        id: data.projectId,
        agencyId: session.user.agencyId
      }
    })

    if (!project) {
      return { success: false, error: { message: "Projeto não encontrado", code: "NOT_FOUND" } }
    }

    // Buscar ou criar um board padrão para o projeto
    let board = await prisma.board.findFirst({
      where: {
        projectId: data.projectId,
        agencyId: session.user.agencyId
      }
    })

    if (!board) {
      board = await prisma.board.create({
        data: {
          projectId: data.projectId,
          agencyId: session.user.agencyId,
          name: "Main Board",
          position: 0
        }
      })
    }

    // Buscar a posição para a nova task
    const lastTask = await prisma.task.findFirst({
      where: {
        projectId: data.projectId,
        boardId: board.id
      },
      orderBy: {
        position: 'desc'
      }
    })

    const task = await prisma.task.create({
      data: {
        projectId: data.projectId,
        boardId: board.id,
        agencyId: session.user.agencyId,
        title: data.title,
        description: data.description,
        assignedTo: data.assignedTo,
        priority: (data.priority?.toUpperCase() as "LOW" | "MEDIUM" | "HIGH" | "URGENT") || "MEDIUM",
        dueDate: data.dueDate ? new Date(data.dueDate) : null,
        position: (lastTask?.position || 0) + 1
      }
    })

    return { success: true, data: { id: task.id } }
  } catch (error) {
    console.error("Erro ao criar task:", error)
    return { success: false, error: { message: "Erro ao criar task", code: "INTERNAL_ERROR" } }
  }
}

export async function updateTask(data: { 
  taskId: string; 
  title?: string; 
  completed?: boolean; 
  status?: string; 
}): Promise<ActionResponse<{ id: string }>> {
  const session = await auth()
  
  if (!session?.user?.agencyId) {
    return { success: false, error: { message: "Não autorizado", code: "UNAUTHORIZED" } }
  }

  try {
    const updateData: any = {}
    
    if (data.title !== undefined) updateData.title = data.title
    if (data.completed !== undefined) updateData.status = data.completed ? 'DONE' : 'TODO'
    if (data.status !== undefined) updateData.status = data.status

    if (updateData.status === 'DONE') {
      updateData.completedAt = new Date()
    } else if (updateData.status !== undefined) {
      updateData.completedAt = null
    }

    await prisma.task.update({
      where: {
        id: data.taskId,
        agencyId: session.user.agencyId
      },
      data: updateData
    })

    return { success: true, data: { id: data.taskId } }
  } catch (error) {
    console.error("Erro ao atualizar task:", error)
    return { success: false, error: { message: "Erro ao atualizar task", code: "INTERNAL_ERROR" } }
  }
}

export async function deleteTask(data: { taskId: string }): Promise<ActionResponse<{ id: string }>> {
  const session = await auth()
  
  if (!session?.user?.agencyId) {
    return { success: false, error: { message: "Não autorizado", code: "UNAUTHORIZED" } }
  }

  try {
    await prisma.task.delete({
      where: {
        id: data.taskId,
        agencyId: session.user.agencyId
      }
    })

    return { success: true, data: { id: data.taskId } }
  } catch (error) {
    console.error("Erro ao excluir task:", error)
    return { success: false, error: { message: "Erro ao excluir task", code: "INTERNAL_ERROR" } }
  }
}
