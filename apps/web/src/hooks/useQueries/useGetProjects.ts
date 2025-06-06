import { useQuery } from "@tanstack/react-query"
import { getProjects } from "@/lib/actions/project.actions"

export function useGetProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
    staleTime: 1000 * 60 * 5, // 5 minutos
  })
}
