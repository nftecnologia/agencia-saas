"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Brain, 
  PenTool, 
  FileText, 
  MessageSquare, 
  Image, 
  Zap,
  Copy,
  Download,
  RefreshCw,
  Sparkles
} from "lucide-react"

const aiTools = [
  {
    id: "social-content",
    title: "Conteúdo para Redes Sociais",
    description: "Crie posts, legendas e conteúdo engajador para Instagram, Facebook e LinkedIn",
    icon: MessageSquare,
    color: "bg-blue-500",
    category: "Conteúdo"
  },
  {
    id: "blog-posts",
    title: "Artigos para Blog",
    description: "Gere artigos otimizados para SEO sobre qualquer tópico",
    icon: FileText,
    color: "bg-green-500",
    category: "Conteúdo"
  },
  {
    id: "proposals",
    title: "Propostas Comerciais",
    description: "Crie propostas personalizadas e persuasivas para seus clientes",
    icon: PenTool,
    color: "bg-purple-500",
    category: "Vendas"
  },
  {
    id: "ad-copy",
    title: "Copy para Anúncios",
    description: "Textos otimizados para campanhas de Google Ads e Facebook Ads",
    icon: Zap,
    color: "bg-yellow-500",
    category: "Marketing"
  },
  {
    id: "email-marketing",
    title: "E-mail Marketing",
    description: "Campanhas de e-mail que convertem e engajam sua audiência",
    icon: MessageSquare,
    color: "bg-red-500",
    category: "Marketing"
  },
  {
    id: "brand-names",
    title: "Nomes de Marca",
    description: "Gere nomes criativos e memoráveis para marcas e produtos",
    icon: Sparkles,
    color: "bg-indigo-500",
    category: "Branding"
  }
]

function ToolCard({ tool, onClick }: { tool: any; onClick: () => void }) {
  const IconComponent = tool.icon
  
  return (
    <Card className="hover:shadow-md transition-all duration-200 cursor-pointer group" onClick={onClick}>
      <CardHeader className="pb-4">
        <div className="flex items-start gap-3">
          <div className={`p-2 rounded-lg ${tool.color} text-white group-hover:scale-110 transition-transform`}>
            <IconComponent className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              {tool.title}
            </CardTitle>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full mt-2 inline-block">
              {tool.category}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          {tool.description}
        </p>
        <Button className="w-full" size="sm">
          <Brain className="h-4 w-4 mr-2" />
          Usar Ferramenta
        </Button>
      </CardContent>
    </Card>
  )
}

function GenerationModal({ tool, isOpen, onClose }: { tool: any; isOpen: boolean; onClose: () => void }) {
  const [prompt, setPrompt] = useState("")
  const [result, setResult] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  
  if (!isOpen) return null
  
  const handleGenerate = async () => {
    if (!prompt.trim()) return
    
    setIsGenerating(true)
    
    // Simulação de geração de conteúdo
    setTimeout(() => {
      let mockResult = ""
      
      switch (tool.id) {
        case "social-content":
          mockResult = `🚀 Transforme sua presença digital!

📱 ${prompt}

✨ Nossa equipe especializada está pronta para levar sua marca ao próximo nível nas redes sociais.

💡 Resultados que você pode esperar:
• Mais engajamento
• Crescimento orgânico
• Maior conversão

#MarketingDigital #SucassoOnline #Agencia`
          break
          
        case "blog-posts":
          mockResult = `# ${prompt}

## Introdução

No mundo digital atual, ${prompt.toLowerCase()} se tornou essencial para o sucesso dos negócios. Neste artigo, vamos explorar estratégias práticas e comprovadas.

## Por que isso importa?

Com a crescente competição online, empresas que investem em ${prompt.toLowerCase()} têm 3x mais chances de alcançar seus objetivos.

## Estratégias Eficazes

### 1. Planejamento Estratégico
Comece sempre com um plano bem estruturado...

### 2. Execução Consistente
A consistência é fundamental para...

## Conclusão

Implementar essas estratégias de ${prompt.toLowerCase()} pode transformar seus resultados. Comece hoje mesmo!`
          break
          
        case "proposals":
          mockResult = `PROPOSTA COMERCIAL

Prezado(a) Cliente,

É com grande satisfação que apresentamos nossa proposta para ${prompt}.

OBJETIVO
Desenvolver uma solução personalizada que atenda às suas necessidades específicas e gere resultados mensuráveis.

ESCOPO DO PROJETO
• Análise detalhada do cenário atual
• Desenvolvimento de estratégia customizada
• Implementação das soluções
• Acompanhamento e otimização contínua

INVESTIMENTO
Valor: R$ 5.000,00
Condições: 50% início + 50% entrega

PRÓXIMOS PASSOS
1. Aprovação da proposta
2. Assinatura do contrato
3. Início do projeto

Aguardamos seu retorno!`
          break
          
        default:
          mockResult = `Conteúdo gerado para: ${prompt}

Este é um exemplo de como a IA pode ajudar a criar conteúdo relevante e personalizado para suas necessidades específicas.

Principais benefícios:
• Economia de tempo
• Consistência na qualidade
• Personalização automática
• Otimização para resultados

Continue experimentando com diferentes prompts para obter os melhores resultados!`
      }
      
      setResult(mockResult)
      setIsGenerating(false)
    }, 2000)
  }
  
  const handleCopy = () => {
    navigator.clipboard.writeText(result)
    alert("Conteúdo copiado para a área de transferência!")
  }
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="border-b">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                <tool.icon className="h-5 w-5" />
                {tool.title}
              </CardTitle>
              <p className="text-gray-600 text-sm mt-1">{tool.description}</p>
            </div>
            <Button variant="ghost" onClick={onClose}>
              ×
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6 p-6">
          {/* Input Section */}
          <div className="space-y-3">
            <Label htmlFor="prompt">Descreva o que você precisa:</Label>
            <Input
              id="prompt"
              placeholder={`Ex: ${tool.id === 'social-content' ? 'Post sobre os benefícios do marketing digital' : 
                tool.id === 'blog-posts' ? 'Artigo sobre tendências de marketing 2024' :
                tool.id === 'proposals' ? 'Proposta para desenvolvimento de site institucional' :
                'Descreva seu projeto...'}`}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-[80px]"
            />
            <Button 
              onClick={handleGenerate} 
              disabled={!prompt.trim() || isGenerating}
              className="w-full"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Gerando...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Gerar Conteúdo
                </>
              )}
            </Button>
          </div>
          
          {/* Result Section */}
          {result && (
            <div className="space-y-3 border-t pt-6">
              <div className="flex justify-between items-center">
                <Label>Resultado Gerado:</Label>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleCopy}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copiar
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Baixar
                  </Button>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border min-h-[200px]">
                <pre className="whitespace-pre-wrap font-sans text-sm text-gray-800">
                  {result}
                </pre>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default function IAPage() {
  const [selectedTool, setSelectedTool] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  
  const categories = [...new Set(aiTools.map(tool => tool.category))]
  
  const filteredTools = aiTools.filter(tool => {
    const matchesSearch = tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !selectedCategory || tool.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })
  
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Brain className="h-7 w-7 text-blue-600" />
              Central IA
            </h1>
            <p className="text-gray-600 mt-1">
              Ferramentas de inteligência artificial para agências
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 bg-blue-50 px-3 py-2 rounded-lg">
            <Sparkles className="h-4 w-4 text-blue-600" />
            <span>Powered by GPT-4</span>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative flex-1 max-w-md">
            <Input
              placeholder="Buscar ferramentas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white min-w-[150px]"
          >
            <option value="">Todas as categorias</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <ToolCard 
              key={tool.id} 
              tool={tool} 
              onClick={() => setSelectedTool(tool)}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredTools.length === 0 && (
          <Card className="p-12 text-center">
            <div className="text-gray-500">
              <Brain className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium mb-2">Nenhuma ferramenta encontrada</p>
              <p>Tente ajustar os filtros ou buscar por outros termos.</p>
            </div>
          </Card>
        )}

        {/* Generation Modal */}
        <GenerationModal
          tool={selectedTool}
          isOpen={!!selectedTool}
          onClose={() => setSelectedTool(null)}
        />
      </div>
    </MainLayout>
  )
}
