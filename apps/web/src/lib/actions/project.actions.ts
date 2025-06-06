"use server"

import { auth } from "@/lib/auth"
import { db } from "@agenciasaas/database"
import { projectSchema } from "@agenciasaas/types"
import type { CreateProjectData, UpdateProjectData, Project } from "@agenciasaas/types"
import type { ActionResponse } from "@agenciasaas/types"

export async function getProjects(): Promise<Project[]> {
  const session = await auth()
  
  if (!session?.user?.agencyId) {
    throw new Error("Não autorizado")
  }

  try {
    const projects = await db.project.findMany({
      where: {
        agencyId: session.user.agencyId
      },
      include: {
        client: {
          select: {
            id: true,
            name: true
          }
        }
      },
      orderBy: {
        updatedAt: 'desc'
      }
    })

    return projects.map((project: any) => ({
      ...project,
      status: project.status?.toLowerCase() as any,
      priority: project.priority?.toLowerCase() as any,
      budget: project.budget ? Number(project.budget) : undefined,
      assignedUsers: project.assignedUsers as string[],
      tags: project.tags as string[],
      customFields: project.customFields as Record<string, any>
    })) as Project[]
  } catch (error) {
    console.error("Erro ao buscar projetos:", error)
    throw new Error("Erro ao buscar projetos")
  }
}

export async function createProject(data: CreateProjectData): Promise<ActionResponse<Project>> {
  const session = await auth()
  
  if (!session?.user?.agencyId) {
    return {
      success: false,
      error: {
        code: "UNAUTHORIZED",
        message: "Não autorizado"
      }
    }
  }

  try {
    const validatedData = projectSchema.parse(data)
    
    const project = await db.project.create({
      data: {
        ...validatedData,
        agencyId: session.user.agencyId,
        status: validatedData.status?.toUpperCase() as any,
        priority: validatedData.priority?.toUpperCase() as any,
        startDate: validatedData.startDate ? new Date(validatedData.startDate) : null,
        deadline: validatedData.deadline ? new Date(validatedData.deadline) : null,
      },
      include: {
        client: {
          select: {
            id: true,
            name: true
          }
        }
      }
    })

    return {
      success: true,
      data: {
        ...project,
        status: project.status?.toLowerCase() as any,
        priority: project.priority?.toLowerCase() as any,
        budget: project.budget ? Number(project.budget) : undefined,
        assignedUsers: project.assignedUsers as string[],
        tags: project.tags as string[],
        customFields: project.customFields as Record<string, any>
      } as Project
    }
  } catch (error) {
    console.error("Erro ao criar projeto:", error)
    return {
      success: false,
      error: {
        code: "CREATE_ERROR",
        message: "Erro ao criar projeto"
      }
    }
  }
}

export async function updateProject(id: string, data: UpdateProjectData): Promise<ActionResponse<Project>> {
  const session = await auth()
  
  if (!session?.user?.agencyId) {
    return {
      success: false,
      error: {
        code: "UNAUTHORIZED",
        message: "Não autorizado"
      }
    }
  }

  try {
    const project = await db.project.findFirst({
      where: {
        id,
        agencyId: session.user.agencyId
      }
    })

    if (!project) {
      return {
        success: false,
        error: {
          code: "NOT_FOUND",
          message: "Projeto não encontrado"
        }
      }
    }

    const { clientId, ...updateData } = data

    const updatedProject = await db.project.update({
      where: { id },
      data: {
        ...updateData,
        status: updateData.status?.toUpperCase() as any,
        priority: updateData.priority?.toUpperCase() as any,
        startDate: updateData.startDate ? new Date(updateData.startDate) : undefined,
        deadline: updateData.deadline ? new Date(updateData.deadline) : undefined,
      },
      include: {
        client: {
          select: {
            id: true,
            name: true
          }
        }
      }
    })

    return {
      success: true,
      data: {
        ...updatedProject,
        status: updatedProject.status?.toLowerCase() as any,
        priority: updatedProject.priority?.toLowerCase() as any,
        budget: updatedProject.budget ? Number(updatedProject.budget) : undefined,
        assignedUsers: updatedProject.assignedUsers as string[],
        tags: updatedProject.tags as string[],
        customFields: updatedProject.customFields as Record<string, any>
      } as Project
    }
  } catch (error) {
    console.error("Erro ao atualizar projeto:", error)
    return {
      success: false,
      error: {
        code: "UPDATE_ERROR",
        message: "Erro ao atualizar projeto"
      }
    }
  }
}

export async function deleteProject(id: string): Promise<ActionResponse<void>> {
  const session = await auth()
  
  if (!session?.user?.agencyId) {
    return {
      success: false,
      error: {
        code: "UNAUTHORIZED",
        message: "Não autorizado"
      }
    }
  }

  try {
    const project = await db.project.findFirst({
      where: {
        id,
        agencyId: session.user.agencyId
      }
    })

    if (!project) {
      return {
        success: false,
        error: {
          code: "NOT_FOUND",
          message: "Projeto não encontrado"
        }
      }
    }

    await db.project.delete({
      where: { id }
    })

    return {
      success: true,
      data: undefined
    }
  } catch (error) {
    console.error("Erro ao excluir projeto:", error)
    return {
      success: false,
      error: {
        code: "DELETE_ERROR",
        message: "Erro ao excluir projeto"
      }
    }
  }
}
