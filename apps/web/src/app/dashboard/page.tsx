"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { MetricCard } from "@/components/dashboard/metric-card"
import { RevenueChart } from "@/components/dashboard/revenue-chart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useDashboard } from "@/hooks/useQueries/useDashboard"
import { TrendingUp, Users, Briefcase, DollarSign, Plus, Activity, Brain, Kanban, Sparkles, Zap } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const { data: stats, isLoading } = useDashboard()

  if (isLoading) {
    return (
      <MainLayout>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Dashboard</h1>
          </div>
          
          {/* Loading skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg animate-pulse" />
            ))}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-80 bg-gray-200 rounded-lg animate-pulse" />
            <div className="h-80 bg-gray-200 rounded-lg animate-pulse" />
          </div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="flex items-center gap-4">
            <Avatar size="lg" fallback="AG" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-gray-600">Visão geral do seu negócio</p>
                <Badge variant="secondary" className="text-xs">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Powered by IA
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Link href="/ia">
              <Button variant="gradient" size="sm">
                <Brain className="h-4 w-4 mr-2" />
                Central IA
              </Button>
            </Link>
            <Link href="/clientes">
              <Button variant="outline" size="sm">
                <Users className="h-4 w-4 mr-2" />
                Clientes
              </Button>
            </Link>
            <Link href="/projetos">
              <Button variant="glow" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Novo Projeto
              </Button>
            </Link>
          </div>
        </div>

        {/* Métricas principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Total de Clientes"
            value={stats?.totalClients || 0}
            icon={Users}
            description="Clientes ativos"
            trend={(stats?.totalClients || 0) > 0 ? "up" : "neutral"}
          />
          
          <MetricCard
            title="Projetos Ativos"
            value={stats?.activeProjects || 0}
            icon={Briefcase}
            description="Em andamento"
            trend={(stats?.activeProjects || 0) > 0 ? "up" : "neutral"}
          />
          
          <MetricCard
            title="Receita Mensal"
            value={`R$ ${(stats?.monthlyRevenue || 0).toLocaleString('pt-BR')}`}
            icon={DollarSign}
            description="Mês atual"
            trend={(stats?.growthRate || 0) > 0 ? "up" : (stats?.growthRate || 0) < 0 ? "down" : "neutral"}
          />
          
          <MetricCard
            title="Crescimento"
            value={`${(stats?.growthRate || 0).toFixed(1)}%`}
            icon={TrendingUp}
            description="vs mês anterior"
            trend={(stats?.growthRate || 0) > 0 ? "up" : (stats?.growthRate || 0) < 0 ? "down" : "neutral"}
          />
        </div>

        {/* Gráficos e atividades */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Gráfico de receita */}
          <div className="lg:col-span-2">
            <RevenueChart data={stats?.revenueChartData || []} />
          </div>

          {/* Atividades recentes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Atividades Recentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {(stats?.totalClients || 0) === 0 && (stats?.activeProjects || 0) === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <p className="mb-4">Nenhuma atividade ainda</p>
                    <div className="space-y-2">
                      <Link href="/clientes">
                        <Button variant="outline" size="sm" className="w-full">
                          <Users className="h-4 w-4 mr-2" />
                          Adicionar Cliente
                        </Button>
                      </Link>
                      <Link href="/projetos">
                        <Button variant="outline" size="sm" className="w-full">
                          <Briefcase className="h-4 w-4 mr-2" />
                          Criar Projeto
                        </Button>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium">Sistema inicializado</p>
                        <p className="text-xs text-gray-600">Dados carregados com sucesso</p>
                      </div>
                    </div>
                    
                    {(stats?.totalClients || 0) > 0 && (
                      <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <div>
                          <p className="text-sm font-medium">
                            {stats?.totalClients || 0} cliente(s) cadastrado(s)
                          </p>
                          <p className="text-xs text-gray-600">Base de clientes ativa</p>
                        </div>
                      </div>
                    )}
                    
                    {(stats?.activeProjects || 0) > 0 && (
                      <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <div>
                          <p className="text-sm font-medium">
                            {stats?.activeProjects || 0} projeto(s) ativo(s)
                          </p>
                          <p className="text-xs text-gray-600">Em desenvolvimento</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Links rápidos */}
        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <Link href="/clientes">
                <Button variant="outline" className="w-full h-20 flex-col">
                  <Users className="h-6 w-6 mb-2" />
                  <span>Clientes</span>
                </Button>
              </Link>
              
              <Link href="/projetos">
                <Button variant="outline" className="w-full h-20 flex-col">
                  <Briefcase className="h-6 w-6 mb-2" />
                  <span>Projetos</span>
                </Button>
              </Link>

              <Link href="/kanban">
                <Button variant="outline" className="w-full h-20 flex-col">
                  <Kanban className="h-6 w-6 mb-2" />
                  <span>Kanban</span>
                </Button>
              </Link>
              
              <Link href="/financeiro">
                <Button variant="outline" className="w-full h-20 flex-col">
                  <DollarSign className="h-6 w-6 mb-2" />
                  <span>Financeiro</span>
                </Button>
              </Link>
              
              <Link href="/ia">
                <Button variant="outline" className="w-full h-20 flex-col">
                  <Brain className="h-6 w-6 mb-2" />
                  <span>IA Central</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
