import { useQuery } from "@tanstack/react-query"
import { getFinancialStats, getRevenues, getExpenses } from "@/lib/actions/financial.actions"

export function useFinancialStats() {
  return useQuery({
    queryKey: ["financial-stats"],
    queryFn: () => getFinancialStats(),
    staleTime: 1000 * 60 * 5, // 5 minutos
    gcTime: 1000 * 60 * 10, // 10 minutos no cache
    retry: 1,
    refetchOnWindowFocus: false,
  })
}

export function useTransactions() {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      const [revenues, expenses] = await Promise.all([
        getRevenues(),
        getExpenses()
      ])
      
      // Combine revenues and expenses with type indicator
      const transactions = [
        ...revenues.map((revenue: any) => ({ ...revenue, type: 'revenue' })),
        ...expenses.map((expense: any) => ({ ...expense, type: 'expense' }))
      ]
      
      // Sort by date (most recent first)
      return transactions.sort((a, b) => 
        new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime()
      )
    },
    staleTime: 1000 * 60 * 5, // 5 minutos
    gcTime: 1000 * 60 * 10, // 10 minutos no cache
    retry: 1,
    refetchOnWindowFocus: false,
  })
}

export function useRevenues() {
  return useQuery({
    queryKey: ["revenues"],
    queryFn: () => getRevenues(),
    staleTime: 1000 * 60 * 5, // 5 minutos
    gcTime: 1000 * 60 * 10, // 10 minutos no cache
    retry: 1,
    refetchOnWindowFocus: false,
  })
}

export function useExpenses() {
  return useQuery({
    queryKey: ["expenses"],
    queryFn: () => getExpenses(),
    staleTime: 1000 * 60 * 5, // 5 minutos
    gcTime: 1000 * 60 * 10, // 10 minutos no cache
    retry: 1,
    refetchOnWindowFocus: false,
  })
}
