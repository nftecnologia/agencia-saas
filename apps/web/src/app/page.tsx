import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, DollarSign, Users, FolderOpen, TrendingUp } from "lucide-react";
import Link from "next/link";

const stats = [
  {
    title: "Total de Clientes",
    value: "124",
    icon: Users,
    change: "+12%",
    changeLabel: "desde o mês passado",
  },
  {
    title: "Projetos Ativos",
    value: "23",
    icon: FolderOpen,
    change: "+4",
    changeLabel: "novos projetos",
  },
  {
    title: "Receita Mensal",
    value: "R$ 45.231",
    icon: DollarSign,
    change: "+22%",
    changeLabel: "comparado ao mês anterior",
  },
  {
    title: "Taxa de Crescimento",
    value: "18%",
    icon: TrendingUp,
    change: "+3%",
    changeLabel: "crescimento anual",
  },
];

export default function HomePage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Bem-vindo ao AgênciaOS</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-gray-500 mt-1">
                  <span className="text-green-600 font-medium">{stat.change}</span>{" "}
                  {stat.changeLabel}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                Novo Cliente
                <ArrowRight className="h-5 w-5 text-gray-400" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Cadastre um novo cliente e gerencie seus projetos
              </p>
              <Link href="/clientes">
                <Button className="mt-4" size="sm">
                  Adicionar Cliente
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                Criar Projeto
                <ArrowRight className="h-5 w-5 text-gray-400" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Inicie um novo projeto para seus clientes
              </p>
              <Link href="/projetos">
                <Button className="mt-4" size="sm">
                  Novo Projeto
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                Relatórios
                <ArrowRight className="h-5 w-5 text-gray-400" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Visualize relatórios detalhados da sua agência
              </p>
              <Link href="/financeiro">
                <Button className="mt-4" size="sm">
                  Ver Relatórios
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
