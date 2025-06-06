import { useQuery } from "@tanstack/react-query"
import { getClients } from "@/lib/actions/client.actions"

export function useGetClients() {
  return useQuery({
    queryKey: ["clients"],
    queryFn: getClients,
    staleTime: 1000 * 60 * 5, // 5 minutos
  })
}
