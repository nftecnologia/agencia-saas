import { useMutation, useQueryClient } from "@tanstack/react-query"
import { moveProject, updateProject, deleteProject, createTask, updateTask, deleteTask } from "@/lib/actions/kanban.actions"

export function useMoveProject() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async ({ projectId, newStatus }: { projectId: string, newStatus: "PLANNING" | "IN_PROGRESS" | "REVIEW" | "COMPLETED" }) => {
      const result = await moveProject({ projectId, newStatus })
      if (result?.data && 'success' in result.data && !result.data.success) {
        throw new Error(result.data.error.message)
      }
      return result
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kanban-projects"] })
    },
  })
}

export function useUpdateProject() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (data: { 
      projectId: string, 
      name?: string, 
      description?: string, 
      budget?: number, 
      priority?: "LOW" | "MEDIUM" | "HIGH" | "URGENT", 
      deadline?: string 
    }) => {
      const result = await updateProject(data)
      if (result?.data && 'success' in result.data && !result.data.success) {
        throw new Error(result.data.error.message)
      }
      return result
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kanban-projects"] })
    },
  })
}

export function useDeleteProject() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async ({ projectId }: { projectId: string }) => {
      const result = await deleteProject({ projectId })
      if (result?.data && 'success' in result.data && !result.data.success) {
        throw new Error(result.data.error.message)
      }
      return result
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kanban-projects"] })
    },
  })
}

export function useCreateTask() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (data: {
      projectId: string,
      title: string,
      description?: string,
      assignedTo?: string,
      priority?: "LOW" | "MEDIUM" | "HIGH" | "URGENT",
      dueDate?: string
    }) => {
      const result = await createTask(data)
      if (result?.data && 'success' in result.data && !result.data.success) {
        throw new Error(result.data.error.message)
      }
      return result
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kanban-projects"] })
    },
  })
}

export function useUpdateTask() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (data: {
      taskId: string,
      title?: string,
      completed?: boolean,
      status?: "TODO" | "IN_PROGRESS" | "REVIEW" | "DONE"
    }) => {
      const result = await updateTask(data)
      if (result?.data && 'success' in result.data && !result.data.success) {
        throw new Error(result.data.error.message)
      }
      return result
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kanban-projects"] })
    },
  })
}

export function useDeleteTask() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async ({ taskId }: { taskId: string }) => {
      const result = await deleteTask({ taskId })
      if (result?.data && 'success' in result.data && !result.data.success) {
        throw new Error(result.data.error.message)
      }
      return result
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kanban-projects"] })
    },
  })
}
