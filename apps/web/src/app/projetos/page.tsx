import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Plus, MoreVertical } from "lucide-react";

const projetos = [
  {
    id: 1,
    nome: "Redesign do Site Institucional",
    descricao: "Redesign completo do site da empresa com nova layout responsivo",
    status: "Em andamento",
    valor: 15000,
    data: "26/06/2024",
  },
  {
    id: 2,
    nome: "Consultoria E-commerce",
    descricao: "Análise e otimização da plataforma de e-commerce",
    status: "Concluído",
    valor: 8000,
    data: "14/05/2024",
  },
  {
    id: 3,
    nome: "Sistema de CRM",
    descricao: "Desenvolvimento de sistema CRM personalizado",
    status: "Concluído",
    valor: 25000,
    data: "30/01/2024",
  },
];

function getStatusColor(status: string) {
  switch (status) {
    case "Em andamento":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "Concluído":
      return "bg-green-100 text-green-800 border-green-200";
    case "Urgente":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
}

export default function ProjetosPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Projetos</h1>
          <p className="text-gray-500 mt-1">Gerencie todos os projetos da sua agência</p>
        </div>

        {/* Filters and Actions */}
        <div className="flex gap-4 items-center">
          {/* Search */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar projetos..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Status Filter */}
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white">
            <option value="">Filtrar por status</option>
            <option value="em-andamento">Em andamento</option>
            <option value="concluido">Concluído</option>
            <option value="urgente">Urgente</option>
          </select>

          {/* New Project Button */}
          <Button className="ml-auto">
            <Plus className="w-4 h-4 mr-2" />
            Novo Projeto
          </Button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projetos.map((projeto) => (
            <Card key={projeto.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{projeto.nome}</CardTitle>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-1">{projeto.descricao}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(
                        projeto.status
                      )}`}
                    >
                      {projeto.status}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">
                      R$ {projeto.valor.toLocaleString("pt-BR")}
                    </span>
                    <span className="text-gray-500">{projeto.data}</span>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button size="sm" variant="outline" className="flex-1">
                    Editar
                  </Button>
                  <Button size="sm" variant="destructive" className="flex-1">
                    Excluir
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
