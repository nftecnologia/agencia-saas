"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCreateRevenue } from "@/hooks/useMutations/useFinancialMutations"
import { useGetClients } from "@/hooks/useQueries/useGetClients"

export function RevenueForm() {
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    clientId: "",
    dueDate: "",
    status: "pending"
  })

  const { mutate: createRevenue, isPending } = useCreateRevenue()
  const { data: clients } = useGetClients()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    createRevenue({
      ...formData,
      amount: parseFloat(formData.amount)
    })
    
    // Reset form
    setFormData({
      description: "",
      amount: "",
      clientId: "",
      dueDate: "",
      status: "pending"
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="description">Descrição</Label>
        <Input
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Descrição da receita"
          required
        />
      </div>

      <div>
        <Label htmlFor="amount">Valor</Label>
        <Input
          id="amount"
          type="number"
          step="0.01"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          placeholder="0,00"
          required
        />
      </div>

      <div>
        <Label htmlFor="clientId">Cliente</Label>
        <select
          id="clientId"
          value={formData.clientId}
          onChange={(e) => setFormData({ ...formData, clientId: e.target.value })}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          required
        >
          <option value="">Selecione um cliente</option>
          {clients?.map((client) => (
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <Label htmlFor="dueDate">Data de Vencimento</Label>
        <Input
          id="dueDate"
          type="date"
          value={formData.dueDate}
          onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
          required
        />
      </div>

      <div>
        <Label htmlFor="status">Status</Label>
        <select
          id="status"
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="pending">Pendente</option>
          <option value="paid">Pago</option>
          <option value="overdue">Vencido</option>
        </select>
      </div>

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? "Criando..." : "Criar Receita"}
      </Button>
    </form>
  )
}
