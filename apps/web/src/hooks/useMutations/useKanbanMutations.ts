import { useMutation, useQueryClient } from "@tanstack/react-query"
import { moveProject, updateProject, deleteProject, createTask, updateTask, deleteTask } from "@/lib/actions/kanban.actions"

export function useMoveProject() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: moveProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kanban-projects"] })
    },
    onError: (error) => {
      console.error("Erro ao mover projeto:", error)
    }
  })
}

export function useUpdateProject() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: updateProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kanban-projects"] })
      queryClient.invalidateQueries({ queryKey: ["projects"] })
    },
    onError: (error) => {
      console.error("Erro ao atualizar projeto:", error)
    }
  })
}

export function useDeleteProject() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kanban-projects"] })
      queryClient.invalidateQueries({ queryKey: ["projects"] })
    },
    onError: (error) => {
      console.error("Erro ao excluir projeto:", error)
    }
  })
}

export function useCreateTask() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kanban-projects"] })
    },
    onError: (error) => {
      console.error("Erro ao criar task:", error)
    }
  })
}

export function useUpdateTask() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kanban-projects"] })
    },
    onError: (error) => {
      console.error("Erro ao atualizar task:", error)
    }
  })
}

export function useDeleteTask() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kanban-projects"] })
    },
    onError: (error) => {
      console.error("Erro ao excluir task:", error)
    }
  })
}
