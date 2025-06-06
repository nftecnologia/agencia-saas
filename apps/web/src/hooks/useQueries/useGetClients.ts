import { useQuery } from "@tanstack/react-query"
import { getClients } from "@/lib/actions/client.actions"

export function useGetClients() {
  return useQuery({
    queryKey: ["clients"],
    queryFn: getClients,
    staleTime: 1000 * 60 * 10, // 10 minutos (cache mais longo)
    gcTime: 1000 * 60 * 15, // 15 minutos no cache
    retry: 1, // Apenas 1 tentativa
    refetchOnWindowFocus: false, // Não refetch ao focar janela
  })
}
