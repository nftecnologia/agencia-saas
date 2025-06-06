import { useQuery } from "@tanstack/react-query"
import { getProjects } from "@/lib/actions/project.actions"

export function useGetProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
    staleTime: 1000 * 60 * 10, // 10 minutos
    gcTime: 1000 * 60 * 15, // 15 minutos no cache
    retry: 1,
    refetchOnWindowFocus: false,
  })
}
