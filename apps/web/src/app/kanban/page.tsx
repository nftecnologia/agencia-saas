"use client"

import { useState, useEffect, useRef } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  MoreHorizontal, 
  Plus, 
  Search, 
  Filter, 
  Calendar, 
  DollarSign, 
  User,
  Clock,
  AlertCircle,
  CheckCircle2,
  Edit,
  Trash2,
  Eye,
  ExternalLink
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useGetClients } from "@/hooks/useQueries/useGetClients"
import { useKanbanProjects } from "@/hooks/useQueries/useKanban"
import { useMoveProject, useUpdateProject, useDeleteProject, useCreateTask, useUpdateTask, useDeleteTask } from "@/hooks/useMutations/useKanbanMutations"
import Link from "next/link"

// Mock data para projetos
const mockProjects = [
  {
    id: "1",
    name: "Website Corporativo",
    description: "Desenvolvimento de site institucional para empresa de tecnologia",
    status: "planning",
    priority: "high",
    budget: 15000,
    startDate: "2024-01-15",
    deadline: "2024-03-15",
    client: { name: "Tech Corp", avatar: "TC" },
    team: [
      { name: "João Silva", avatar: "JS" },
      { name: "Maria Santos", avatar: "MS" }
    ],
    progress: 25,
    tags: ["Website", "Corporativo", "Responsivo"],
    tasks: [
      { id: "t1", title: "Criar wireframes das páginas", completed: true, assignee: "João Silva" },
      { id: "t2", title: "Desenvolver layout responsivo", completed: false, assignee: "Maria Santos" },
      { id: "t3", title: "Implementar sistema de contato", completed: false, assignee: "João Silva" },
      { id: "t4", title: "Testes em diferentes dispositivos", completed: false, assignee: "Maria Santos" }
    ]
  },
  {
    id: "2",
    name: "App Mobile de Delivery",
    description: "Aplicativo para entrega de comida com sistema de pagamento integrado",
    status: "in_progress", 
    priority: "urgent",
    budget: 35000,
    startDate: "2024-02-01",
    deadline: "2024-05-01",
    client: { name: "FoodApp", avatar: "FA" },
    team: [
      { name: "Carlos Lima", avatar: "CL" },
      { name: "Ana Costa", avatar: "AC" },
      { name: "Pedro Souza", avatar: "PS" }
    ],
    progress: 60,
    tags: ["Mobile", "React Native", "API"],
    tasks: [
      { id: "t5", title: "Setup do projeto React Native", completed: true, assignee: "Carlos Lima" },
      { id: "t6", title: "Desenvolvimento da tela de login", completed: true, assignee: "Ana Costa" },
      { id: "t7", title: "Integração com API de pagamentos", completed: true, assignee: "Pedro Souza" },
      { id: "t8", title: "Implementar carrinho de compras", completed: false, assignee: "Carlos Lima" },
      { id: "t9", title: "Sistema de notificações push", completed: false, assignee: "Ana Costa" }
    ]
  },
  {
    id: "3",
    name: "Sistema de CRM",
    description: "Plataforma completa para gestão de relacionamento com clientes",
    status: "review",
    priority: "medium",
    budget: 28000,
    startDate: "2024-01-10",
    deadline: "2024-04-10",
    client: { name: "Sales Pro", avatar: "SP" },
    team: [
      { name: "Lucas Oliveira", avatar: "LO" }
    ],
    progress: 85,
    tags: ["CRM", "Dashboard", "Integração"],
    tasks: [
      { id: "t10", title: "Banco de dados e modelagem", completed: true, assignee: "Lucas Oliveira" },
      { id: "t11", title: "API de contatos", completed: true, assignee: "Lucas Oliveira" },
      { id: "t12", title: "Dashboard principal", completed: true, assignee: "Lucas Oliveira" },
      { id: "t13", title: "Relatórios de vendas", completed: true, assignee: "Lucas Oliveira" },
      { id: "t14", title: "Testes finais e otimização", completed: false, assignee: "Lucas Oliveira" }
    ]
  },
  {
    id: "4",
    name: "E-commerce Fashion",
    description: "Loja virtual para marca de moda com catálogo extenso",
    status: "completed",
    priority: "low",
    budget: 22000,
    startDate: "2023-11-01",
    deadline: "2024-01-31",
    client: { name: "Style Store", avatar: "SS" },
    team: [
      { name: "Fernanda Reis", avatar: "FR" },
      { name: "Roberto Lima", avatar: "RL" }
    ],
    progress: 100,
    tags: ["E-commerce", "Fashion", "SEO"],
    tasks: [
      { id: "t15", title: "Catálogo de produtos", completed: true, assignee: "Fernanda Reis" },
      { id: "t16", title: "Sistema de carrinho", completed: true, assignee: "Roberto Lima" },
      { id: "t17", title: "Gateway de pagamento", completed: true, assignee: "Fernanda Reis" },
      { id: "t18", title: "Área administrativa", completed: true, assignee: "Roberto Lima" },
      { id: "t19", title: "SEO e otimizações", completed: true, assignee: "Fernanda Reis" }
    ]
  },
  {
    id: "5",
    name: "Dashboard Analytics",
    description: "Painel de controle para análise de dados em tempo real",
    status: "planning",
    priority: "medium",
    budget: 18000,
    startDate: "2024-03-01",
    deadline: "2024-06-01",
    client: { name: "Data Insights", avatar: "DI" },
    team: [
      { name: "Marina Azevedo", avatar: "MA" }
    ],
    progress: 10,
    tags: ["Analytics", "Dashboard", "Real-time"],
    tasks: [
      { id: "t20", title: "Levantamento de requisitos", completed: true, assignee: "Marina Azevedo" },
      { id: "t21", title: "Wireframes e protótipos", completed: false, assignee: "Marina Azevedo" },
      { id: "t22", title: "Configuração da infraestrutura", completed: false, assignee: "Marina Azevedo" },
      { id: "t23", title: "Desenvolvimento dos gráficos", completed: false, assignee: "Marina Azevedo" },
      { id: "t24", title: "Integração com APIs externas", completed: false, assignee: "Marina Azevedo" }
    ]
  }
]

const kanbanColumns = [
  {
    id: "planning",
    title: "Planejamento",
    color: "bg-blue-500",
    count: 0
  },
  {
    id: "in_progress", 
    title: "Em Andamento",
    color: "bg-yellow-500",
    count: 0
  },
  {
    id: "review",
    title: "Revisão",
    color: "bg-purple-500", 
    count: 0
  },
  {
    id: "completed",
    title: "Concluído",
    color: "bg-green-500",
    count: 0
  }
]

function ProjectCard({ project, onDragStart, onEdit, onDelete, onView }: { 
  project: any; 
  onDragStart: (e: any, projectId: string) => void;
  onEdit: (project: any) => void;
  onDelete: (projectId: string) => void;
  onView: (project: any) => void;
}) {
  const [isDragging, setIsDragging] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Fecha o menu quando clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false)
      }
    }

    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }
  }, [showMenu])

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200'
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'medium': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'low': return 'bg-gray-100 text-gray-800 border-gray-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'urgent': return <AlertCircle className="h-3 w-3" />
      case 'high': return <Clock className="h-3 w-3" />
      case 'medium': return <Calendar className="h-3 w-3" />
      case 'low': return <CheckCircle2 className="h-3 w-3" />
      default: return null
    }
  }

  const daysLeft = Math.ceil((new Date(project.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))

  const handleDragStart = (e: React.DragEvent) => {
    setIsDragging(true)
    e.dataTransfer.setData('text/plain', project.id)
    e.dataTransfer.effectAllowed = 'move'
    onDragStart(e, project.id)
  }

  const handleDragEnd = () => {
    setIsDragging(false)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    // Prevent drag when clicking on dropdown
    if ((e.target as HTMLElement).closest('[data-dropdown-trigger]')) {
      e.stopPropagation()
    }
  }

  return (
    <Card 
      className={`group hover:shadow-lg transition-all duration-200 border-l-4 border-l-blue-500 relative ${
        isDragging ? 'opacity-50 scale-95 shadow-2xl rotate-2 z-50' : 'opacity-100 scale-100 cursor-move'
      }`}
      draggable={!isDragging}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onMouseDown={handleMouseDown}
    >
      <CardHeader className="pb-2 px-3 pt-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xs font-semibold leading-tight flex-1 pr-2">
            {project.name}
          </CardTitle>
          <div className="relative">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6 opacity-0 group-hover:opacity-100 hover:opacity-100 transition-opacity"
              onMouseDown={(e) => e.stopPropagation()}
              onDragStart={(e) => e.preventDefault()}
              onClick={(e) => {
                e.stopPropagation()
                setShowMenu(!showMenu)
              }}
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
            
            {showMenu && (
              <div 
                ref={menuRef}
                className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
              >
                <div className="py-1">
                  <button
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={(e) => {
                      e.stopPropagation()
                      setShowMenu(false)
                      onView(project)
                    }}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Ver Detalhes
                  </button>
                  <button
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={(e) => {
                      e.stopPropagation()
                      setShowMenu(false)
                      onEdit(project)
                    }}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Editar
                  </button>
                  <button
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    onClick={(e) => {
                      e.stopPropagation()
                      setShowMenu(false)
                      onDelete(project.id)
                    }}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Excluir
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <p className="text-xs text-gray-600 line-clamp-2">
          {project.description}
        </p>
      </CardHeader>
      
      <CardContent className="space-y-2 px-3 pb-3">
        {/* Progress Bar */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-gray-500">Progresso</span>
            <span className="text-xs font-medium">{project.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div 
              className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>

        {/* Info Row */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <DollarSign className="h-3 w-3" />
            <span>R$ {project.budget.toLocaleString('pt-BR')}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span className={daysLeft < 7 ? 'text-red-600 font-medium' : ''}>
              {daysLeft > 0 ? `${daysLeft}d` : 'Vencido'}
            </span>
          </div>
        </div>

        {/* Team & Priority */}
        <div className="flex items-center justify-between">
          <div className="flex -space-x-1">
            {project.team.slice(0, 2).map((member: any, index: number) => (
              <div 
                key={index}
                className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center border border-white text-xs font-medium"
                title={member.name}
              >
                {member.avatar}
              </div>
            ))}
            {project.team.length > 2 && (
              <div className="w-5 h-5 bg-gray-300 rounded-full flex items-center justify-center border border-white text-xs">
                +{project.team.length - 2}
              </div>
            )}
          </div>
          
          <span className={`text-xs px-1.5 py-0.5 rounded border flex items-center gap-1 ${getPriorityColor(project.priority)}`}>
            {getPriorityIcon(project.priority)}
            {project.priority === 'urgent' ? 'Urg' : 
             project.priority === 'high' ? 'Alt' :
             project.priority === 'medium' ? 'Med' : 'Bai'}
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {project.tags.slice(0, 1).map((tag: string, index: number) => (
            <span key={index} className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
              {tag}
            </span>
          ))}
          {project.tags.length > 1 && (
            <span className="text-xs text-gray-400">+{project.tags.length - 1}</span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function KanbanColumn({ column, projects, onDrop, onDragOver, onDragEnter, onDragLeave, isDragOver, onEdit, onDelete, onView }: { 
  column: any; 
  projects: any[]; 
  onDrop: (e: any, status: string) => void;
  onDragOver: (e: any) => void;
  onDragEnter: (e: any, status: string) => void;
  onDragLeave: (e: any) => void;
  isDragOver: boolean;
  onEdit: (project: any) => void;
  onDelete: (projectId: string) => void;
  onView: (project: any) => void;
}) {
  return (
    <div className="flex-1 min-w-[300px]">
      <div className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${column.color}`} />
            <h3 className="font-semibold text-gray-900">{column.title}</h3>
            <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
              {projects.length}
            </span>
          </div>
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div 
        className={`space-y-3 min-h-[500px] p-3 rounded-lg border-2 border-dashed transition-all duration-200 ${
          isDragOver 
            ? `border-blue-400 bg-blue-50 ${column.color.replace('bg-', 'bg-opacity-10 bg-')}` 
            : 'border-gray-200 bg-gray-50'
        }`}
        onDrop={(e) => onDrop(e, column.id)}
        onDragOver={onDragOver}
        onDragEnter={(e) => onDragEnter(e, column.id)}
        onDragLeave={onDragLeave}
      >
        {projects.map((project) => (
          <ProjectCard 
            key={project.id} 
            project={project}
            onDragStart={(e, projectId) => {
              e.dataTransfer.setData('text/plain', projectId)
            }}
            onEdit={onEdit}
            onDelete={onDelete}
            onView={onView}
          />
        ))}
        
        {projects.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <div className="mb-3">
              <div className={`w-12 h-12 rounded-full ${column.color} opacity-20 mx-auto flex items-center justify-center`}>
                <Plus className="h-6 w-6" />
              </div>
            </div>
            <p className="text-sm">
              {isDragOver ? 'Solte o projeto aqui' : 'Nenhum projeto'}
            </p>
          </div>
        )}
        
        {isDragOver && projects.length > 0 && (
          <div className="border-2 border-dashed border-blue-400 rounded-lg p-4 bg-blue-50 text-center text-blue-600">
            <Plus className="h-6 w-6 mx-auto mb-2" />
            <p className="text-sm font-medium">Solte aqui para mover</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function KanbanPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPriority, setSelectedPriority] = useState("")
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null)
  
  // Buscar dados reais
  const { data: clients, isLoading: clientsLoading } = useGetClients()
  const { data: projects = [], isLoading: projectsLoading, error: projectsError } = useKanbanProjects()
  const moveProjectMutation = useMoveProject()
  const updateProjectMutation = useUpdateProject()
  const deleteProjectMutation = useDeleteProject()
  const createTaskMutation = useCreateTask()
  const updateTaskMutation = useUpdateTask()
  const deleteTaskMutation = useDeleteTask()
  
  // Estados para os modais
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [newProjectModalOpen, setNewProjectModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [editForm, setEditForm] = useState<any>({})
  const [newProjectForm, setNewProjectForm] = useState({
    name: '',
    description: '',
    budget: '',
    priority: 'medium',
    deadline: '',
    startDate: '',
    clientName: '',
    tags: '',
    status: 'planning'
  })

  const handleDragOver = (e: any) => {
    e.preventDefault()
  }

  const handleDragEnter = (e: any, columnId: string) => {
    e.preventDefault()
    setDragOverColumn(columnId)
  }

  const handleDragLeave = (e: any) => {
    e.preventDefault()
    // Só remove o highlight se estivermos saindo da área da coluna
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setDragOverColumn(null)
    }
  }

  const handleDrop = (e: any, newStatus: string) => {
    e.preventDefault()
    const projectId = e.dataTransfer.getData('text/plain')
    
    // Mapear status do Kanban para status do banco
    const statusMap: Record<string, "PLANNING" | "IN_PROGRESS" | "REVIEW" | "COMPLETED"> = {
      planning: "PLANNING",
      in_progress: "IN_PROGRESS", 
      review: "REVIEW",
      completed: "COMPLETED"
    }
    
    moveProjectMutation.mutate({
      projectId,
      newStatus: statusMap[newStatus]
    })
    
    setDragOverColumn(null)
  }

  const handleEditProject = (project: any) => {
    setSelectedProject(project)
    setEditForm({
      name: project.name,
      description: project.description,
      budget: project.budget,
      priority: project.priority,
      progress: project.progress,
      deadline: project.deadline
    })
    setEditModalOpen(true)
  }

  const handleDeleteProject = (projectId: string) => {
    const project = projects.find(p => p.id === projectId)
    if (confirm(`🗑️ Tem certeza que deseja excluir o projeto "${project?.name}"?\n\nEsta ação não pode ser desfeita!`)) {
      deleteProjectMutation.mutate({ projectId })
    }
  }

  const handleViewProject = (project: any) => {
    setSelectedProject(project)
    setViewModalOpen(true)
  }

  const handleSaveEdit = () => {
    if (selectedProject) {
      updateProjectMutation.mutate({
        projectId: selectedProject.id,
        ...editForm
      })
      setEditModalOpen(false)
      setSelectedProject(null)
      setEditForm({})
    }
  }

  const handleCreateProject = () => {
    const newProject = {
      id: Date.now().toString(),
      name: newProjectForm.name,
      description: newProjectForm.description,
      status: newProjectForm.status,
      priority: newProjectForm.priority,
      budget: parseInt(newProjectForm.budget) || 0,
      startDate: newProjectForm.startDate,
      deadline: newProjectForm.deadline,
      client: { 
        name: newProjectForm.clientName || 'Cliente Não Informado', 
        avatar: newProjectForm.clientName ? newProjectForm.clientName.substring(0,2).toUpperCase() : 'CN'
      },
      team: [
        { name: 'Usuário Atual', avatar: 'UC' }
      ],
      progress: 0,
      tags: newProjectForm.tags ? newProjectForm.tags.split(',').map(tag => tag.trim()) : [],
      tasks: [
        { id: `t${Date.now()}`, title: "Configuração inicial do projeto", completed: false, assignee: "Usuário Atual" }
      ]
    }

    // TODO: Implementar criação real de projeto
    setNewProjectModalOpen(false)
    
    // Reset form
    setNewProjectForm({
      name: '',
      description: '',
      budget: '',
      priority: 'medium',
      deadline: '',
      startDate: '',
      clientName: '',
      tags: '',
      status: 'planning'
    })
  }

  const handleNewProjectClick = () => {
    setNewProjectModalOpen(true)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200'
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'medium': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'low': return 'bg-gray-100 text-gray-800 border-gray-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'urgent': return <AlertCircle className="h-3 w-3" />
      case 'high': return <Clock className="h-3 w-3" />
      case 'medium': return <Calendar className="h-3 w-3" />
      case 'low': return <CheckCircle2 className="h-3 w-3" />
      default: return null
    }
  }

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.client.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPriority = !selectedPriority || project.priority === selectedPriority
    
    return matchesSearch && matchesPriority
  })

  const getProjectsByStatus = (status: string) => {
    return filteredProjects.filter(project => project.status === status)
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Kanban Board</h1>
            <p className="text-gray-600 mt-1">
              Gestão visual de projetos
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>
            <Button onClick={handleNewProjectClick}>
              <Plus className="h-4 w-4 mr-2" />
              Novo Projeto
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar projetos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <select 
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white min-w-[150px]"
          >
            <option value="">Todas as prioridades</option>
            <option value="urgent">Urgente</option>
            <option value="high">Alta</option>
            <option value="medium">Média</option>
            <option value="low">Baixa</option>
          </select>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {kanbanColumns.map((column) => {
            const columnProjects = getProjectsByStatus(column.id)
            const totalBudget = columnProjects.reduce((sum, project) => sum + (project.budget || 0), 0)
            
            return (
              <Card key={column.id}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-3 h-3 rounded-full ${column.color}`} />
                    <span className="text-sm font-medium text-gray-700">{column.title}</span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl font-bold">{columnProjects.length}</p>
                    <p className="text-xs text-gray-500">
                      R$ {totalBudget.toLocaleString('pt-BR')} total
                    </p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Kanban Board */}
        <div className="overflow-x-auto">
          <div className="flex gap-6 min-w-max pb-4">
            {kanbanColumns.map((column) => (
              <KanbanColumn
                key={column.id}
                column={column}
                projects={getProjectsByStatus(column.id)}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                isDragOver={dragOverColumn === column.id}
                onEdit={handleEditProject}
                onDelete={handleDeleteProject}
                onView={handleViewProject}
              />
            ))}
          </div>
        </div>

        {/* Modal de Visualização */}
        <Dialog open={viewModalOpen} onOpenChange={setViewModalOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Detalhes do Projeto
              </DialogTitle>
            </DialogHeader>
            {selectedProject && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Nome do Projeto</Label>
                    <p className="text-lg font-semibold">{selectedProject.name}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Cliente</Label>
                    <p className="text-lg">{selectedProject.client.name}</p>
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-gray-700">Descrição</Label>
                  <p className="text-gray-600 mt-1">{selectedProject.description}</p>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Budget</Label>
                    <p className="text-lg font-semibold text-green-600">
                      R$ {selectedProject.budget.toLocaleString('pt-BR')}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Progresso</Label>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${selectedProject.progress}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{selectedProject.progress}%</span>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Prioridade</Label>
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${getPriorityColor(selectedProject.priority)}`}>
                      {getPriorityIcon(selectedProject.priority)}
                      {selectedProject.priority}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Data de Início</Label>
                    <p>{new Date(selectedProject.startDate).toLocaleDateString('pt-BR')}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Prazo</Label>
                    <p>{new Date(selectedProject.deadline).toLocaleDateString('pt-BR')}</p>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700">Equipe</Label>
                  <div className="flex gap-2 mt-2">
                    {selectedProject.team.map((member: any, index: number) => (
                      <div key={index} className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
                        <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs">
                          {member.avatar}
                        </div>
                        <span className="text-sm">{member.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700">Tags</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedProject.tags.map((tag: string, index: number) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Seção de Tasks */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Label className="text-sm font-medium text-gray-700">Tasks do Projeto</Label>
                    <Button 
                      size="sm" 
                      onClick={() => {
                        const newTask = {
                          id: `t${Date.now()}`,
                          title: "Nova tarefa",
                          completed: false,
                          assignee: "Usuário Atual"
                        }
                        // TODO: Implementar atualização real de tasks
                        setSelectedProject((prev: any) => ({
                          ...prev,
                          tasks: [...prev.tasks, newTask]
                        }))
                      }}
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      Nova Task
                    </Button>
                  </div>
                  
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {selectedProject.tasks?.map((task: any, index: number) => (
                      <div key={task.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={(e) => {
                            const updatedTasks = selectedProject.tasks.map((t: any) =>
                              t.id === task.id ? { ...t, completed: e.target.checked } : t
                            )
                            // TODO: Implementar atualização de tasks no banco
                            setSelectedProject((prev: any) => ({
                              ...prev,
                              tasks: updatedTasks
                            }))
                          }}
                          className="w-4 h-4 text-blue-600 rounded"
                        />
                        <div className="flex-1">
                          <input
                            type="text"
                            value={task.title}
                            onChange={(e) => {
                              const updatedTasks = selectedProject.tasks.map((t: any) =>
                                t.id === task.id ? { ...t, title: e.target.value } : t
                              )
                              // TODO: Implementar atualização real de tasks
                              setSelectedProject((prev: any) => ({
                                ...prev,
                                tasks: updatedTasks
                              }))
                            }}
                            className={`w-full bg-transparent border-none outline-none text-sm ${
                              task.completed ? 'line-through text-gray-500' : 'text-gray-900'
                            }`}
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            Responsável: {task.assignee}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                          onClick={() => {
                            const updatedTasks = selectedProject.tasks.filter((t: any) => t.id !== task.id)
                            // TODO: Implementar exclusão de tasks no banco
                            setSelectedProject((prev: any) => ({
                              ...prev,
                              tasks: updatedTasks
                            }))
                          }}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-blue-700">Progresso das Tasks:</span>
                      <span className="font-medium text-blue-900">
                        {selectedProject.tasks?.filter((t: any) => t.completed).length || 0} de {selectedProject.tasks?.length || 0} concluídas
                      </span>
                    </div>
                    <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ 
                          width: `${selectedProject.tasks?.length > 0 
                            ? ((selectedProject.tasks.filter((t: any) => t.completed).length / selectedProject.tasks.length) * 100) 
                            : 0}%` 
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setViewModalOpen(false)}>
                Fechar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Modal de Edição */}
        <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Edit className="h-5 w-5" />
                Editar Projeto
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nome do Projeto</Label>
                <Input
                  id="name"
                  value={editForm.name || ''}
                  onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="description">Descrição</Label>
                <textarea
                  id="description"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={editForm.description || ''}
                  onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="budget">Budget (R$)</Label>
                  <Input
                    id="budget"
                    type="number"
                    value={editForm.budget || ''}
                    onChange={(e) => setEditForm({...editForm, budget: parseInt(e.target.value)})}
                  />
                </div>
                <div>
                  <Label htmlFor="progress">Progresso (%)</Label>
                  <Input
                    id="progress"
                    type="number"
                    min="0"
                    max="100"
                    value={editForm.progress || ''}
                    onChange={(e) => setEditForm({...editForm, progress: parseInt(e.target.value)})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="priority">Prioridade</Label>
                  <select
                    id="priority"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={editForm.priority || ''}
                    onChange={(e) => setEditForm({...editForm, priority: e.target.value})}
                  >
                    <option value="low">Baixa</option>
                    <option value="medium">Média</option>
                    <option value="high">Alta</option>
                    <option value="urgent">Urgente</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="deadline">Prazo</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={editForm.deadline || ''}
                    onChange={(e) => setEditForm({...editForm, deadline: e.target.value})}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditModalOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSaveEdit}>
                Salvar Alterações
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Modal de Novo Projeto */}
        <Dialog open={newProjectModalOpen} onOpenChange={setNewProjectModalOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Criar Novo Projeto
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="newName">Nome do Projeto *</Label>
                <Input
                  id="newName"
                  placeholder="Ex: Website Corporativo"
                  value={newProjectForm.name}
                  onChange={(e) => setNewProjectForm({...newProjectForm, name: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="newDescription">Descrição *</Label>
                <textarea
                  id="newDescription"
                  rows={3}
                  placeholder="Descreva o projeto detalhadamente..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newProjectForm.description}
                  onChange={(e) => setNewProjectForm({...newProjectForm, description: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label htmlFor="newClientSelect">Cliente</Label>
                    <Link href="/clientes" className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1">
                      <ExternalLink className="h-3 w-3" />
                      Gerenciar Clientes
                    </Link>
                  </div>
                  {clientsLoading ? (
                    <div className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500">
                      Carregando clientes...
                    </div>
                  ) : clients && clients.length > 0 ? (
                    <select
                      id="newClientSelect"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={newProjectForm.clientName}
                      onChange={(e) => {
                        const selectedClient = clients.find(c => c.name === e.target.value)
                        setNewProjectForm({
                          ...newProjectForm, 
                          clientName: e.target.value,
                          budget: selectedClient?.contractValue?.toString() || newProjectForm.budget
                        })
                      }}
                    >
                      <option value="">Selecionar cliente</option>
                      {clients.map((client) => (
                        <option key={client.id} value={client.name}>
                          {client.name} {client.company && `(${client.company})`}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-yellow-50 text-yellow-800 text-sm">
                      <div className="flex items-center justify-between">
                        <span>Nenhum cliente cadastrado</span>
                        <Link href="/clientes" className="text-blue-600 hover:text-blue-800 underline">
                          Cadastrar
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  <Label htmlFor="newBudget">Budget (R$)</Label>
                  <Input
                    id="newBudget"
                    type="number"
                    placeholder="15000"
                    value={newProjectForm.budget}
                    onChange={(e) => setNewProjectForm({...newProjectForm, budget: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="newPriority">Prioridade</Label>
                  <select
                    id="newPriority"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newProjectForm.priority}
                    onChange={(e) => setNewProjectForm({...newProjectForm, priority: e.target.value})}
                  >
                    <option value="low">Baixa</option>
                    <option value="medium">Média</option>
                    <option value="high">Alta</option>
                    <option value="urgent">Urgente</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="newStatus">Status Inicial</Label>
                  <select
                    id="newStatus"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newProjectForm.status}
                    onChange={(e) => setNewProjectForm({...newProjectForm, status: e.target.value})}
                  >
                    <option value="planning">Planejamento</option>
                    <option value="in_progress">Em Andamento</option>
                    <option value="review">Revisão</option>
                    <option value="completed">Concluído</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="newStartDate">Data de Início</Label>
                  <Input
                    id="newStartDate"
                    type="date"
                    value={newProjectForm.startDate}
                    onChange={(e) => setNewProjectForm({...newProjectForm, startDate: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="newDeadline">Prazo *</Label>
                  <Input
                    id="newDeadline"
                    type="date"
                    value={newProjectForm.deadline}
                    onChange={(e) => setNewProjectForm({...newProjectForm, deadline: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="newTags">Tags (separadas por vírgula)</Label>
                <Input
                  id="newTags"
                  placeholder="Ex: Website, React, Responsivo"
                  value={newProjectForm.tags}
                  onChange={(e) => setNewProjectForm({...newProjectForm, tags: e.target.value})}
                />
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">
                  <strong>Nota:</strong> O projeto será criado com progresso inicial de 0% e você será automaticamente adicionado à equipe.
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setNewProjectModalOpen(false)}>
                Cancelar
              </Button>
              <Button 
                onClick={handleCreateProject}
                disabled={!newProjectForm.name || !newProjectForm.description || !newProjectForm.deadline}
              >
                Criar Projeto
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  )
}
