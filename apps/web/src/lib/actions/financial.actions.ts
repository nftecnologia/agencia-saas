"use server"

import { z } from "zod"
import { auth } from "@/lib/auth"
import { db as prisma } from "@agenciasaas/database"

// Revenue Actions
export async function createRevenue(data: {
  description: string
  amount: number
  clientId: string
  dueDate: string
  status?: "PENDING" | "RECEIVED" | "OVERDUE" | "CANCELLED"
}) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      throw new Error("Unauthorized")
    }

    const revenue = await prisma.revenue.create({
      data: {
        title: data.description,
        description: data.description,
        amount: data.amount,
        clientId: data.clientId,
        dueDate: new Date(data.dueDate),
        status: data.status || "PENDING",
        agencyId: session.user.id,
      },
      include: {
        client: true,
      },
    })

    return revenue
  } catch (error) {
    console.error("Erro ao criar receita:", error)
    throw error
  }
}

// Expense Actions
export async function createExpense(data: {
  description: string
  amount: number
  category: string
  dueDate: string
}) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      throw new Error("Unauthorized")
    }

    const expense = await prisma.expense.create({
      data: {
        title: data.description,
        description: data.description,
        amount: data.amount,
        category: data.category,
        date: new Date(data.dueDate),
        agencyId: session.user.id,
      },
    })

    return expense
  } catch (error) {
    console.error("Erro ao criar despesa:", error)
    throw error
  }
}

// Get Financial Stats
export async function getFinancialStats() {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      throw new Error("Unauthorized")
    }

    const [revenues, expenses] = await Promise.all([
      prisma.revenue.findMany({
        where: { agencyId: session.user.id },
      }),
      prisma.expense.findMany({
        where: { agencyId: session.user.id },
      }),
    ])

    const totalRevenue = revenues.reduce((sum, r) => sum + Number(r.amount), 0)
    const totalExpenses = expenses.reduce((sum, e) => sum + Number(e.amount), 0)
    
    return {
      totalRevenue,
      totalExpenses,
      profitMargin: totalRevenue > 0 ? ((totalRevenue - totalExpenses) / totalRevenue) * 100 : 0,
      monthlyBalance: totalRevenue - totalExpenses,
      revenueGrowth: 0, // TODO: Calculate growth
      expensesGrowth: 0, // TODO: Calculate growth
    }
  } catch (error) {
    console.error("Erro ao buscar estatísticas financeiras:", error)
    return {
      totalRevenue: 0,
      totalExpenses: 0,
      profitMargin: 0,
      monthlyBalance: 0,
      revenueGrowth: 0,
      expensesGrowth: 0,
    }
  }
}

// Get Revenues
export async function getRevenues() {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      throw new Error("Unauthorized")
    }

    const revenues = await prisma.revenue.findMany({
      where: { agencyId: session.user.id },
      include: {
        client: true,
      },
      orderBy: { dueDate: 'desc' },
    })

    return revenues
  } catch (error) {
    console.error("Erro ao buscar receitas:", error)
    return []
  }
}

// Get Expenses
export async function getExpenses() {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      throw new Error("Unauthorized")
    }

    const expenses = await prisma.expense.findMany({
      where: { agencyId: session.user.id },
      orderBy: { date: 'desc' },
    })

    return expenses
  } catch (error) {
    console.error("Erro ao buscar despesas:", error)
    return []
  }
}
