import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createClient } from "@/lib/actions/client.actions"
import type { CreateClientData } from "@agenciasaas/types"

export function useCreateClient() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createClient,
    onSuccess: () => {
      // Invalidar e refetch a lista de clientes
      queryClient.invalidateQueries({ queryKey: ["clients"] })
    },
    onError: (error) => {
      console.error("Erro ao criar cliente:", error)
    }
  })
}
