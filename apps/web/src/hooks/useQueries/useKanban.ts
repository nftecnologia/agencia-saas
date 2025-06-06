import { useQuery } from "@tanstack/react-query"
import { getKanbanProjects } from "@/lib/actions/kanban.actions"

export function useKanbanProjects() {
  return useQuery({
    queryKey: ["kanban-projects"],
    queryFn: getKanbanProjects,
    staleTime: 1000 * 60 * 5, // 5 minutos
    retry: 1,
    refetchOnWindowFocus: false,
  })
}
