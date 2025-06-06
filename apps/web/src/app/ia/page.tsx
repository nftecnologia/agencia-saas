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
  Palette,
  Settings,
  Calendar,
  DollarSign,
  Mail,
  Phone,
  Globe,
  Camera,
  Video,
  Mic,
  Code,
  Database,
  Shield,
  Rocket
} from "lucide-react"

const aiAgents = {
  meta: [
    {
      id: "meta-persona-generator",
      title: "Gerador de Persona",
      description: "Cria personas detalhadas para segmentação precisa de campanhas no Meta",
      icon: Users,
      color: "bg-blue-600",
      category: "Meta Ads",
      features: ["Análise demográfica", "Comportamentos", "Interesses", "Lookalike audiences"]
    },
    {
      id: "meta-copy-generator",
      title: "Gerador de Copy",
      description: "Cria copies otimizadas para anúncios no Facebook e Instagram",
      icon: PenTool,
      color: "bg-blue-700",
      category: "Meta Ads",
      features: ["Headlines persuasivas", "Descrições envolventes", "CTAs otimizados", "Copy para carrossel"]
    },
    {
      id: "meta-audience-segmentation",
      title: "Segmentação de Público",
      description: "Define segmentações precisas baseadas em dados e comportamentos",
      icon: Target,
      color: "bg-blue-800",
      category: "Meta Ads",
      features: ["Interesses detalhados", "Comportamentos específicos", "Exclusões estratégicas", "Custom audiences"]
    },
    {
      id: "meta-ab-testing",
      title: "Testes A/B Automatizados",
      description: "Gera variações de anúncios para testes A/B otimizados",
      icon: BarChart3,
      color: "bg-blue-500",
      category: "Meta Ads",
      features: ["Variações de copy", "Testes de imagem", "Otimização de CTA", "Análise de resultados"]
    }
  ],
  instagram: [
    {
      id: "insta-caption-generator",
      title: "Gerador de Legendas",
      description: "Cria legendas envolventes e persuasivas para posts do Instagram",
      icon: MessageSquare,
      color: "bg-pink-500",
      category: "Instagram",
      features: ["Storytelling", "CTAs eficazes", "Tom de voz", "Engajamento"]
    },
    {
      id: "insta-post-ideas",
      title: "Gerador de Ideias de Post",
      description: "Sugere conteúdos criativos e relevantes para o feed",
      icon: Sparkles,
      color: "bg-pink-600",
      category: "Instagram",
      features: ["Trends atuais", "Conteúdo viral", "Seasonal content", "Nichos específicos"]
    },
    {
      id: "insta-carousel-text",
      title: "Carrossel Textual",
      description: "Cria carrosséis informativos com slides de texto otimizados",
      icon: FileText,
      color: "bg-pink-700",
      category: "Instagram",
      features: ["Slides educativos", "Dicas e tutoriais", "Listas práticas", "Templates visuais"]
    },
    {
      id: "insta-editorial-planning",
      title: "Planejamento Editorial",
      description: "Organiza calendário de conteúdo estratégico para Instagram",
      icon: Calendar,
      color: "bg-pink-400",
      category: "Instagram",
      features: ["Calendário mensal", "Temas semanais", "Mix de conteúdo", "Datas especiais"]
    },
    {
      id: "insta-hashtag-generator",
      title: "Gerador de Hashtags",
      description: "Seleciona hashtags estratégicas para máximo alcance e engajamento",
      icon: Search,
      color: "bg-pink-800",
      category: "Instagram",
      features: ["Tags de nicho", "Volume de busca", "Competitividade", "Mix estratégico"]
    },
    {
      id: "insta-benchmarking",
      title: "Benchmarking de Conteúdo",
      description: "Analisa concorrentes e identifica oportunidades de conteúdo",
      icon: TrendingUp,
      color: "bg-pink-300",
      category: "Instagram",
      features: ["Análise de concorrentes", "Tendências do nicho", "Gap de conteúdo", "Oportunidades"]
    },
    {
      id: "insta-reply-generator",
      title: "Gerador de Respostas",
      description: "Cria respostas personalizadas para comentários e DMs",
      icon: Mail,
      color: "bg-pink-900",
      category: "Instagram",
      features: ["Respostas automáticas", "Tom personalizado", "FAQ responses", "Engajamento ativo"]
    }
  ],
  youtube: [
    {
      id: "youtube-script-generator",
      title: "Gerador de Roteiro",
      description: "Cria roteiros completos e envolventes para vídeos do YouTube",
      icon: Video,
      color: "bg-red-600",
      category: "YouTube",
      features: ["Hook inicial", "Estrutura narrativa", "CTAs no vídeo", "Timing otimizado"]
    },
    {
      id: "youtube-seo-optimizer",
      title: "Título, Descrição e Tags",
      description: "Otimiza títulos, descrições e tags para SEO do YouTube",
      icon: Search,
      color: "bg-red-700",
      category: "YouTube",
      features: ["Títulos clicáveis", "Descrições otimizadas", "Tags relevantes", "Thumbnails concepts"]
    },
    {
      id: "youtube-content-planning",
      title: "Planejamento de Conteúdo",
      description: "Estratégias de conteúdo e calendário para canal do YouTube",
      icon: Calendar,
      color: "bg-red-500",
      category: "YouTube",
      features: ["Séries de vídeos", "Trending topics", "Seasonal content", "Consistency plan"]
    },
    {
      id: "youtube-old-video-optimizer",
      title: "Otimização de Vídeos Antigos",
      description: "Revitaliza vídeos antigos com otimizações de SEO e conteúdo",
      icon: RefreshCw,
      color: "bg-red-800",
      category: "YouTube",
      features: ["Análise de performance", "Novos títulos", "Descriptions update", "Cards e end screens"]
    }
  ],
  blog: [
    {
      id: "blog-ideas-generator",
      title: "Gerador de Ideias",
      description: "Sugere tópicos relevantes e tendências para artigos de blog",
      icon: Sparkles,
      color: "bg-green-600",
      category: "Blog/SEO",
      features: ["Keywords research", "Trending topics", "Seasonal content", "Competitor analysis"]
    },
    {
      id: "blog-structure-creator",
      title: "Estruturador de Post",
      description: "Cria estruturas otimizadas para artigos com foco em SEO",
      icon: FileText,
      color: "bg-green-700",
      category: "Blog/SEO",
      features: ["H1, H2, H3 hierarchy", "Meta descriptions", "Internal linking", "Content outline"]
    },
    {
      id: "blog-paragraph-generator",
      title: "Gerador de Parágrafos",
      description: "Escreve parágrafos otimizados e envolventes para artigos",
      icon: PenTool,
      color: "bg-green-500",
      category: "Blog/SEO",
      features: ["SEO writing", "Readability", "Keyword density", "Engaging content"]
    },
    {
      id: "blog-seo-optimizer",
      title: "Otimização SEO",
      description: "Otimiza conteúdo existente para melhor rankeamento nos buscadores",
      icon: TrendingUp,
      color: "bg-green-800",
      category: "Blog/SEO",
      features: ["On-page SEO", "Schema markup", "Internal links", "Meta optimization"]
    },
    {
      id: "blog-meta-generator",
      title: "Meta Descriptions e Slugs",
      description: "Cria meta descriptions e slugs otimizados para SEO",
      icon: Code,
      color: "bg-green-400",
      category: "Blog/SEO",
      features: ["Click-worthy metas", "SEO-friendly slugs", "Character optimization", "SERP preview"]
    },
    {
      id: "blog-content-updater",
      title: "Atualização de Conteúdo",
      description: "Revisa e atualiza artigos antigos para manter relevância",
      icon: RefreshCw,
      color: "bg-green-900",
      category: "Blog/SEO",
      features: ["Content freshness", "New information", "Updated stats", "Improved SEO"]
    },
    {
      id: "blog-faq-generator",
      title: "Gerador de FAQs",
      description: "Cria seções de perguntas frequentes otimizadas para SEO",
      icon: MessageSquare,
      color: "bg-green-300",
      category: "Blog/SEO",
      features: ["People Also Ask", "Schema FAQ", "Featured snippets", "Voice search optimization"]
    }
  ],
  whatsapp: [
    {
      id: "whatsapp-broadcast-generator",
      title: "Mensagens de Lista/Broadcast",
      description: "Cria mensagens estratégicas para listas de transmissão",
      icon: Globe,
      color: "bg-emerald-600",
      category: "WhatsApp",
      features: ["Mensagens de engajamento", "Promocionais", "Informativos", "CTAs diretos"]
    },
    {
      id: "whatsapp-audio-scripts",
      title: "Roteiros de Áudio",
      description: "Desenvolve scripts para áudios persuasivos e profissionais",
      icon: Mic,
      color: "bg-emerald-700",
      category: "WhatsApp",
      features: ["Tom conversacional", "Mensagens claras", "CTAs em áudio", "Timing otimizado"]
    },
    {
      id: "whatsapp-quick-replies",
      title: "Respostas Rápidas",
      description: "Cria banco de respostas prontas para atendimento eficiente",
      icon: Zap,
      color: "bg-emerald-500",
      category: "WhatsApp",
      features: ["FAQ responses", "Objection handling", "Info produtos", "Direcionamentos"]
    },
    {
      id: "whatsapp-sales-scripts",
      title: "Scripts de Vendas",
      description: "Desenvolve sequências de vendas otimizadas para WhatsApp",
      icon: DollarSign,
      color: "bg-emerald-800",
      category: "WhatsApp",
      features: ["Abordagem inicial", "Apresentação de benefícios", "Fechamento", "Objeções"]
    },
    {
      id: "whatsapp-follow-up",
      title: "Follow-up e Reengajamento",
      description: "Cria estratégias de follow-up para reativar leads parados",
      icon: RefreshCw,
      color: "bg-emerald-400",
      category: "WhatsApp",
      features: ["Sequências automáticas", "Reativação", "Nurturing", "Win-back campaigns"]
    },
    {
      id: "whatsapp-support-scripts",
      title: "Scripts de Atendimento",
      description: "Desenvolve protocolos de atendimento profissional",
      icon: Phone,
      color: "bg-emerald-900",
      category: "WhatsApp",
      features: ["Protocolos de atendimento", "Escalonamento", "Resolução de problemas", "Satisfação"]
    }
  ],
  crm: [
    {
      id: "crm-support-scripts",
      title: "Scripts de Atendimento",
      description: "Cria protocolos profissionais para atendimento ao cliente",
      icon: Phone,
      color: "bg-indigo-600",
      category: "CRM/Atendimento",
      features: ["Protocolos padrão", "Escalonamento", "Resolução rápida", "Empatia"]
    },
    {
      id: "crm-complaint-responses",
      title: "Respostas a Reclamações",
      description: "Desenvolve respostas empáticas e solutivas para reclamações",
      icon: Shield,
      color: "bg-indigo-700",
      category: "CRM/Atendimento",
      features: ["Gestão de crises", "Recuperação de cliente", "Soluções práticas", "Compensações"]
    },
    {
      id: "crm-post-sale-followup",
      title: "Follow-up Pós-venda",
      description: "Cria sequências de acompanhamento após a venda",
      icon: Users,
      color: "bg-indigo-500",
      category: "CRM/Atendimento",
      features: ["Onboarding", "Check-ins regulares", "Upsell opportunities", "Retention"]
    },
    {
      id: "crm-satisfaction-survey",
      title: "Pesquisa de Satisfação",
      description: "Desenvolve questionários para medir satisfação do cliente",
      icon: BarChart3,
      color: "bg-indigo-800",
      category: "CRM/Atendimento",
      features: ["NPS surveys", "Feedback collection", "Improvement insights", "Customer journey mapping"]
    }
  ],
  creative: [
    {
      id: "complete-post-generator",
      title: "Gerador de Posts Completos",
      description: "Cria posts completos com imagem, texto, legenda e hashtags",
      icon: Image,
      color: "bg-purple-600",
      category: "Feed & Stories",
      features: ["Concept visual", "Copy persuasiva", "Hashtags estratégicas", "Stories templates"]
    }
  ]
}

function AgentCard({ agent, onClick }: { agent: any; onClick: () => void }) {
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
        <p className="text-gray-600 text-sm leading-relaxed">
          {agent.description}
        </p>
        
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

function AgentModal({ agent, isOpen, onClose }: { agent: any; isOpen: boolean; onClose: () => void }) {
  const [prompt, setPrompt] = useState("")
  const [result, setResult] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedFeature, setSelectedFeature] = useState("")
  
  if (!isOpen) return null
  
  const handleGenerate = async () => {
    if (!prompt.trim()) return
    
    setIsGenerating(true)
    
    // Simulação de geração de conteúdo mais sofisticada
    setTimeout(() => {
      let mockResult = ""
      
      switch (agent.id) {
        case "marketing-strategy":
          mockResult = `📋 ESTRATÉGIA DE MARKETING DIGITAL COMPLETA

🎯 ANÁLISE DO CLIENTE: ${prompt}

📊 SITUAÇÃO ATUAL
• Presença digital: Análise de canais existentes
• Posicionamento: Avaliação da marca no mercado
• Concorrência: Mapeamento de players principais

🎯 PERSONAS IDENTIFICADAS
👤 Persona Primária: Profissionais 25-40 anos
• Comportamento online: Alta atividade em LinkedIn e Instagram
• Dores: Falta de tempo e resultados inconsistentes
• Gatilhos: ROI comprovado e cases de sucesso

🚀 ESTRATÉGIA RECOMENDADA
1. **Rebranding Digital** (Mês 1-2)
   - Atualização de identidade visual
   - Otimização de perfis sociais
   - Criação de linha editorial

2. **Conteúdo Estratégico** (Mês 1-3)
   - 4 posts/semana no Instagram
   - 2 artigos/mês no blog
   - Newsletter quinzenal

3. **Campanhas Pagas** (Mês 2-4)
   - Google Ads: R$ 3.000/mês
   - Facebook/Instagram: R$ 2.000/mês
   - LinkedIn: R$ 1.500/mês

💰 INVESTIMENTO SUGERIDO
• Inicial: R$ 15.000 (setup)
• Mensal: R$ 8.500 (gestão + mídia)
• ROI Projetado: 300% em 6 meses

📈 MÉTRICAS DE SUCESSO
• Leads qualificados: +150%
• Taxa de conversão: +80%
• Engagement: +200%
• Brand awareness: +120%`
          break
          
        case "content-creator":
          mockResult = `🎨 CONTEÚDO MULTIMÍDIA PERSONALIZADO

📱 POSTS PARA REDES SOCIAIS

🔥 POST 1 - INSTAGRAM FEED
"💡 Você sabia que ${prompt}?

✨ 3 dicas que vão transformar seus resultados:

1️⃣ [Dica específica baseada no tema]
2️⃣ [Estratégia comprovada]
3️⃣ [Ação prática imediata]

💬 Qual dessas você vai aplicar primeiro?

#MarketingDigital #ResultadosReais #Transformacao"

📧 E-MAIL MARKETING
Assunto: "Como ${prompt} pode revolucionar seu negócio"

Olá [Nome],

Você já pensou em como ${prompt} poderia ser o diferencial que seu negócio precisa?

Empresas que aplicam essas estratégias têm visto resultados impressionantes:
• 300% mais leads qualificados
• 150% de aumento em vendas
• 85% mais engajamento

🎯 ROTEIRO PARA VÍDEO (60s)
[0-5s] Hook: "Se você quer [resultado específico]..."
[5-15s] Problema: "Mas está enfrentando [dor comum]..."
[15-40s] Solução: "A resposta está em ${prompt}..."
[40-55s] Prova social: "Nossos clientes conseguiram..."
[55-60s] CTA: "Comentem 'QUERO' para saber mais!"

📝 ARTIGO PARA BLOG (Introdução)
# Como ${prompt} Está Revolucionando o Mercado Digital

No cenário competitivo atual, ${prompt} emergiu como uma das estratégias mais eficazes para empresas que buscam crescimento sustentável...

[Artigo completo de 1.500 palavras seria gerado]`
          break
          
        case "data-analyst":
          mockResult = `📊 ANÁLISE AVANÇADA DE DADOS - ${prompt}

🎯 MÉTRICAS PRINCIPAIS
┌─────────────────────────────────────┐
│ KPI                │ Atual │ Meta   │
├─────────────────────────────────────┤
│ CTR                │ 2.4%  │ 3.5%   │
│ CPC                │ R$1.20│ R$0.85 │
│ Taxa Conversão     │ 3.8%  │ 5.2%   │
│ CAC                │ R$45  │ R$35   │
│ LTV                │ R$180 │ R$220  │
│ ROI                │ 320%  │ 450%   │
└─────────────────────────────────────┘

📈 ANÁLISE DE TENDÊNCIAS
• Pico de tráfego: Terças às 14h (+240%)
• Melhor dia: Quinta-feira (+180% conversões)
• Público mais engajado: 25-34 anos (65% do total)
• Dispositivo preferido: Mobile (78%)

🔍 INSIGHTS IDENTIFICADOS
1. **Oportunidade de Horário**
   - Aumentar budget às terças 13-15h
   - Potencial de +40% em conversões

2. **Otimização de Audiência**
   - Focar em público 25-34 anos
   - Expandir para lookalike similar

3. **Melhoria de Funil**
   - Landing page mobile precisa otimização
   - Taxa de abandono: 65% (média: 45%)

⚡ AÇÕES IMEDIATAS RECOMENDADAS
✅ Ajustar lances para horários de pico
✅ Criar versão mobile da landing page
✅ Testar CTA mais direto
✅ Implementar remarketing para carrinho abandonado

💡 PROJEÇÃO COM OTIMIZAÇÕES
• ROI esperado: +35% (de 320% para 432%)
• Redução CAC: -22% (de R$45 para R$35)
• Aumento conversões: +28%

📋 PRÓXIMOS PASSOS
1. Implementar mudanças (Semana 1)
2. Monitorar resultados (Semana 2-3)
3. Ajustar estratégia (Semana 4)
4. Relatório de performance (Final do mês)`
          break
          
        case "sales-assistant":
          mockResult = `💼 PROPOSTA COMERCIAL PERSONALIZADA

🎯 PARA: ${prompt}

📋 RESUMO EXECUTIVO
Desenvolvemos uma solução completa para transformar sua presença digital e gerar resultados mensuráveis através de estratégias comprovadas.

🚀 OBJETIVOS DO PROJETO
• Aumentar leads qualificados em 200%
• Melhorar taxa de conversão em 150%
• Reduzir custo de aquisição em 30%
• Estabelecer autoridade no mercado

📦 ESCOPO DOS SERVIÇOS

🎨 FASE 1: FUNDAÇÃO DIGITAL (Mês 1)
✅ Auditoria completa da presença digital
✅ Rebranding e identidade visual
✅ Setup de ferramentas e analytics
✅ Estratégia de conteúdo personalizada

🚀 FASE 2: EXECUÇÃO (Mês 2-4)
✅ Criação de conteúdo (posts, artigos, vídeos)
✅ Gestão de campanhas pagas
✅ Automação de marketing
✅ Otimização contínua baseada em dados

📊 FASE 3: ESCALA (Mês 5-6)
✅ Expansão para novos canais
✅ Implementação de advanced features
✅ Relatórios executivos mensais
✅ Consultoria estratégica

💰 INVESTIMENTO

🔥 PACOTE PREMIUM - R$ 12.000/mês
• Gestão completa de campanhas
• Criação ilimitada de conteúdo
• Automações avançadas
• Relatórios semanais
• Suporte prioritário 24/7

🎁 BÔNUS EXCLUSIVOS (Valor: R$ 8.000)
• Setup inicial completo GRÁTIS
• Auditoria competitiva detalhada
• Template de landing pages premium
• Treinamento da equipe (4h)

📈 ROI PROJETADO
• Investimento 6 meses: R$ 72.000
• Retorno esperado: R$ 216.000
• ROI: 300% no primeiro ano

🤝 PRÓXIMOS PASSOS
1. ✅ Aprovação da proposta
2. ✅ Assinatura do contrato
3. ✅ Kickoff meeting (48h)
4. ✅ Início da Fase 1

⏰ OFERTA LIMITADA
Esta proposta é válida até [data] e inclui todos os bônus mencionados.

📞 CONTATO
[Dados do consultor]
WhatsApp: [número]
E-mail: [email]

"Estamos prontos para transformar seus resultados digitais!"
`
          break
          
        default:
          mockResult = generateGenericResponse(agent, prompt)
      }
      
      setResult(mockResult)
      setIsGenerating(false)
    }, 3000)
  }
  
  const generateGenericResponse = (agent: any, prompt: string) => {
    return `🤖 ${agent.title.toUpperCase()}

📝 ANÁLISE: ${prompt}

✨ RESULTADO GERADO:

Baseado na sua solicitação, analisei os seguintes aspectos:

${agent.features.map((feature: string, index: number) => 
  `${index + 1}. **${feature}**
   - Análise específica para ${prompt}
   - Recomendações personalizadas
   - Estratégias de implementação`
).join('\n\n')}

💡 INSIGHTS PRINCIPAIS:
• Oportunidade identificada em ${prompt}
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
  }
  
  const handleCopy = () => {
    navigator.clipboard.writeText(result)
    alert("Conteúdo copiado para a área de transferência!")
  }
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-6xl max-h-[90vh] overflow-y-auto">
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
                <p className="text-gray-600 text-sm mt-1">{agent.description}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {agent.features.map((feature: string, index: number) => (
                    <span key={index} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <Button variant="ghost" onClick={onClose} size="lg">
              ×
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6 p-6">
          {/* Feature Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold text-gray-700">Selecione a funcionalidade:</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {agent.features.map((feature: string) => (
                <Button
                  key={feature}
                  variant={selectedFeature === feature ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFeature(feature)}
                  className="text-xs h-8"
                >
                  {feature}
                </Button>
              ))}
            </div>
          </div>

          {/* Input Section */}
          <div className="space-y-3">
            <Label htmlFor="prompt" className="text-sm font-semibold text-gray-700">
              Descreva seu projeto ou necessidade:
            </Label>
            <textarea
              id="prompt"
              placeholder={`Ex: ${getPlaceholderForAgent(agent.id)}`}
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
          
          {/* Result Section */}
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
                  <Button variant="outline" size="sm">
                    <Mail className="h-4 w-4 mr-2" />
                    Enviar por E-mail
                  </Button>
                </div>
              </div>
              <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-6 rounded-xl border border-gray-200 min-h-[300px] max-h-[500px] overflow-y-auto">
                <pre className="whitespace-pre-wrap font-sans text-sm text-gray-800 leading-relaxed">
                  {result}
                </pre>
              </div>
              <div className="flex justify-center gap-2 pt-4">
                <Button variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Regenerar
                </Button>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Personalizar
                </Button>
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  <Download className="h-4 w-4 mr-2" />
                  Salvar no Projeto
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function getPlaceholderForAgent(agentId: string): string {
  const placeholders: Record<string, string> = {
    "marketing-strategy": "Uma agência de arquitetura que quer aumentar leads qualificados",
    "content-creator": "Posts para Instagram sobre marketing digital para pequenas empresas",
    "data-analyst": "Análise de performance das campanhas de Google Ads do último trimestre",
    "sales-assistant": "Proposta para gestão de redes sociais para uma clínica médica",
    "seo-specialist": "Otimização SEO para um e-commerce de roupas femininas",
    "copywriter": "Copy para anúncio no Facebook para curso online de inglês",
    "brand-designer": "Identidade visual para startup de tecnologia sustentável"
  }
  
  return placeholders[agentId] || "Descreva seu projeto ou necessidade específica..."
}

export default function IAPage() {
  const [selectedAgent, setSelectedAgent] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  
  const allAgents = Object.values(aiAgents).flat()
  const categories = [...new Set(allAgents.map(agent => agent.category))]
  
  const filteredAgents = allAgents.filter(agent => {
    const matchesSearch = agent.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.description.toLowerCase().includes(searchTerm.toLowerCase())
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
          <TabsList className="grid w-full grid-cols-7 mb-8 h-auto flex-wrap">
            <TabsTrigger value="meta" className="flex items-center gap-2 min-w-[120px]">
              <Target className="h-4 w-4" />
              Meta Ads
            </TabsTrigger>
            <TabsTrigger value="instagram" className="flex items-center gap-2 min-w-[120px]">
              <Camera className="h-4 w-4" />
              Instagram
            </TabsTrigger>
            <TabsTrigger value="youtube" className="flex items-center gap-2 min-w-[120px]">
              <Video className="h-4 w-4" />
              YouTube
            </TabsTrigger>
            <TabsTrigger value="blog" className="flex items-center gap-2 min-w-[120px]">
              <FileText className="h-4 w-4" />
              Blog/SEO
            </TabsTrigger>
            <TabsTrigger value="whatsapp" className="flex items-center gap-2 min-w-[120px]">
              <Phone className="h-4 w-4" />
              WhatsApp
            </TabsTrigger>
            <TabsTrigger value="crm" className="flex items-center gap-2 min-w-[120px]">
              <Users className="h-4 w-4" />
              CRM
            </TabsTrigger>
            <TabsTrigger value="creative" className="flex items-center gap-2 min-w-[120px]">
              <Palette className="h-4 w-4" />
              Stories
            </TabsTrigger>
          </TabsList>
          
          {Object.entries(aiAgents).map(([category, agents]) => (
            <TabsContent key={category} value={category} className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {category === 'meta' ? 'Agentes Meta Ads' :
                   category === 'instagram' ? 'Agentes Instagram' :
                   category === 'youtube' ? 'Agentes YouTube' :
                   category === 'blog' ? 'Agentes Blog/SEO' :
                   category === 'whatsapp' ? 'Agentes WhatsApp' :
                   category === 'crm' ? 'Agentes CRM/Atendimento' :
                   'Agentes Feed & Stories'}
                </h2>
                <p className="text-gray-600">
                  {category === 'meta' ? 'Especialistas em campanhas pagas no Facebook e Instagram' :
                   category === 'instagram' ? 'Criação de conteúdo otimizado para Instagram' :
                   category === 'youtube' ? 'Estratégias e otimização para YouTube' :
                   category === 'blog' ? 'Conteúdo para blog e otimização SEO' :
                   category === 'whatsapp' ? 'Comunicação e vendas via WhatsApp' :
                   category === 'crm' ? 'Atendimento ao cliente e relacionamento' :
                   'Criação completa de posts para redes sociais'}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {agents.filter(agent => 
                  (!searchTerm || 
                   agent.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                   agent.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
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
