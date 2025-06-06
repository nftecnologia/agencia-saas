"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCreateExpense } from "@/hooks/useMutations/useFinancialMutations"

export function ExpenseForm() {
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    category: "",
    dueDate: "",
    status: "pending"
  })

  const { mutate: createExpense, isPending } = useCreateExpense()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    createExpense({
      ...formData,
      amount: parseFloat(formData.amount)
    })
    
    // Reset form
    setFormData({
      description: "",
      amount: "",
      category: "",
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
          placeholder="Descrição da despesa"
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
        <Label htmlFor="category">Categoria</Label>
        <select
          id="category"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          required
        >
          <option value="">Selecione uma categoria</option>
          <option value="marketing">Marketing</option>
          <option value="operacional">Operacional</option>
          <option value="pessoal">Pessoal</option>
          <option value="infraestrutura">Infraestrutura</option>
          <option value="outros">Outros</option>
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
        {isPending ? "Criando..." : "Criar Despesa"}
      </Button>
    </form>
  )
}
