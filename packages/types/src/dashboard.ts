export interface DashboardStats {
  totalClients: number
  activeProjects: number
  monthlyRevenue: number
  growthRate: number
  revenueChartData?: Array<{
    month: string
    revenue: number
  }>
  topClients?: Array<{
    id: string
    name: string
    revenue: number
  }>
  recentProjects?: Array<{
    id: string
    name: string
    status: string
    clientName: string
  }>
}

export interface RecentActivity {
  id: string
  type: 'client_created' | 'project_updated' | 'revenue_added' | 'expense_added'
  title: string
  subtitle?: string
  time: Date
}
