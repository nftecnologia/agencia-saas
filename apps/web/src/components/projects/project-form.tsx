"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { projectSchema } from "@agenciasaas/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X } from "lucide-react"
import { useGetClients } from "@/hooks/useQueries/useGetClients"
import type { CreateProjectData } from "@agenciasaas/types"

interface ProjectFormProps {
  onSubmit: (data: CreateProjectData) => void
  onCancel: () => void
  initialData?: Partial<CreateProjectData>
}

export function ProjectForm({ onSubmit, onCancel, initialData }: ProjectFormProps) {
  const { data: clients } = useGetClients()
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateProjectData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      clientId: initialData?.clientId || "",
      status: initialData?.status || "planning",
      budget: initialData?.budget || 0,
      priority: initialData?.priority || "medium",
      currency: initialData?.currency || "BRL",
      startDate: initialData?.startDate || undefined,
      deadline: initialData?.deadline || undefined,
      assignedUsers: initialData?.assignedUsers || [],
    }
  })

  const handleFormSubmit = (data: CreateProjectData) => {
    // Converter strings de data para Date objects se necessário
    const processedData = {
      ...data,
      startDate: data.startDate ? new Date(data.startDate) : undefined,
      deadline: data.deadline ? new Date(data.deadline) : undefined,
    }
    onSubmit(processedData)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>
            {initialData ? "Editar Projeto" : "Novo Projeto"}
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={onCancel}
            className="h-6 w-6"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            {/* Nome */}
            <div>
              <Label htmlFor="name">Nome do Projeto *</Label>
              <Input
                id="name"
                {...register("name")}
                placeholder="Ex: Redesign do site corporativo"
              />
              {errors.name && (
                <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Descrição */}
            <div>
              <Label htmlFor="description">Descrição</Label>
              <textarea
                id="description"
                {...register("description")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px]"
                placeholder="Descreva o projeto..."
              />
              {errors.description && (
                <p className="text-sm text-red-500 mt-1">{errors.description.message}</p>
              )}
            </div>

            {/* Cliente */}
            <div>
              <Label htmlFor="clientId">Cliente *</Label>
              <select
                id="clientId"
                {...register("clientId")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Selecione um cliente</option>
                {clients?.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.name}
                  </option>
                ))}
              </select>
              {errors.clientId && (
                <p className="text-sm text-red-500 mt-1">{errors.clientId.message}</p>
              )}
            </div>

            {/* Status e Orçamento */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="status">Status *</Label>
                <select
                  id="status"
                  {...register("status")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="planning">Planejamento</option>
                  <option value="in_progress">Em Andamento</option>
                  <option value="review">Revisão</option>
                  <option value="completed">Concluído</option>
                  <option value="cancelled">Cancelado</option>
                </select>
                {errors.status && (
                  <p className="text-sm text-red-500 mt-1">{errors.status.message}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="budget">Orçamento (R$)</Label>
                <Input
                  id="budget"
                  type="number"
                  {...register("budget", { valueAsNumber: true })}
                  placeholder="0"
                  min="0"
                  step="0.01"
                />
                {errors.budget && (
                  <p className="text-sm text-red-500 mt-1">{errors.budget.message}</p>
                )}
              </div>
            </div>

            {/* Datas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate">Data de Início</Label>
                <Input
                  id="startDate"
                  type="date"
                  {...register("startDate", {
                    setValueAs: (value) => value === "" ? undefined : value
                  })}
                />
                {errors.startDate && (
                  <p className="text-sm text-red-500 mt-1">{errors.startDate.message}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="deadline">Data de Término</Label>
                <Input
                  id="deadline"
                  type="date"
                  {...register("deadline", {
                    setValueAs: (value) => value === "" ? undefined : value
                  })}
                />
                {errors.deadline && (
                  <p className="text-sm text-red-500 mt-1">{errors.deadline.message}</p>
                )}
              </div>
            </div>


            {/* Botões */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1"
              >
                {isSubmitting ? "Salvando..." : initialData ? "Atualizar" : "Criar Projeto"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
