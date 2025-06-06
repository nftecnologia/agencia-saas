import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"

interface RevenueChartProps {
  data: Array<{
    month: string
    revenue: number
  }>
}

export function RevenueChart({ data }: RevenueChartProps) {
  const maxRevenue = Math.max(...data.map(d => d.revenue), 1)
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Receita por Mês
        </CardTitle>
      </CardHeader>
      <CardContent>
        {data.length > 0 ? (
          <div className="space-y-4">
            {/* Gráfico simples de barras */}
            <div className="h-64 flex items-end justify-between gap-2">
              {data.map((item, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div 
                    className="w-full bg-blue-500 rounded-t-md min-h-[4px] transition-all duration-300"
                    style={{
                      height: `${(item.revenue / maxRevenue) * 100}%`
                    }}
                  />
                  <div className="text-xs text-center">
                    <div className="font-medium">{item.month}</div>
                    <div className="text-gray-500">
                      R$ {item.revenue.toLocaleString('pt-BR')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Resumo */}
            <div className="pt-4 border-t">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Total do período:</span>
                <span className="font-semibold">
                  R$ {data.reduce((sum, item) => sum + item.revenue, 0).toLocaleString('pt-BR')}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-64 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <TrendingUp className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium mb-2">Nenhum dado de receita</p>
              <p className="text-sm">Adicione receitas para ver o gráfico.</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
