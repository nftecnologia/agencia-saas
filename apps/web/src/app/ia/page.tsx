"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  Sparkles,
  BarChart3,
  Target,
  Users,
  TrendingUp,
  Search,
  Calendar,
  DollarSign,
  Mail,
  Phone,
  Globe,
  Camera,
  Video,
  Mic,
  Code,
  Shield,
  Rocket
} from "lucide-react"

interface AIAgent {
  id: string
  title: string
  howItWorks: string
  generates: string
  advantage: string
  icon: any
  color: string
  category: string
  features: string[]
}

const aiAgents: Record<string, AIAgent[]> = {
  meta: [
    {
      id: "meta-persona-generator",
      title: "Gerador de Persona",
      howItWorks: "O usuário preenche informações básicas sobre o negócio (segmento, ticket médio, tipo de cliente, problemas/desejos do público, região).",
      generates: "Persona detalhada com nome fictício, faixa etária, profissão, rotina, dores, objeções, sonhos, canais favoritos e mini-storytelling + insights comportamentais para copy e criativos.",
      advantage: "Ajuda agências e clientes a terem clareza de quem estão falando, facilitando toda a estratégia.",
      icon: Users,
      color: "bg-blue-600",
      category: "Meta Ads",
      features: ["Persona completa", "Insights comportamentais", "Mini-storytelling", "Direcionamento de copy"]
    },
    {
      id: "meta-copy-generator",
      title: "Gerador de Copy",
      howItWorks: "O usuário informa objetivo, produto, persona e tom desejado (urgência, autoridade, emocional).",
      generates: "Headline (até 40 chars), texto primário (até 125 chars) e descrição (até 30 chars) otimizados + sugestões de CTAs + variações para testes A/B.",
      advantage: "Garante copies profissionais, persuasivos e em conformidade com políticas do Meta, acelerando publicação.",
      icon: PenTool,
      color: "bg-blue-700",
      category: "Meta Ads",
      features: ["Copy completa Meta", "CTAs sugeridos", "Variações A/B", "Conformidade políticas"]
    },
    {
      id: "meta-audience-segmentation",
      title: "Segmentação de Público",
      howItWorks: "O usuário seleciona objetivo da campanha, público-alvo geral, região e detalhes básicos.",
      generates: "Públicos prontos para copiar/colar (interesses, comportamentos, demográficos, lookalike, remarketing) + exclusões para evitar sobreposição + estratégias de ampliar/restringir.",
      advantage: "Reduz tentativa e erro, acelera processo e garante segmentação alinhada ao objetivo da campanha.",
      icon: Target,
      color: "bg-blue-800",
      category: "Meta Ads",
      features: ["Públicos copy/paste", "Exclusões estratégicas", "Lookalike audiences", "Remarketing"]
    },
    {
      id: "meta-ab-testing",
      title: "Testes A/B Automatizados",
      howItWorks: "O usuário informa o que deseja testar (headline, criativo, público, CTA).",
      generates: "Planos automáticos de testes A/B com variações para cada elemento + cronograma de testes + checklist de acompanhamento + modelo de relatório comparativo.",
      advantage: "Profissionaliza processo de testes, facilita experimentações e acelera otimização das campanhas.",
      icon: BarChart3,
      color: "bg-blue-500",
      category: "Meta Ads",
      features: ["Planos de teste", "Cronograma", "Checklist", "Relatórios"]
    }
  ],
  instagram: [
    {
      id: "insta-caption-generator",
      title: "Gerador de Legendas",
      howItWorks: "O usuário informa tema, objetivo do post, público-alvo, tom de voz e pode colar um briefing.",
      generates: "Legendas prontas para feed, stories ou reels, adaptadas ao objetivo (venda, engajamento, educativo, institucional) + variações de CTA + sugestões de perguntas para estimular comentários.",
      advantage: "Garante posts mais engajadores, poupa tempo e padroniza o tom da marca.",
      icon: MessageSquare,
      color: "bg-pink-500",
      category: "Instagram",
      features: ["Legendas personalizadas", "Variações de CTA", "Perguntas engajadoras", "Tom de marca"]
    },
    {
      id: "insta-post-ideas",
      title: "Gerador de Ideias de Post",
      howItWorks: "O usuário informa nicho, público e datas especiais, ou seleciona temas de interesse.",
      generates: "Ideias de posts para feed, stories, reels, carrosséis e enquetes, já com sugestões de estrutura de texto + sugestões de abordagens diferentes para o mesmo tema (lista, dica, polêmica, storytelling).",
      advantage: "Nunca falta ideia nova de conteúdo, mantendo a criatividade em alta.",
      icon: Sparkles,
      color: "bg-pink-600",
      category: "Instagram",
      features: ["Ideias criativas", "Múltiplos formatos", "Abordagens variadas", "Estruturas prontas"]
    },
    {
      id: "insta-carousel-text",
      title: "Carrossel Textual",
      howItWorks: "O usuário passa um tema/assunto central e objetivo do carrossel.",
      generates: "Texto estruturado em sequência de slides: título de cada slide, argumentos, frases de impacto, chamada final para ação/comentário + sugestão de ordem dos slides e tópicos para cada um.",
      advantage: "Facilita a criação de carrosséis envolventes, didáticos e persuasivos só com texto, pronto para adaptar no design.",
      icon: FileText,
      color: "bg-pink-700",
      category: "Instagram",
      features: ["Sequência de slides", "Frases de impacto", "Estrutura didática", "CTA final"]
    },
    {
      id: "insta-editorial-planning",
      title: "Planejamento Editorial",
      howItWorks: "O usuário define frequência de postagens, temas prioritários, datas comemorativas e público.",
      generates: "Calendário com títulos de posts, legenda base sugerida, CTA e hashtag ideal para cada data + dicas rápidas para adaptar conteúdo a diferentes formatos (feed, stories, reels).",
      advantage: "Organização máxima para o calendário do social media e clareza do que postar.",
      icon: Calendar,
      color: "bg-pink-400",
      category: "Instagram",
      features: ["Calendário completo", "Legendas base", "Datas especiais", "Adaptação de formatos"]
    },
    {
      id: "insta-hashtag-generator",
      title: "Gerador de Hashtags",
      howItWorks: "O usuário informa tema do post e público-alvo.",
      generates: "Listas de hashtags segmentadas (populares, médias e de nicho) + dicas de como variar hashtags para evitar shadowban + sugestão de agrupamentos para diferentes tipos de post.",
      advantage: "Amplia alcance e otimiza tempo de pesquisa para o social media.",
      icon: Search,
      color: "bg-pink-800",
      category: "Instagram",
      features: ["Hashtags segmentadas", "Evita shadowban", "Agrupamentos temáticos", "Otimização de alcance"]
    },
    {
      id: "insta-benchmarking",
      title: "Benchmarking de Conteúdo",
      howItWorks: "O usuário informa concorrentes ou referências.",
      generates: "Análise textual dos tipos de conteúdo postado (temas mais usados, formatos, chamadas, abordagem) + sugestões de conteúdos semelhantes ou lacunas para explorar.",
      advantage: "Ajuda a agência a se inspirar e se diferenciar, sem copiar.",
      icon: TrendingUp,
      color: "bg-pink-300",
      category: "Instagram",
      features: ["Análise de concorrentes", "Identificação de lacunas", "Inspiração estratégica", "Diferenciação"]
    },
    {
      id: "insta-reply-generator",
      title: "Gerador de Respostas",
      howItWorks: "O usuário informa possíveis dúvidas do público ou comentários frequentes.",
      generates: "Respostas automáticas e personalizadas para comentários e directs, prontas para copiar/colar + sugestão de frases para reverter objeção, agradecer feedback ou incentivar mais interação.",
      advantage: "Acelera atendimento, garante padrão e humanização das respostas.",
      icon: Mail,
      color: "bg-pink-900",
      category: "Instagram",
      features: ["Respostas prontas", "Gestão de objeções", "Humanização", "Padronização"]
    }
  ]
}

function AgentCard({ agent, onClick }: { agent: AIAgent; onClick: () => void }) {
  const IconComponent = agent.icon
  
  return (
    <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group hover:scale-105" onClick={onClick}>
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <div className={`p-3 rounded-xl ${agent.color} text-white group-hover:scale-110 transition-transform shadow-lg`}>
            <IconComponent className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-1">
              {agent.title}
            </CardTitle>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {agent.category}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="space-y-2">
            <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
              Como funciona:
            </Label>
            <p className="text-gray-600 text-xs leading-relaxed">
              {agent.howItWorks}
            </p>
          </div>
          
          <div className="space-y-2">
            <Label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
              Vantagem:
            </Label>
            <p className="text-gray-600 text-xs leading-relaxed">
              {agent.advantage}
            </p>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            Funcionalidades:
          </Label>
          <div className="flex flex-wrap gap-1">
            {agent.features.slice(0, 2).map((feature: string, index: number) => (
              <span key={index} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                {feature}
              </span>
            ))}
            {agent.features.length > 2 && (
              <span className="text-xs text-gray-400">+{agent.features.length - 2}</span>
            )}
          </div>
        </div>
        
        <Button className="w-full group-hover:bg-blue-600 transition-colors" size="sm">
          <Brain className="h-4 w-4 mr-2" />
          Ativar Agente
        </Button>
      </CardContent>
    </Card>
  )
}

function AgentModal({ agent, isOpen, onClose }: { agent: AIAgent | null; isOpen: boolean; onClose: () => void }) {
  const [prompt, setPrompt] = useState("")
  const [result, setResult] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  
  if (!isOpen || !agent) return null
  
  const handleGenerate = async () => {
    if (!prompt.trim()) return
    
    setIsGenerating(true)
    
    setTimeout(() => {
      const mockResult = `🤖 ${agent.title.toUpperCase()}

📝 ANÁLISE: ${prompt}

✨ RESULTADO GERADO:

**Como funciona:** ${agent.howItWorks}

**O agente gera:** ${agent.generates}

**Vantagem:** ${agent.advantage}

💡 INSIGHTS PRINCIPAIS:
• Análise específica para ${prompt}
• Estratégia recomendada baseada em IA
• Implementação sugerida em fases

🎯 PRÓXIMOS PASSOS:
1. Validar estratégia com equipe
2. Implementar primeiras ações
3. Monitorar resultados
4. Otimizar baseado em dados

📊 RESULTADOS ESPERADOS:
• Melhoria de performance em 30-50%
• Redução de custos em 20-30%
• Aumento de eficiência em 40-60%

🚀 Esta análise foi gerada por IA especializada em ${agent.category.toLowerCase()}.`
      
      setResult(mockResult)
      setIsGenerating(false)
    }, 3000)
  }
  
  const handleCopy = () => {
    navigator.clipboard.writeText(result)
    alert("Conteúdo copiado para a área de transferência!")
  }
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-xl ${agent.color} text-white shadow-lg`}>
                <agent.icon className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-gray-900">
                  {agent.title}
                </CardTitle>
                <p className="text-gray-600 text-sm mt-1">{agent.advantage}</p>
              </div>
            </div>
            <Button variant="ghost" onClick={onClose} size="lg">
              ×
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6 p-6">
          <div className="space-y-3">
            <Label htmlFor="prompt" className="text-sm font-semibold text-gray-700">
              Descreva seu projeto ou necessidade:
            </Label>
            <textarea
              id="prompt"
              placeholder="Ex: Uma agência de arquitetura que quer aumentar leads qualificados"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-[120px] w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={4}
            />
            <Button 
              onClick={handleGenerate} 
              disabled={!prompt.trim() || isGenerating}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                  Processando com IA Avançada...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5 mr-2" />
                  Gerar com {agent.title}
                </>
              )}
            </Button>
          </div>
          
          {result && (
            <div className="space-y-4 border-t pt-6">
              <div className="flex justify-between items-center">
                <Label className="text-lg font-semibold text-gray-800">
                  🎯 Resultado Gerado pelo {agent.title}
                </Label>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleCopy}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copiar
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Baixar PDF
                  </Button>
                </div>
              </div>
              <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-6 rounded-xl border border-gray-200 min-h-[300px] max-h-[500px] overflow-y-auto">
                <pre className="whitespace-pre-wrap font-sans text-sm text-gray-800 leading-relaxed">
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
  const [selectedAgent, setSelectedAgent] = useState<AIAgent | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  
  const allAgents = Object.values(aiAgents).flat()
  const categories = [...new Set(allAgents.map(agent => agent.category))]
  
  const filteredAgents = allAgents.filter(agent => {
    const matchesSearch = agent.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.howItWorks.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !selectedCategory || agent.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center items-center gap-3">
            <div className="p-4 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-lg">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Central de IA Especializada</h1>
              <p className="text-gray-600 text-lg">
                {allAgents.length} Agentes especializados para agências digitais
              </p>
            </div>
          </div>
          <div className="flex justify-center gap-4 text-sm">
            <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-2 rounded-lg">
              <Sparkles className="h-4 w-4" />
              <span>Powered by GPT-4 Turbo</span>
            </div>
            <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-2 rounded-lg">
              <Rocket className="h-4 w-4" />
              <span>7 Categorias Especializadas</span>
            </div>
            <div className="flex items-center gap-2 bg-purple-50 text-purple-700 px-3 py-2 rounded-lg">
              <Target className="h-4 w-4" />
              <span>Resultados Profissionais</span>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center max-w-2xl mx-auto">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar agentes de IA..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white min-w-[180px]"
          >
            <option value="">Todas as categorias</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {/* Agents by Category */}
        <Tabs defaultValue="meta" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 h-auto flex-wrap">
            <TabsTrigger value="meta" className="flex items-center gap-2 min-w-[120px]">
              <Target className="h-4 w-4" />
              Meta Ads
            </TabsTrigger>
            <TabsTrigger value="instagram" className="flex items-center gap-2 min-w-[120px]">
              <Camera className="h-4 w-4" />
              Instagram
            </TabsTrigger>
          </TabsList>
          
          {Object.entries(aiAgents).map(([category, agents]) => (
            <TabsContent key={category} value={category} className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {category === 'meta' ? 'Agentes Meta Ads' : 'Agentes Instagram'}
                </h2>
                <p className="text-gray-600">
                  {category === 'meta' ? 'Especialistas em campanhas pagas no Facebook e Instagram' : 'Criação de conteúdo otimizado para Instagram'}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {agents.filter(agent => 
                  (!searchTerm || 
                   agent.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                   agent.howItWorks.toLowerCase().includes(searchTerm.toLowerCase())) &&
                  (!selectedCategory || agent.category === selectedCategory)
                ).map((agent) => (
                  <AgentCard 
                    key={agent.id} 
                    agent={agent} 
                    onClick={() => setSelectedAgent(agent)}
                  />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* All Agents View */}
        {searchTerm && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 text-center">
              Resultados da Busca: "{searchTerm}"
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAgents.map((agent) => (
                <AgentCard 
                  key={agent.id} 
                  agent={agent} 
                  onClick={() => setSelectedAgent(agent)}
                />
              ))}
            </div>
            
            {filteredAgents.length === 0 && (
              <Card className="p-12 text-center">
                <div className="text-gray-500">
                  <Search className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg font-medium mb-2">Nenhum agente encontrado</p>
                  <p>Tente ajustar os filtros ou buscar por outros termos.</p>
                </div>
              </Card>
            )}
          </div>
        )}

        {/* Agent Modal */}
        <AgentModal
          agent={selectedAgent}
          isOpen={!!selectedAgent}
          onClose={() => setSelectedAgent(null)}
        />
      </div>
    </MainLayout>
  )
}
