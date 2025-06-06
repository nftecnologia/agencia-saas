import { useEffect } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { usePathname } from "next/navigation"
import { getClients } from "@/lib/actions/client.actions"
import { getDashboardStats } from "@/lib/actions/dashboard.actions"
import { getFinancialStats } from "@/lib/actions/financial.actions"
import { getKanbanProjects } from "@/lib/actions/kanban.actions"

/**
 * Hook para fazer prefetch inteligente de dados baseado na navegação do usuário
 */
export function useDataPrefetch() {
  const queryClient = useQueryClient()
  const pathname = usePathname()

  useEffect(() => {
    // Prefetch dados essenciais em todas as páginas
    const prefetchEssentialData = async () => {
      // Sempre fazer prefetch dos clientes (usado em vários lugares)
      queryClient.prefetchQuery({
        queryKey: ["clients"],
        queryFn: getClients,
        staleTime: 1000 * 60 * 10, // 10 minutos
      })

      // Sempre fazer prefetch das stats do dashboard
      queryClient.prefetchQuery({
        queryKey: ["dashboard-stats"],
        queryFn: getDashboardStats,
        staleTime: 1000 * 60 * 5, // 5 minutos
      })
    }

    // Prefetch específico baseado na rota atual
    const prefetchRouteSpecificData = async () => {
      if (pathname.includes('/financeiro')) {
        // Se está na página financeira, prefetch dados financeiros
        queryClient.prefetchQuery({
          queryKey: ["financial-stats"],
          queryFn: getFinancialStats,
          staleTime: 1000 * 60 * 5,
        })
      }

      if (pathname.includes('/kanban')) {
        // Se está no kanban, prefetch projetos do kanban
        queryClient.prefetchQuery({
          queryKey: ["kanban-projects"],
          queryFn: getKanbanProjects,
          staleTime: 1000 * 60 * 5,
        })
      }
    }

    // Executar prefetch com delay para não impactar a navegação
    const timer = setTimeout(() => {
      prefetchEssentialData()
      prefetchRouteSpecificData()
    }, 100)

    return () => clearTimeout(timer)
  }, [pathname, queryClient])

  // Prefetch inteligente baseado em hover/focus
  const prefetchOnHover = (dataType: 'clients' | 'financial' | 'kanban' | 'dashboard') => {
    const prefetchMap = {
      clients: () => queryClient.prefetchQuery({
        queryKey: ["clients"],
        queryFn: getClients,
        staleTime: 1000 * 60 * 10,
      }),
      financial: () => queryClient.prefetchQuery({
        queryKey: ["financial-stats"],
        queryFn: getFinancialStats,
        staleTime: 1000 * 60 * 5,
      }),
      kanban: () => queryClient.prefetchQuery({
        queryKey: ["kanban-projects"],
        queryFn: getKanbanProjects,
        staleTime: 1000 * 60 * 5,
      }),
      dashboard: () => queryClient.prefetchQuery({
        queryKey: ["dashboard-stats"],
        queryFn: getDashboardStats,
        staleTime: 1000 * 60 * 5,
      })
    }

    return prefetchMap[dataType]
  }

  return { prefetchOnHover }
}

/**
 * Hook para prefetch quando o mouse passa sobre links de navegação
 */
export function useLinkPrefetch() {
  const { prefetchOnHover } = useDataPrefetch()

  const handleLinkHover = (route: string) => {
    switch (route) {
      case '/clientes':
        prefetchOnHover('clients')()
        break
      case '/financeiro':
        prefetchOnHover('financial')()
        break
      case '/kanban':
        prefetchOnHover('kanban')()
        break
      case '/dashboard':
        prefetchOnHover('dashboard')()
        break
    }
  }

  return { handleLinkHover }
}
