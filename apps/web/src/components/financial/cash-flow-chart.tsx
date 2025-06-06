"use client"

import { useTransactions } from "@/hooks/useQueries/useFinancial"

export function CashFlowChart() {
  const { data: transactions, isLoading } = useTransactions()

  if (isLoading) {
    return <div className="h-80 bg-gray-100 animate-pulse rounded" />
  }

  // For now, just show a placeholder chart
  // TODO: Implement actual chart with a library like recharts
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const totalRevenue = transactions?.filter(t => t.type === 'revenue')
    .reduce((sum, t) => sum + t.amount, 0) || 0

  const totalExpenses = transactions?.filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0) || 0

  const netFlow = totalRevenue - totalExpenses

  return (
    <div className="h-80 flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="text-2xl font-bold text-gray-600">Fluxo de Caixa</div>
        <div className="grid grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Receitas</div>
            <div className="text-xl font-bold text-green-600">
              {formatCurrency(totalRevenue)}
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Despesas</div>
            <div className="text-xl font-bold text-red-600">
              {formatCurrency(totalExpenses)}
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Saldo</div>
            <div className={`text-xl font-bold ${netFlow >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
              {formatCurrency(netFlow)}
            </div>
          </div>
        </div>
        <div className="text-sm text-muted-foreground mt-4">
          Gráfico detalhado será implementado em breve
        </div>
      </div>
    </div>
  )
}
