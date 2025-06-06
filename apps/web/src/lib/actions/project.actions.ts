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

    return projects as Project[]
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
      data: project as Project
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

    const updatedProject = await db.project.update({
      where: { id },
      data: {
        ...data,
        startDate: data.startDate ? new Date(data.startDate) : undefined,
        deadline: data.deadline ? new Date(data.deadline) : undefined,
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
      data: updatedProject as Project
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
