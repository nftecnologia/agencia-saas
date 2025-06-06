import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createRevenue, createExpense } from "@/lib/actions/financial.actions"

export function useCreateRevenue() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (data: any) => createRevenue(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["financial-stats"] })
      queryClient.invalidateQueries({ queryKey: ["transactions"] })
      queryClient.invalidateQueries({ queryKey: ["revenues"] })
    },
  })
}

export function useCreateExpense() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (data: any) => createExpense(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["financial-stats"] })
      queryClient.invalidateQueries({ queryKey: ["transactions"] })
      queryClient.invalidateQueries({ queryKey: ["expenses"] })
    },
  })
}
