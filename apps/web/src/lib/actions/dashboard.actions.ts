"use server"

import { auth } from "@/lib/auth"
import { db } from "@agenciasaas/database"
import type { DashboardStats } from "@agenciasaas/types"

export async function getDashboardStats(): Promise<DashboardStats> {
  const session = await auth()
  
  if (!session?.user?.agencyId) {
    throw new Error("Não autorizado")
  }

  try {
    // Buscar total de clientes
    const totalClients = await db.client.count({
      where: {
        agencyId: session.user.agencyId
      }
    })

    // Buscar projetos ativos
    const activeProjects = await db.project.count({
      where: {
        agencyId: session.user.agencyId,
        status: {
          in: ["PLANNING", "IN_PROGRESS", "REVIEW"]
        }
      }
    })

    // Buscar receita do mês atual
    const currentDate = new Date()
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)

    const monthlyRevenueResult = await db.revenue.aggregate({
      where: {
        agencyId: session.user.agencyId,
        dueDate: {
          gte: firstDayOfMonth,
          lte: lastDayOfMonth
        }
      },
      _sum: {
        amount: true
      }
    })

    // Buscar receita do mês anterior para calcular crescimento
    const firstDayOfLastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    const lastDayOfLastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0)

    const lastMonthRevenueResult = await db.revenue.aggregate({
      where: {
        agencyId: session.user.agencyId,
        dueDate: {
          gte: firstDayOfLastMonth,
          lte: lastDayOfLastMonth
        }
      },
      _sum: {
        amount: true
      }
    })

    const monthlyRevenue = Number(monthlyRevenueResult._sum.amount || 0)
    const lastMonthRevenue = Number(lastMonthRevenueResult._sum.amount || 0)
    
    // Calcular taxa de crescimento
    let growthRate = 0
    if (lastMonthRevenue > 0) {
      growthRate = ((monthlyRevenue - lastMonthRevenue) / lastMonthRevenue) * 100
    } else if (monthlyRevenue > 0) {
      growthRate = 100 // Se não tinha receita no mês anterior, é 100% de crescimento
    }

    // Buscar dados para gráficos (últimos 6 meses)
    const sixMonthsAgo = new Date(currentDate.getFullYear(), currentDate.getMonth() - 5, 1)
    
    const monthlyData = await db.revenue.groupBy({
      by: ['dueDate'],
      where: {
        agencyId: session.user.agencyId,
        dueDate: {
          gte: sixMonthsAgo
        }
      },
      _sum: {
        amount: true
      },
      orderBy: {
        dueDate: 'asc'
      }
    })

    const revenueChartData = monthlyData.map((item: any) => ({
      month: item.dueDate.toLocaleDateString('pt-BR', { month: 'short' }),
      revenue: Number(item._sum.amount || 0)
    }))

    const stats: DashboardStats = {
      totalClients,
      activeProjects,
      monthlyRevenue,
      growthRate: Math.round(growthRate * 100) / 100, // Arredondar para 2 casas decimais
      revenueChartData,
      topClients: [], // Implementar depois
      recentProjects: [] // Implementar depois
    }

    return stats
  } catch (error) {
    console.error("Erro ao buscar estatísticas:", error)
    
    // Retornar dados padrão em caso de erro
    return {
      totalClients: 0,
      activeProjects: 0,
      monthlyRevenue: 0,
      growthRate: 0,
      revenueChartData: [],
      topClients: [],
      recentProjects: []
    }
  }
}

export async function getRecentActivity(): Promise<any[]> {
  const session = await auth()
  
  if (!session?.user?.agencyId) {
    throw new Error("Não autorizado")
  }

  try {
    // Buscar atividades recentes (clientes criados, projetos atualizados, etc.)
    const recentClients = await db.client.findMany({
      where: {
        agencyId: session.user.agencyId
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 3,
      select: {
        id: true,
        name: true,
        createdAt: true
      }
    })

    const recentProjects = await db.project.findMany({
      where: {
        agencyId: session.user.agencyId
      },
      orderBy: {
        updatedAt: 'desc'
      },
      take: 3,
      include: {
        client: {
          select: {
            name: true
          }
        }
      }
    })

    // Combinar e formatar as atividades
    const activities = [
      ...recentClients.map((client: any) => ({
        id: client.id,
        type: 'client_created',
        title: `Novo cliente: ${client.name}`,
        time: client.createdAt
      })),
      ...recentProjects.map((project: any) => ({
        id: project.id,
        type: 'project_updated',
        title: `Projeto atualizado: ${project.name}`,
        subtitle: `Cliente: ${project.client.name}`,
        time: project.updatedAt
      }))
    ].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())

    return activities.slice(0, 5) // Retornar apenas as 5 mais recentes
  } catch (error) {
    console.error("Erro ao buscar atividades recentes:", error)
    return []
  }
}
