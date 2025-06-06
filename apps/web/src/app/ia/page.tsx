"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { 
  Brain, 
  Target,
  TrendingUp,
  Users,
  DollarSign,
  Eye,
  MessageSquare,
  Share2,
  ArrowRight,
  CheckCircle,
  Play,
  Zap,
  RefreshCw,
  Sparkles,
  Clock,
  Award
} from "lucide-react"

interface Objective {
  id: string
  title: string
  description: string
  icon: any
  color: string
  agents: Agent[]
  estimatedTime: string
  difficulty: string
}

interface Agent {
  id: string
  title: string
  description: string
  estimated_time: string
  priority: "high" | "medium" | "low"
  result_type: string
}

const objectives: Objective[] = [
  {
    id: "increase-sales",
    title: "Aumentar Vendas",
    description: "Estratégia completa para gerar mais conversões e receita",
    icon: DollarSign,
    color: "bg-green-600",
    estimatedTime: "2-3 horas",
    difficulty: "Intermediário",
    agents: [
      {
        id: "persona-generator",
        title: "Criar Persona do Cliente Ideal",
        description: "Defina quem é seu cliente perfeito para direcionar melhor suas estratégias",
        estimated_time: "15 min",
        priority: "high",
        result_type: "Documento de Persona"
      },
      {
        id: "sales-funnel",
        title: "Estruturar Funil de Vendas",
        description: "Crie um funil otimizado para converter visitantes em clientes",
        estimated_time: "30 min",
        priority: "high", 
        result_type: "Estratégia de Funil"
      },
      {
        id: "sales-copy",
        title: "Copy de Vendas Persuasiva",
        description: "Textos que convencem e geram ação imediata",
        estimated_time: "25 min",
        priority: "high",
        result_type: "Textos de Venda"
      },
      {
        id: "retargeting-strategy",
        title: "Estratégia de Remarketing",
        description: "Recupere visitantes que não compraram na primeira visita",
        estimated_time: "20 min",
        priority: "medium",
        result_type: "Campanhas de Retargeting"
      },
      {
        id: "conversion-optimization",
        title: "Otimização de Conversão",
        description: "Melhore sua taxa de conversão com testes e ajustes",
        estimated_time: "30 min",
        priority: "medium",
        result_type: "Plano de Otimização"
      }
    ]
  },
  {
    id: "boost-engagement",
    title: "Aumentar Engajamento",
    description: "Construa uma audiência engajada e fiel à sua marca",
    icon: MessageSquare,
    color: "bg-blue-600",
    estimatedTime: "1-2 horas",
    difficulty: "Fácil",
    agents: [
      {
        id: "content-strategy",
        title: "Estratégia de Conteúdo",
        description: "Planeje conteúdos que geram interação e compartilhamentos",
        estimated_time: "20 min",
        priority: "high",
        result_type: "Calendário Editorial"
      },
      {
        id: "engagement-posts",
        title: "Posts de Engajamento",
        description: "Conteúdos específicos para gerar comentários e interações",
        estimated_time: "15 min",
        priority: "high",
        result_type: "Pack de Posts"
      },
      {
        id: "stories-strategy",
        title: "Estratégia para Stories",
        description: "Use stories para conectar diariamente com sua audiência",
        estimated_time: "15 min",
        priority: "medium",
        result_type: "Roteiro de Stories"
      },
      {
        id: "community-building",
        title: "Construção de Comunidade",
        description: "Crie uma comunidade engajada em torno da sua marca",
        estimated_time: "25 min",
        priority: "medium",
        result_type: "Estratégia de Comunidade"
      }
    ]
  },
  {
    id: "generate-leads",
    title: "Gerar Leads Qualificados",
    description: "Atraia e capture leads prontos para comprar",
    icon: Target,
    color: "bg-purple-600",
    estimatedTime: "2-3 horas",
    difficulty: "Intermediário",
    agents: [
      {
        id: "lead-magnet",
        title: "Criar Isca Digital",
        description: "Desenvolva uma oferta irresistível para capturar contatos",
        estimated_time: "25 min",
        priority: "high",
        result_type: "Lead Magnet"
      },
      {
        id: "landing-page",
        title: "Landing Page de Conversão",
        description: "Página otimizada para capturar o máximo de leads",
        estimated_time: "30 min",
        priority: "high",
        result_type: "Copy da Landing Page"
      },
      {
        id: "lead-nurturing",
        title: "Sequência de Nutrição",
        description: "E-mails para educar e qualificar seus leads",
        estimated_time: "35 min",
        priority: "high",
        result_type: "E-mail Sequence"
      },
      {
        id: "paid-campaigns",
        title: "Campanhas Pagas para Leads",
        description: "Anúncios otimizados para geração de leads",
        estimated_time: "25 min",
        priority: "medium",
        result_type: "Estratégia de Ads"
      }
    ]
  },
  {
    id: "brand-awareness",
    title: "Aumentar Reconhecimento da Marca",
    description: "Torne sua marca conhecida e lembrada pelo público",
    icon: Eye,
    color: "bg-orange-600", 
    estimatedTime: "1-2 horas",
    difficulty: "Fácil",
    agents: [
      {
        id: "brand-positioning",
        title: "Posicionamento de Marca",
        description: "Defina como sua marca será percebida no mercado",
        estimated_time: "20 min",
        priority: "high",
        result_type: "Estratégia de Posicionamento"
      },
      {
        id: "viral-content",
        title: "Conteúdo Viral",
        description: "Crie conteúdos com potencial de viralização",
        estimated_time: "18 min",
        priority: "high",
        result_type: "Ideias Virais"
      },
      {
        id: "influencer-strategy",
        title: "Estratégia com Influenciadores",
        description: "Amplie seu alcance através de parcerias estratégicas",
        estimated_time: "22 min",
        priority: "medium",
        result_type: "Plano de Influenciadores"
      },
      {
        id: "brand-storytelling",
        title: "Storytelling da Marca",
        description: "Conte a história da sua marca de forma envolvente",
        estimated_time: "25 min",
        priority: "medium",
        result_type: "Narrativa da Marca"
      }
    ]
  },
  {
    id: "customer-retention",
    title: "Reter e Fidelizar Clientes",
    description: "Mantenha seus clientes comprando e recomendando",
    icon: Users,
    color: "bg-indigo-600",
    estimatedTime: "1.5-2 horas", 
    difficulty: "Avançado",
    agents: [
      {
        id: "loyalty-program",
        title: "Programa de Fidelidade",
        description: "Sistema para recompensar e reter seus melhores clientes",
        estimated_time: "30 min",
        priority: "high",
        result_type: "Estratégia de Fidelização"
      },
      {
        id: "post-purchase",
        title: "Experiência Pós-Compra",
        description: "Maximize a satisfação após a venda",
        estimated_time: "20 min",
        priority: "high",
        result_type: "Jornada Pós-Venda"
      },
      {
        id: "referral-system",
        title: "Sistema de Indicação",
        description: "Transforme clientes em promotores da marca",
        estimated_time: "25 min",
        priority: "medium",
        result_type: "Programa de Indicação"
      },
      {
        id: "win-back",
        title: "Reativação de Clientes",
        description: "Reconquiste clientes inativos",
        estimated_time: "20 min",
        priority: "medium",
        result_type: "Campanha de Reativação"
      }
    ]
  },
  {
    id: "scale-growth",
    title: "Escalar Crescimento",
    description: "Estratégias para crescimento acelerado e sustentável",
    icon: TrendingUp,
    color: "bg-red-600",
    estimatedTime: "3-4 horas",
    difficulty: "Avançado",
    agents: [
      {
        id: "growth-audit",
        title: "Auditoria de Crescimento",
        description: "Identifique gargalos e oportunidades de crescimento",
        estimated_time: "40 min",
        priority: "high",
        result_type: "Relatório de Auditoria"
      },
      {
        id: "automation-setup",
        title: "Automação de Marketing",
        description: "Configure sistemas para crescer no piloto automático",
        estimated_time: "45 min",
        priority: "high",
        result_type: "Estratégia de Automação"
      },
      {
        id: "scalable-systems",
        title: "Sistemas Escaláveis",
        description: "Procesos que crescem junto com seu negócio",
        estimated_time: "35 min",
        priority: "high",
        result_type: "Framework de Sistemas"
      },
      {
        id: "data-analytics",
        title: "Analytics Avançado",
        description: "Configure métricas para decisões baseadas em dados",
        estimated_time: "30 min",
        priority: "medium",
        result_type: "Dashboard de Métricas"
      }
    ]
  }
]

function ObjectiveCard({ objective, onClick }: { objective: Objective; onClick: () => void }) {
  const IconComponent = objective.icon
  
  return (
    <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer group hover:scale-105 border-2 hover:border-blue-200" onClick={onClick}>
      <CardHeader className="pb-4">
        <div className="flex items-center gap-4">
          <div className={`p-4 rounded-2xl ${objective.color} text-white group-hover:scale-110 transition-transform shadow-lg`}>
            <IconComponent className="h-8 w-8" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
              {objective.title}
            </CardTitle>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              {objective.description}
            </p>
            <div className="flex gap-3 text-xs">
              <div className="flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                <Clock className="h-3 w-3" />
                {objective.estimatedTime}
              </div>
              <div className="flex items-center gap-1 bg-purple-50 text-purple-700 px-2 py-1 rounded-full">
                <Award className="h-3 w-3" />
                {objective.difficulty}
              </div>
              <div className="flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded-full">
                <Zap className="h-3 w-3" />
                {objective.agents.length} agentes
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Button className="w-full group-hover:bg-blue-600 transition-colors font-semibold" size="lg">
          <Play className="h-5 w-5 mr-2" />
          Iniciar Jornada
          <ArrowRight className="h-5 w-5 ml-2" />
        </Button>
      </CardContent>
    </Card>
  )
}

function WizardFlow({ objective, onBack }: { objective: Objective; onBack: () => void }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [results, setResults] = useState<Record<number, string>>({})
  const [prompt, setPrompt] = useState("")

  const currentAgent = objective.agents[currentStep]
  const IconComponent = objective.icon

  const handleGenerate = async () => {
    if (!prompt.trim()) return
    
    setIsGenerating(true)
    
    setTimeout(() => {
      const mockResult = `🎯 ${currentAgent.title.toUpperCase()}

📝 ENTRADA: ${prompt}

✨ RESULTADO GERADO:

${currentAgent.description}

💡 ESTRATÉGIA PERSONALIZADA:
• Análise específica para: ${prompt}
• Recomendação baseada em IA avançada
• Implementação otimizada para seu objetivo

🚀 PRÓXIMOS PASSOS:
1. Revisar e personalizar o resultado
2. Implementar as recomendações
3. Monitorar métricas de performance
4. Otimizar baseado nos resultados

📊 IMPACTO ESPERADO:
• Melhoria de 30-50% na métrica principal
• Redução de 20% no tempo de execução
• Aumento de 40% na eficiência geral

⭐ ${currentAgent.result_type} criado com sucesso!`
      
      setResults(prev => ({ ...prev, [currentStep]: mockResult }))
      setCompletedSteps(prev => [...prev, currentStep])
      setIsGenerating(false)
    }, 3000)
  }

  const nextStep = () => {
    if (currentStep < objective.agents.length - 1) {
      setCurrentStep(currentStep + 1)
      setPrompt("")
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const progress = ((completedSteps.length) / objective.agents.length) * 100

  return (
    <div className="space-y-8">
      {/* Header com progresso */}
      <Card className="border-2 border-blue-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={onBack}>
                ← Voltar
              </Button>
              <div className={`p-3 rounded-xl ${objective.color} text-white`}>
                <IconComponent className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  {objective.title}
                </CardTitle>
                <p className="text-gray-600">
                  Passo {currentStep + 1} de {objective.agents.length}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">{Math.round(progress)}%</div>
              <div className="text-sm text-gray-500">Concluído</div>
            </div>
          </div>
          
          {/* Barra de progresso */}
          <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
            <div 
              className="bg-blue-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </CardHeader>
      </Card>

      {/* Conteúdo principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Painel esquerdo - Steps */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Sequência de Agentes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {objective.agents.map((agent, index) => (
              <div 
                key={index}
                className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                  index === currentStep 
                    ? 'border-blue-500 bg-blue-50' 
                    : completedSteps.includes(index)
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setCurrentStep(index)}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${
                    completedSteps.includes(index) 
                      ? 'bg-green-500 text-white' 
                      : index === currentStep
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {completedSteps.includes(index) ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <span className="text-sm font-bold">{index + 1}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-sm">{agent.title}</div>
                    <div className="text-xs text-gray-500">{agent.estimated_time}</div>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs ${
                    agent.priority === 'high' 
                      ? 'bg-red-100 text-red-700'
                      : agent.priority === 'medium'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {agent.priority === 'high' ? 'Essencial' : agent.priority === 'medium' ? 'Importante' : 'Opcional'}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Painel central - Agente atual */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-blue-600 text-white">
                <Brain className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold">
                  {currentAgent.title}
                </CardTitle>
                <p className="text-gray-600">{currentAgent.description}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {!completedSteps.includes(currentStep) ? (
              <div className="space-y-4">
                <Label htmlFor="prompt" className="text-sm font-semibold text-gray-700">
                  Descreva seu contexto específico:
                </Label>
                <textarea
                  id="prompt"
                  placeholder="Ex: Sou uma agência de marketing digital focada em e-commerce..."
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
                      Gerando {currentAgent.result_type}...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5 mr-2" />
                      Gerar {currentAgent.result_type}
                    </>
                  )}
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-green-600 mb-4">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-semibold">{currentAgent.result_type} Concluído!</span>
                </div>
                <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-6 rounded-xl border border-gray-200 max-h-[400px] overflow-y-auto">
                  <pre className="whitespace-pre-wrap font-sans text-sm text-gray-800 leading-relaxed">
                    {results[currentStep]}
                  </pre>
                </div>
                <div className="flex gap-3">
                  {currentStep > 0 && (
                    <Button variant="outline" onClick={prevStep}>
                      ← Anterior
                    </Button>
                  )}
                  {currentStep < objective.agents.length - 1 ? (
                    <Button onClick={nextStep} className="flex-1">
                      Próximo Agente →
                    </Button>
                  ) : (
                    <Button className="flex-1 bg-green-600 hover:bg-green-700">
                      🎉 Finalizar Jornada
                    </Button>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function IAPage() {
  const [selectedObjective, setSelectedObjective] = useState<Objective | null>(null)

  if (selectedObjective) {
    return (
      <MainLayout>
        <WizardFlow 
          objective={selectedObjective} 
          onBack={() => setSelectedObjective(null)} 
        />
      </MainLayout>
    )
  }

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
              <h1 className="text-3xl font-bold text-gray-900">Central de IA Estratégica</h1>
              <p className="text-gray-600 text-lg">
                Escolha seu objetivo e siga o caminho otimizado para o sucesso
              </p>
            </div>
          </div>
          <div className="flex justify-center gap-4 text-sm">
            <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-2 rounded-lg">
              <Target className="h-4 w-4" />
              <span>Orientado a Resultados</span>
            </div>
            <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-2 rounded-lg">
              <Zap className="h-4 w-4" />
              <span>Sequência Otimizada</span>
            </div>
            <div className="flex items-center gap-2 bg-purple-50 text-purple-700 px-3 py-2 rounded-lg">
              <Award className="h-4 w-4" />
              <span>Estratégias Comprovadas</span>
            </div>
          </div>
        </div>

        {/* Objetivos */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Qual é seu objetivo principal?
            </h2>
            <p className="text-gray-600">
              Escolha sua meta e nossa IA criará uma jornada personalizada para alcançá-la
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {objectives.map((objective) => (
              <ObjectiveCard 
                key={objective.id} 
                objective={objective} 
                onClick={() => setSelectedObjective(objective)}
              />
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
