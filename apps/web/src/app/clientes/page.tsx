"use client"

import { useState, useEffect } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar } from "@/components/ui/avatar"
import { Plus, Search, MoreHorizontal, Edit, Trash2, Phone, Mail, Globe } from "lucide-react"
import { useGetClients } from "@/hooks/useQueries/useGetClients"
import { useCreateClient } from "@/hooks/useMutations/useCreateClient"
import { ClientForm } from "@/components/clients/client-form"
import type { Client } from "@agenciasaas/types"

function ClientCard({ client }: { client: Client }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'inactive': return 'bg-gray-100 text-gray-800'
      case 'prospect': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Ativo'
      case 'inactive': return 'Inativo'
      case 'prospect': return 'Prospect'
      default: return status
    }
  }

  return (
    <Card variant="elevated" hover>
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <Avatar 
            size="default" 
            fallback={client.name.substring(0, 2).toUpperCase()}
          />
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-lg font-semibold">{client.name}</CardTitle>
                {client.company && (
                  <p className="text-sm text-gray-600 mt-1">{client.company}</p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Badge 
                  variant={client.status === 'active' ? 'default' : client.status === 'prospect' ? 'secondary' : 'outline'}
                  className="text-xs"
                >
                  {getStatusLabel(client.status)}
                </Badge>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2">
          {client.email && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Mail className="h-4 w-4" />
              <span>{client.email}</span>
            </div>
          )}
          {client.phone && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Phone className="h-4 w-4" />
              <span>{client.phone}</span>
            </div>
          )}
          {client.website && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Globe className="h-4 w-4" />
              <span>{client.website}</span>
            </div>
          )}
        </div>
        
        {client.contractValue && (
          <div className="mt-4 pt-3 border-t">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Valor do Contrato</span>
              <span className="font-semibold text-green-600">
                R$ {client.contractValue.toLocaleString('pt-BR')}
              </span>
            </div>
          </div>
        )}

        <div className="flex gap-2 mt-4">
          <Button variant="outline" size="sm" className="flex-1">
            <Edit className="h-4 w-4 mr-2" />
            Editar
          </Button>
          <Button variant="outline" size="sm">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default function ClientesPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  
  const { data: clients, isLoading } = useGetClients()
  const { mutate: createClient } = useCreateClient()

  const filteredClients = clients?.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || []

  const handleCreateClient = (data: any) => {
    createClient(data, {
      onSuccess: () => {
        setIsCreateModalOpen(false)
      }
    })
  }

  if (isLoading) {
    return (
      <MainLayout>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Clientes</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-64 bg-gray-200 rounded-lg animate-pulse" />
            ))}
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
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Clientes</h1>
            <p className="text-gray-600 mt-1">
              {clients?.length || 0} cliente(s) cadastrado(s)
            </p>
          </div>
          <Button onClick={() => setIsCreateModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Cliente
          </Button>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar clientes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Client Grid */}
        {filteredClients.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClients.map((client) => (
              <ClientCard key={client.id} client={client} />
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <div className="text-gray-500">
              {searchTerm ? (
                <>
                  <p className="text-lg font-medium mb-2">Nenhum cliente encontrado</p>
                  <p>Tente buscar por outro termo ou limpe a pesquisa.</p>
                </>
              ) : (
                <>
                  <p className="text-lg font-medium mb-2">Nenhum cliente cadastrado</p>
                  <p className="mb-4">Comece adicionando seu primeiro cliente.</p>
                  <Button onClick={() => setIsCreateModalOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Cliente
                  </Button>
                </>
              )}
            </div>
          </Card>
        )}

        {/* Create Client Modal */}
        {isCreateModalOpen && (
          <ClientForm
            onSubmit={handleCreateClient}
            onCancel={() => setIsCreateModalOpen(false)}
          />
        )}
      </div>
    </MainLayout>
  )
}
