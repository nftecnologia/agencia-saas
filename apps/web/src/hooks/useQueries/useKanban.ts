import { useQuery } from "@tanstack/react-query"
import { getKanbanProjects } from "@/lib/actions/kanban.actions"
import type { KanbanProject } from "@/lib/actions/kanban.actions"

export function useKanbanProjects() {
  return useQuery({
    queryKey: ["kanban-projects"],
    queryFn: async (): Promise<KanbanProject[]> => {
      const result = await getKanbanProjects()
      
      if (result?.data) {
        if ('success' in result.data && result.data.success) {
          return result.data.data
        } else if ('success' in result.data && !result.data.success) {
          throw new Error(result.data.error.message)
        }
      }
      
      throw new Error("Erro ao buscar projetos")
    },
    staleTime: 1000 * 60 * 5, // 5 minutos
    retry: 1,
  })
}
