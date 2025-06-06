"use client"

import { Suspense } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RevenueForm } from "@/components/financial/revenue-form"
import { ExpenseForm } from "@/components/financial/expense-form"
import { FinancialDashboard } from "@/components/financial/financial-dashboard"
import { TransactionsList } from "@/components/financial/transactions-list"
import { CashFlowChart } from "@/components/financial/cash-flow-chart"
import { Plus, TrendingUp, TrendingDown, DollarSign, Calendar } from "lucide-react"

function FinanceiroPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Financeiro</h1>
          <p className="text-muted-foreground">Gerencie receitas, despesas e fluxo de caixa</p>
        </div>
        {/* Dashboard Cards */}
        <Suspense fallback={<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-100 animate-pulse rounded-lg" />
          ))}
        </div>}>
          <FinancialDashboard />
        </Suspense>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="mr-2 h-4 w-4" />
                Nova Receita
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Adicionar Receita</DialogTitle>
                <DialogDescription>
                  Registre uma nova entrada de receita para sua agência.
                </DialogDescription>
              </DialogHeader>
              <RevenueForm />
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
                <Plus className="mr-2 h-4 w-4" />
                Nova Despesa
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Adicionar Despesa</DialogTitle>
                <DialogDescription>
                  Registre uma nova despesa da sua agência.
                </DialogDescription>
              </DialogHeader>
              <ExpenseForm />
            </DialogContent>
          </Dialog>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="transactions" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="transactions">Transações</TabsTrigger>
            <TabsTrigger value="cashflow">Fluxo de Caixa</TabsTrigger>
            <TabsTrigger value="reports">Relatórios</TabsTrigger>
          </TabsList>

          <TabsContent value="transactions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Histórico de Transações
                </CardTitle>
                <CardDescription>
                  Visualize e gerencie todas as receitas e despesas registradas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={
                  <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="h-16 bg-gray-100 animate-pulse rounded" />
                    ))}
                  </div>
                }>
                  <TransactionsList />
                </Suspense>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cashflow" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Fluxo de Caixa
                </CardTitle>
                <CardDescription>
                  Acompanhe a evolução financeira da sua agência ao longo do tempo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={
                  <div className="h-80 bg-gray-100 animate-pulse rounded" />
                }>
                  <CashFlowChart />
                </Suspense>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Relatório Mensal
                  </CardTitle>
                  <CardDescription>
                    Resumo financeiro do mês atual
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="text-sm font-medium">Total de Receitas</span>
                      <span className="text-lg font-bold text-green-600">R$ 0,00</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                      <span className="text-sm font-medium">Total de Despesas</span>
                      <span className="text-lg font-bold text-red-600">R$ 0,00</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="text-sm font-medium">Lucro Líquido</span>
                      <span className="text-lg font-bold text-blue-600">R$ 0,00</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingDown className="h-5 w-5" />
                    Principais Despesas
                  </CardTitle>
                  <CardDescription>
                    Categorias com maior gasto
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Marketing</span>
                      <span className="text-sm font-medium">R$ 0,00</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Operacional</span>
                      <span className="text-sm font-medium">R$ 0,00</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Pessoal</span>
                      <span className="text-sm font-medium">R$ 0,00</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Infraestrutura</span>
                      <span className="text-sm font-medium">R$ 0,00</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}

export default FinanceiroPage
