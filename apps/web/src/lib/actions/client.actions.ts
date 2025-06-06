"use server"

import { auth } from "@/lib/auth"
import { db } from "@agenciasaas/database"
import { clientSchema } from "@agenciasaas/types"
import type { Client, CreateClientData, UpdateClientData } from "@agenciasaas/types"

export async function getClients(): Promise<Client[]> {
  const session = await auth()
  
  if (!session?.user?.agencyId) {
    throw new Error("Não autorizado")
  }

  try {
    const clients = await db.client.findMany({
      where: {
        agencyId: session.user.agencyId
      },
      orderBy: {
        createdAt: "desc"
      }
    })

    return clients.map((client: any) => ({
      ...client,
      contractValue: client.contractValue ? Number(client.contractValue) : undefined,
      tags: client.tags as string[],
      address: client.address as any,
      customFields: client.customFields as Record<string, any>
    })) as Client[]
  } catch (error) {
    console.error("Erro ao buscar clientes:", error)
    throw new Error("Erro ao buscar clientes")
  }
}

export async function createClient(data: CreateClientData): Promise<Client> {
  const session = await auth()
  
  if (!session?.user?.agencyId) {
    throw new Error("Não autorizado")
  }

  try {
    // Validar dados
    const validatedData = clientSchema.parse(data)

    const client = await db.client.create({
      data: {
        ...validatedData,
        agencyId: session.user.agencyId,
        contractValue: validatedData.contractValue || null,
        tags: validatedData.tags || [],
        customFields: {}
      }
    })

    // Atualizar contador de clientes na agência
    await db.agency.update({
      where: { id: session.user.agencyId },
      data: {
        usage: {
          update: {
            currentClients: {
              increment: 1
            }
          }
        }
      }
    }).catch(() => {
      // Ignorar erro de atualização de stats
    })

    return {
      ...client,
      contractValue: client.contractValue ? Number(client.contractValue) : undefined,
      tags: client.tags as string[],
      address: client.address as any,
      customFields: client.customFields as Record<string, any>
    } as Client
  } catch (error) {
    console.error("Erro ao criar cliente:", error)
    throw new Error("Erro ao criar cliente")
  }
}

export async function updateClient(
  clientId: string,
  data: UpdateClientData
): Promise<Client> {
  const session = await auth()
  
  if (!session?.user?.agencyId) {
    throw new Error("Não autorizado")
  }

  try {
    // Verificar se o cliente pertence à agência
    const existingClient = await db.client.findFirst({
      where: {
        id: clientId,
        agencyId: session.user.agencyId
      }
    })

    if (!existingClient) {
      throw new Error("Cliente não encontrado")
    }

    // Validar dados
    const validatedData = clientSchema.partial().parse(data)

    const client = await db.client.update({
      where: { id: clientId },
      data: {
        ...validatedData,
        contractValue: 'contractValue' in validatedData ? validatedData.contractValue || null : undefined
      }
    })

    return {
      ...client,
      contractValue: client.contractValue ? Number(client.contractValue) : undefined,
      tags: client.tags as string[],
      address: client.address as any,
      customFields: client.customFields as Record<string, any>
    } as Client
  } catch (error) {
    console.error("Erro ao atualizar cliente:", error)
    throw new Error("Erro ao atualizar cliente")
  }
}

export async function deleteClient(clientId: string): Promise<void> {
  const session = await auth()
  
  if (!session?.user?.agencyId) {
    throw new Error("Não autorizado")
  }

  try {
    // Verificar se o cliente pertence à agência
    const existingClient = await db.client.findFirst({
      where: {
        id: clientId,
        agencyId: session.user.agencyId
      }
    })

    if (!existingClient) {
      throw new Error("Cliente não encontrado")
    }

    // Verificar se o cliente tem projetos ativos
    const projectsCount = await db.project.count({
      where: {
        clientId: clientId,
        status: {
          in: ["planning", "in_progress", "review"]
        }
      }
    })

    if (projectsCount > 0) {
      throw new Error("Não é possível excluir um cliente com projetos ativos")
    }

    await db.client.delete({
      where: { id: clientId }
    })

    // Atualizar contador de clientes na agência
    await db.agency.update({
      where: { id: session.user.agencyId },
      data: {
        usage: {
          update: {
            currentClients: {
              decrement: 1
            }
          }
        }
      }
    }).catch(() => {
      // Ignorar erro de atualização de stats
    })
  } catch (error) {
    console.error("Erro ao excluir cliente:", error)
    throw new Error("Erro ao excluir cliente")
  }
}

export async function getClientById(clientId: string): Promise<Client | null> {
  const session = await auth()
  
  if (!session?.user?.agencyId) {
    throw new Error("Não autorizado")
  }

  try {
    const client = await db.client.findFirst({
      where: {
        id: clientId,
        agencyId: session.user.agencyId
      },
      include: {
        projects: {
          select: {
            id: true,
            name: true,
            status: true
          }
        }
      }
    })

    if (!client) {
      return null
    }

    return {
      ...client,
      contractValue: client.contractValue ? Number(client.contractValue) : undefined,
      tags: client.tags as string[],
      address: client.address as any,
      customFields: client.customFields as Record<string, any>
    } as Client
  } catch (error) {
    console.error("Erro ao buscar cliente:", error)
    throw new Error("Erro ao buscar cliente")
  }
}
