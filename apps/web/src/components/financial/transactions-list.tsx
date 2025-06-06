"use client"

import { Button } from "@/components/ui/button"
import { useTransactions } from "@/hooks/useQueries/useFinancial"
import { Edit, Trash2, ArrowUpCircle, ArrowDownCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function TransactionsList() {
  const { data: transactions, isLoading } = useTransactions()

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 bg-gray-100 animate-pulse rounded" />
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

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('pt-BR')
  }

  if (!transactions || transactions.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Nenhuma transação encontrada</p>
        <p className="text-sm text-muted-foreground mt-2">
          Comece adicionando receitas e despesas para acompanhar seu fluxo financeiro
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
        >
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              {transaction.type === 'revenue' ? (
                <ArrowUpCircle className="h-8 w-8 text-green-600" />
              ) : (
                <ArrowDownCircle className="h-8 w-8 text-red-600" />
              )}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h4 className="font-medium">{transaction.description}</h4>
                <Badge variant={transaction.type === 'revenue' ? 'default' : 'destructive'}>
                  {transaction.type === 'revenue' ? 'Receita' : 'Despesa'}
                </Badge>
              </div>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span>Cliente: {transaction.client?.name || 'N/A'}</span>
                <span>Data: {formatDate(transaction.dueDate)}</span>
                <span>Status: {transaction.status}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className={`text-lg font-bold ${
                transaction.type === 'revenue' ? 'text-green-600' : 'text-red-600'
              }`}>
                {transaction.type === 'revenue' ? '+' : '-'}{formatCurrency(transaction.amount)}
              </div>
              {transaction.category && (
                <div className="text-sm text-muted-foreground">
                  {transaction.category}
                </div>
              )}
            </div>
            
            <div className="flex space-x-2">
              <Button size="sm" variant="outline">
                <Edit className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
