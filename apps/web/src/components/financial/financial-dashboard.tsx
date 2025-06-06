"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useFinancialStats } from "@/hooks/useQueries/useFinancial"
import { TrendingUp, TrendingDown, DollarSign, Calendar } from "lucide-react"

export function FinancialDashboard() {
  const { data: stats, isLoading } = useFinancialStats()

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-32 bg-gray-100 animate-pulse rounded-lg" />
        ))}
      </div>
    )
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
          <TrendingUp className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">
            {formatCurrency(stats?.totalRevenue || 0)}
          </div>
          <p className="text-xs text-muted-foreground">
            +{stats?.revenueGrowth || 0}% em relação ao mês anterior
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Despesas Totais</CardTitle>
          <TrendingDown className="h-4 w-4 text-red-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">
            {formatCurrency(stats?.totalExpenses || 0)}
          </div>
          <p className="text-xs text-muted-foreground">
            +{stats?.expensesGrowth || 0}% em relação ao mês anterior
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Lucro Líquido</CardTitle>
          <DollarSign className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600">
            {formatCurrency((stats?.totalRevenue || 0) - (stats?.totalExpenses || 0))}
          </div>
          <p className="text-xs text-muted-foreground">
            Margem de {stats?.profitMargin || 0}%
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Este Mês</CardTitle>
          <Calendar className="h-4 w-4 text-purple-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-purple-600">
            {formatCurrency(stats?.monthlyBalance || 0)}
          </div>
          <p className="text-xs text-muted-foreground">
            Saldo do mês atual
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
