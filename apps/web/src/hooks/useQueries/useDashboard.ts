import { useQuery } from "@tanstack/react-query"
import { getDashboardStats } from "@/lib/actions/dashboard.actions"

export function useDashboard() {
  return useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: getDashboardStats,
    staleTime: 1000 * 60 * 5, // 5 minutos
    gcTime: 1000 * 60 * 10, // 10 minutos no cache
    retry: 1,
    refetchOnWindowFocus: false,
  })
}
