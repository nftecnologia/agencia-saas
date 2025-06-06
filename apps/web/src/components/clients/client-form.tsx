"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { clientSchema } from "@agenciasaas/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X } from "lucide-react"
import type { CreateClientData } from "@agenciasaas/types"

interface ClientFormProps {
  onSubmit: (data: CreateClientData) => void
  onCancel: () => void
  initialData?: Partial<CreateClientData>
}

export function ClientForm({ onSubmit, onCancel, initialData }: ClientFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch
  } = useForm<CreateClientData>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      name: initialData?.name || "",
      email: initialData?.email || "",
      phone: initialData?.phone || "",
      company: initialData?.company || "",
      industry: initialData?.industry || "",
      website: initialData?.website || "",
      contactPerson: initialData?.contactPerson || "",
      status: initialData?.status || "prospect",
      contractType: initialData?.contractType || "project",
      contractValue: initialData?.contractValue || 0,
      notes: initialData?.notes || "",
    }
  })

  const status = watch("status")
  const contractType = watch("contractType")

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>
            {initialData ? "Editar Cliente" : "Novo Cliente"}
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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Nome e Empresa */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nome *</Label>
                <Input
                  id="name"
                  {...register("name")}
                  placeholder="Nome do cliente"
                />
                {errors.name && (
                  <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="company">Empresa</Label>
                <Input
                  id="company"
                  {...register("company")}
                  placeholder="Nome da empresa"
                />
                {errors.company && (
                  <p className="text-sm text-red-500 mt-1">{errors.company.message}</p>
                )}
              </div>
            </div>

            {/* Email e Telefone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="email@exemplo.com"
                />
                {errors.email && (
                  <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  {...register("phone")}
                  placeholder="(11) 99999-9999"
                />
                {errors.phone && (
                  <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>
                )}
              </div>
            </div>

            {/* Website e Pessoa de Contato */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  {...register("website")}
                  placeholder="https://exemplo.com"
                />
                {errors.website && (
                  <p className="text-sm text-red-500 mt-1">{errors.website.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="contactPerson">Pessoa de Contato</Label>
                <Input
                  id="contactPerson"
                  {...register("contactPerson")}
                  placeholder="Nome do responsável"
                />
                {errors.contactPerson && (
                  <p className="text-sm text-red-500 mt-1">{errors.contactPerson.message}</p>
                )}
              </div>
            </div>

            {/* Setor */}
            <div>
              <Label htmlFor="industry">Setor</Label>
              <Input
                id="industry"
                {...register("industry")}
                placeholder="Ex: Tecnologia, Saúde, Educação..."
              />
              {errors.industry && (
                <p className="text-sm text-red-500 mt-1">{errors.industry.message}</p>
              )}
            </div>

            {/* Status e Tipo de Contrato */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="status">Status *</Label>
                <select
                  id="status"
                  {...register("status")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="prospect">Prospect</option>
                  <option value="active">Ativo</option>
                  <option value="inactive">Inativo</option>
                </select>
                {errors.status && (
                  <p className="text-sm text-red-500 mt-1">{errors.status.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="contractType">Tipo de Contrato *</Label>
                <select
                  id="contractType"
                  {...register("contractType")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="project">Projeto</option>
                  <option value="monthly">Mensal</option>
                  <option value="hourly">Por Hora</option>
                </select>
                {errors.contractType && (
                  <p className="text-sm text-red-500 mt-1">{errors.contractType.message}</p>
                )}
              </div>
            </div>

            {/* Valor do Contrato */}
            <div>
              <Label htmlFor="contractValue">Valor do Contrato (R$)</Label>
              <Input
                id="contractValue"
                type="number"
                {...register("contractValue", { valueAsNumber: true })}
                placeholder="0"
                min="0"
                step="0.01"
              />
              {errors.contractValue && (
                <p className="text-sm text-red-500 mt-1">{errors.contractValue.message}</p>
              )}
            </div>

            {/* Observações */}
            <div>
              <Label htmlFor="notes">Observações</Label>
              <textarea
                id="notes"
                {...register("notes")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px]"
                placeholder="Observações sobre o cliente..."
              />
              {errors.notes && (
                <p className="text-sm text-red-500 mt-1">{errors.notes.message}</p>
              )}
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
                {isSubmitting ? "Salvando..." : initialData ? "Atualizar" : "Criar Cliente"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
