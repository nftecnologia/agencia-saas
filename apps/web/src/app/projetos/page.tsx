"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, MoreHorizontal, Edit, Trash2, Eye, Calendar, DollarSign } from "lucide-react"

// Mock data para teste
const mockProjects = [
  {
    id: "1",
    name: "Website Corporativo",
    description: "Desenvolvimento de site institucional",
    status: "in_progress",
    budget: 15000,
    startDate: new Date("2024-01-15"),
    client: { name: "Empresa ABC" }
  },
  {
    id: "2", 
    name: "App Mobile",
    description: "Aplicativo para delivery",
    status: "planning",
    budget: 25000,
    startDate: new Date("2024-02-01"),
    client: { name: "Restaurante XYZ" }
  }
]

function ProjectCard({ project }: { project: any }) {
  const [showDropdown, setShowDropdown] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'in_progress': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'review': return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'completed': return 'bg-green-100 text-green-800 border-green-200'
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'planning': return 'Planejamento'
      case 'in_progress': return 'Em Andamento'
      case 'review': return 'Revisão'
      case 'completed': return 'Concluído'
      case 'cancelled': return 'Cancelado'
      default: return status
    }
  }

  const handleEdit = () => {
    setIsEditModalOpen(true)
    setShowDropdown(false)
  }

  const handleDelete = () => {
    setIsDeleteDialogOpen(true)
    setShowDropdown(false)
  }

  const handleView = () => {
    alert(`Visualizar projeto: ${project.name}`)
    setShowDropdown(false)
  }

  return (
    <>
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg font-semibold">{project.name}</CardTitle>
            <div className="relative">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
              
              {showDropdown && (
                <div className="absolute right-0 top-8 z-50 min-w-[8rem] overflow-hidden rounded-md border bg-white p-1 text-sm shadow-md">
                  <div
                    className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-gray-100"
                    onClick={handleEdit}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Editar
                  </div>
                  <div
                    className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-gray-100"
                    onClick={handleView}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Visualizar
                  </div>
                  <div
                    className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-gray-100 text-red-600"
                    onClick={handleDelete}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Excluir
                  </div>
                </div>
              )}
            </div>
          </div>
          {project.description && (
            <p className="text-sm text-gray-500 mt-1">{project.description}</p>
          )}
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(project.status)}`}>
                {getStatusLabel(project.status)}
              </span>
            </div>
            
            <div className="space-y-2">
              {project.budget && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <DollarSign className="h-4 w-4" />
                  <span>R$ {project.budget.toLocaleString('pt-BR')}</span>
                </div>
              )}
              
              {project.startDate && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(project.startDate).toLocaleDateString('pt-BR')}</span>
                </div>
              )}
              
              {project.client && (
                <div className="text-sm text-gray-600">
                  Cliente: <strong>{project.client.name}</strong>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex gap-2 mt-4">
            <Button 
              size="sm" 
              variant="outline" 
              className="flex-1"
              onClick={handleEdit}
            >
              <Edit className="h-4 w-4 mr-2" />
              Editar
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="text-red-600 hover:text-red-700"
              onClick={handleDelete}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Editar Projeto</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Funcionalidade de edição será implementada em breve.
              </p>
              <Button 
                onClick={() => setIsEditModalOpen(false)}
                className="w-full"
              >
                Fechar
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Delete Dialog */}
      {isDeleteDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Confirmar Exclusão</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Tem certeza que deseja excluir o projeto "{project.name}"? 
                Esta ação não pode ser desfeita.
              </p>
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => setIsDeleteDialogOpen(false)}
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={() => {
                    alert(`Projeto "${project.name}" excluído!`)
                    setIsDeleteDialogOpen(false)
                  }}
                  className="flex-1"
                >
                  Excluir
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}

export default function ProjetosPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  
  const filteredProjects = mockProjects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = !statusFilter || project.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const handleCreateProject = () => {
    setIsCreateModalOpen(true)
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Projetos</h1>
            <p className="text-gray-600 mt-1">
              {mockProjects.length} projeto(s) cadastrado(s)
            </p>
          </div>
          <Button onClick={handleCreateProject}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Projeto
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar projetos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Status Filter */}
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white min-w-[180px]"
          >
            <option value="">Todos os status</option>
            <option value="planning">Planejamento</option>
            <option value="in_progress">Em Andamento</option>
            <option value="review">Revisão</option>
            <option value="completed">Concluído</option>
            <option value="cancelled">Cancelado</option>
          </select>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <div className="text-gray-500">
              {searchTerm || statusFilter ? (
                <>
                  <p className="text-lg font-medium mb-2">Nenhum projeto encontrado</p>
                  <p>Tente ajustar os filtros ou limpe a pesquisa.</p>
                </>
              ) : (
                <>
                  <p className="text-lg font-medium mb-2">Nenhum projeto cadastrado</p>
                  <p className="mb-4">Comece criando seu primeiro projeto.</p>
                  <Button onClick={handleCreateProject}>
                    <Plus className="h-4 w-4 mr-2" />
                    Criar Projeto
                  </Button>
                </>
              )}
            </div>
          </Card>
        )}

        {/* Create Project Modal */}
        {isCreateModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>Novo Projeto</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Funcionalidade de criação de projetos será implementada em breve.
                </p>
                <Button 
                  onClick={() => setIsCreateModalOpen(false)}
                  className="w-full"
                >
                  Fechar
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </MainLayout>
  )
}
