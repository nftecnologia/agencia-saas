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
  ],
  youtube: [
    {
      id: "youtube-script-generator",
      title: "Gerador de Roteiro",
      howItWorks: "O usuário informa o tema, objetivo do vídeo (educacional, institucional, venda, review, tutorial) e duração desejada.",
      generates: "Roteiro completo, incluindo introdução, tópicos principais, argumentos, perguntas engajadoras, CTAs e encerramento + sugestões de cortes para shorts/reels + títulos alternativos para variações.",
      advantage: "Facilita a produção para quem não tem experiência em roteiro, acelerando o processo criativo.",
      icon: Video,
      color: "bg-red-600",
      category: "YouTube",
      features: ["Roteiro completo", "Cortes para shorts", "Estrutura narrativa", "CTAs estratégicos"]
    },
    {
      id: "youtube-seo-optimizer",
      title: "Título, Descrição e Tags",
      howItWorks: "O usuário fornece o roteiro ou tema do vídeo.",
      generates: "Títulos otimizados para SEO e engajamento, com sugestões de curiosidade e palavras-chave relevantes + descrições completas (com sumário, CTA, links, hashtags e timestamp) + lista de tags sugeridas para aumentar alcance orgânico.",
      advantage: "Aumenta as chances de ranqueamento, engajamento e facilita uploads em massa.",
      icon: Search,
      color: "bg-red-700",
      category: "YouTube",
      features: ["Títulos clicáveis", "Descrições completas", "Tags relevantes", "SEO otimizado"]
    },
    {
      id: "youtube-content-planning",
      title: "Planejamento de Conteúdo",
      howItWorks: "O usuário informa frequência desejada de postagens, público-alvo e principais temas.",
      generates: "Calendário editorial com temas, formatos (longos, shorts, lives), datas sugeridas e briefings resumidos para cada vídeo.",
      advantage: "Traz organização e visão de longo prazo para o canal, facilitando o crescimento e a consistência.",
      icon: Calendar,
      color: "bg-red-500",
      category: "YouTube",
      features: ["Calendário editorial", "Mix de formatos", "Briefings prontos", "Planejamento estratégico"]
    },
    {
      id: "youtube-old-video-optimizer",
      title: "Otimização de Vídeos Antigos",
      howItWorks: "O usuário envia os títulos/descrições antigos.",
      generates: "Sugestões de novos títulos, descrições e tags otimizadas para vídeos antigos + recomendações de atualização de thumb e links internos para aumentar views e tempo de exibição.",
      advantage: "Recupera vídeos antigos com baixo desempenho, potencializando resultados já existentes.",
      icon: RefreshCw,
      color: "bg-red-800",
      category: "YouTube",
      features: ["Revitalização", "Novos títulos", "Tags otimizadas", "Links internos"]
    }
  ],
  blog: [
    {
      id: "blog-ideas-generator",
      title: "Gerador de Ideias",
      howItWorks: "O usuário informa o nicho, público-alvo, palavras-chave ou objetivos do blog (atrair tráfego, gerar leads, educar).",
      generates: "Lista de ideias de artigos relevantes e alinhados com tendências do segmento + títulos sugestivos e já otimizados para SEO + sugestão de abordagem (lista, tutorial, análise, opinião).",
      advantage: "Nunca falta conteúdo relevante e estratégico para o blog.",
      icon: Sparkles,
      color: "bg-green-600",
      category: "Blog/SEO",
      features: ["Ideias estratégicas", "Títulos SEO", "Abordagens variadas", "Trends atuais"]
    },
    {
      id: "blog-structure-creator",
      title: "Estruturador de Post",
      howItWorks: "O usuário seleciona uma ideia ou título de artigo e o público-alvo.",
      generates: "Estrutura detalhada com tópicos (H1, H2, H3), introdução, tópicos intermediários e sugestão de conclusão + sugestão de CTA e links internos/externos para enriquecer o conteúdo.",
      advantage: "Facilita para o redator seguir um roteiro claro e otimizado para SEO.",
      icon: FileText,
      color: "bg-green-700",
      category: "Blog/SEO",
      features: ["Estrutura H1-H3", "CTAs estratégicos", "Links internos", "Conclusões eficazes"]
    },
    {
      id: "blog-paragraph-generator",
      title: "Gerador de Parágrafos",
      howItWorks: "O usuário insere o tema ou a seção do artigo que precisa de desenvolvimento.",
      generates: "Blocos de texto prontos e bem escritos, com linguagem adequada ao público + sugestões de exemplos, dados e argumentos para fortalecer o conteúdo.",
      advantage: "Agiliza a redação, mantém consistência e evita bloqueio criativo.",
      icon: PenTool,
      color: "bg-green-500",
      category: "Blog/SEO",
      features: ["Textos prontos", "Exemplos práticos", "Argumentos sólidos", "Linguagem adequada"]
    },
    {
      id: "blog-seo-optimizer",
      title: "Otimização SEO",
      howItWorks: "O usuário informa a palavra-chave principal e o texto base (rascunho ou artigo completo).",
      generates: "Sugestões de melhorias de SEO: uso de palavra-chave, meta description, títulos alternativos, intertítulos, perguntas frequentes (FAQ) + identificação de oportunidades para palavras-chave secundárias.",
      advantage: "Eleva a qualidade técnica do artigo e aumenta as chances de ranqueamento.",
      icon: TrendingUp,
      color: "bg-green-800",
      category: "Blog/SEO",
      features: ["Otimização completa", "Keywords secundárias", "Meta descriptions", "FAQs estratégicas"]
    },
    {
      id: "blog-meta-generator",
      title: "Meta Descriptions e Slugs",
      howItWorks: "O usuário envia o texto do artigo e o título.",
      generates: "Meta description persuasiva, entre 140 e 160 caracteres, focada em SEO e CTR + sugestões de slug otimizadas e amigáveis para o artigo.",
      advantage: "Facilita o processo de publicação, garantindo qualidade técnica.",
      icon: Code,
      color: "bg-green-400",
      category: "Blog/SEO",
      features: ["Meta descriptions", "Slugs otimizados", "CTR melhorado", "SEO técnico"]
    },
    {
      id: "blog-content-updater",
      title: "Atualização de Conteúdo",
      howItWorks: "O usuário informa o artigo antigo ou parte do texto.",
      generates: "Sugestões de atualização textual (novos dados, tendências recentes, reformulação de parágrafos desatualizados) + recomendações para enriquecer o artigo e mantê-lo relevante.",
      advantage: "Mantém o blog sempre atualizado, melhorando SEO e autoridade.",
      icon: RefreshCw,
      color: "bg-green-900",
      category: "Blog/SEO",
      features: ["Atualizações estratégicas", "Dados recentes", "Relevância mantida", "SEO melhorado"]
    },
    {
      id: "blog-faq-generator",
      title: "Gerador de FAQs",
      howItWorks: "O usuário indica o tema do artigo ou serviço.",
      generates: "Perguntas frequentes e respostas para enriquecer o artigo + listas de dicas, benefícios, erros comuns ou passos para determinado objetivo.",
      advantage: "Deixa o conteúdo mais completo, didático e atrativo para buscadores.",
      icon: MessageSquare,
      color: "bg-green-300",
      category: "Blog/SEO",
      features: ["FAQs estratégicas", "Listas práticas", "Conteúdo completo", "SEO melhorado"]
    }
  ],
  whatsapp: [
    {
      id: "whatsapp-broadcast-generator",
      title: "Mensagens de Lista/Broadcast",
      howItWorks: "O usuário informa objetivo da campanha (promoção, lançamento, reengajamento, pós-venda, convite para evento), público-alvo e tom da mensagem.",
      generates: "Mensagens curtas, personalizadas e claras, ideais para listas de transmissão + variações para o mesmo objetivo, evitando repetição e spam + sugestão de CTA e fechamento.",
      advantage: "Torna campanhas de WhatsApp mais profissionais, engajadoras e evita bloqueios.",
      icon: Globe,
      color: "bg-emerald-600",
      category: "WhatsApp",
      features: ["Mensagens profissionais", "Evita spam", "Variações criativas", "CTAs eficazes"]
    },
    {
      id: "whatsapp-audio-scripts",
      title: "Roteiros de Áudio",
      howItWorks: "O usuário informa objetivo do áudio (venda, pós-venda, suporte, instrução, convite), detalhes do produto/serviço e tom desejado.",
      generates: "Roteiros prontos para serem gravados: introdução, apresentação do benefício, instrução clara, chamada para ação e encerramento simpático + sugestão de frases para soar natural e envolvente.",
      advantage: "Ajuda vendedores e suporte a se comunicarem melhor, sem improvisos, mantendo padrão de qualidade.",
      icon: Mic,
      color: "bg-emerald-700",
      category: "WhatsApp",
      features: ["Roteiros profissionais", "Tom natural", "Estrutura clara", "Qualidade padronizada"]
    },
    {
      id: "whatsapp-quick-replies",
      title: "Respostas Rápidas",
      howItWorks: "O usuário insere perguntas/dúvidas frequentes dos clientes ou situações recorrentes (preço, prazo, envio, suporte).",
      generates: "Respostas curtas, diretas e humanizadas, prontas para copiar e colar + variações para o mesmo tema, permitindo personalização e rapidez.",
      advantage: "Aumenta produtividade e uniformiza o atendimento, mesmo com diferentes operadores.",
      icon: Zap,
      color: "bg-emerald-500",
      category: "WhatsApp",
      features: ["Respostas rápidas", "Padronização", "Variações humanizadas", "Produtividade alta"]
    },
    {
      id: "whatsapp-sales-scripts",
      title: "Scripts de Vendas",
      howItWorks: "O usuário informa o produto/serviço, público e etapa da venda (abordagem inicial, apresentação, objeção, fechamento).",
      generates: "Scripts para cada etapa do funil: abordagem, identificação da dor, apresentação da solução, tratamento de objeções e fechamento + sugestão de perguntas para engajar o cliente.",
      advantage: "Profissionaliza o processo comercial e eleva a taxa de conversão no WhatsApp.",
      icon: DollarSign,
      color: "bg-emerald-800",
      category: "WhatsApp",
      features: ["Scripts completos", "Funil estruturado", "Tratamento de objeções", "Taxa de conversão alta"]
    },
    {
      id: "whatsapp-follow-up",
      title: "Follow-up e Reengajamento",
      howItWorks: "O usuário seleciona objetivo (retomar contato, lembrete de orçamento, agradecer, aniversário, pós-venda).",
      generates: "Mensagens prontas para retomar conversas ou reforçar relacionamentos + dicas de abordagens personalizadas para diferentes contextos.",
      advantage: "Aumenta o ciclo de vida do cliente e melhora a chance de recompra.",
      icon: RefreshCw,
      color: "bg-emerald-400",
      category: "WhatsApp",
      features: ["Reengajamento", "Contextos variados", "Relacionamento duradouro", "Recompra facilitada"]
    },
    {
      id: "whatsapp-support-scripts",
      title: "Scripts de Atendimento",
      howItWorks: "O usuário define o tipo de atendimento (dúvida técnica, reclamação, orientação de uso, pedido de desculpas).",
      generates: "Mensagens claras e empáticas para cada situação + sugestão de frase de encerramento e pesquisa de satisfação.",
      advantage: "Eleva o padrão de atendimento e reduz tempo de resposta.",
      icon: Phone,
      color: "bg-emerald-900",
      category: "WhatsApp",
      features: ["Atendimento empático", "Situações variadas", "Padrão elevado", "Resposta rápida"]
    }
  ],
  crm: [
    {
      id: "crm-support-scripts",
      title: "Scripts de Atendimento",
      howItWorks: "O usuário informa o canal de atendimento (WhatsApp, chat, e-mail), contexto do contato (primeiro atendimento, dúvidas, suporte técnico, onboarding) e tom desejado.",
      generates: "Scripts prontos para diferentes situações: saudação inicial, coleta de dados, solução de dúvidas, direcionamento para setores, finalização + sugestões de frases para humanizar e padronizar + opções adaptadas para cada canal.",
      advantage: "Agiliza o atendimento, evita improvisos, garante padrão e melhora a experiência do cliente.",
      icon: Phone,
      color: "bg-indigo-600",
      category: "CRM/Atendimento",
      features: ["Scripts multicanal", "Padronização", "Humanização", "Experiência melhorada"]
    },
    {
      id: "crm-complaint-responses",
      title: "Respostas a Reclamações",
      howItWorks: "O usuário informa o tipo de reclamação/feedback (atraso, produto defeituoso, mau atendimento, crítica pública) e tom da resposta (empático, objetivo, conciliador).",
      generates: "Modelos de resposta personalizados para cada situação, incluindo pedido de desculpas, explicação, solução proposta e convite para conversa privada + sugestões de frases para amenizar conflitos + opções para resposta pública e privada.",
      advantage: "Minimiza danos à reputação, acelera resposta, reduz atrito e humaniza a comunicação.",
      icon: Shield,
      color: "bg-indigo-700",
      category: "CRM/Atendimento",
      features: ["Gestão de crises", "Respostas personalizadas", "Redução de atrito", "Proteção da reputação"]
    },
    {
      id: "crm-post-sale-followup",
      title: "Follow-up Pós-venda",
      howItWorks: "O usuário seleciona o momento do contato (após compra, após suporte, 7 dias depois, reativação, aniversário) e pode informar detalhes do produto/serviço.",
      generates: "Mensagens prontas para acompanhamento (experiência, dúvidas, parabéns) + sugestões de mensagens para pedir feedback, indicar novos produtos ou convidar para promoções + variações para e-mail, WhatsApp ou SMS.",
      advantage: "Fortalece o relacionamento, aumenta as chances de recompra e melhora a percepção da marca.",
      icon: Users,
      color: "bg-indigo-500",
      category: "CRM/Atendimento",
      features: ["Relacionamento duradouro", "Múltiplos momentos", "Multicanal", "Recompra facilitada"]
    },
    {
      id: "crm-satisfaction-survey",
      title: "Pesquisa de Satisfação",
      howItWorks: "O usuário informa o contexto (após venda, após suporte, avaliação de serviço) e o canal desejado (e-mail, WhatsApp, formulário).",
      generates: "Perguntas de NPS e CSAT, com textos de introdução e agradecimento + sugestões de perguntas abertas para coleta de sugestões + templates de mensagens para convidar o cliente a responder.",
      advantage: "Facilita a coleta de feedback, padroniza pesquisas e aumenta a taxa de resposta com textos envolventes.",
      icon: BarChart3,
      color: "bg-indigo-800",
      category: "CRM/Atendimento",
      features: ["NPS e CSAT", "Templates prontos", "Taxa de resposta alta", "Feedback estruturado"]
    }
  ],
  creative: [
    {
      id: "complete-post-generator",
      title: "Gerador de Posts Completos",
      howItWorks: "O usuário informa o tema, objetivo, público-alvo e plataforma desejada.",
      generates: "Concept visual detalhado + copy persuasiva + legenda envolvente + hashtags estratégicas + sugestões para Stories + variações para diferentes formatos.",
      advantage: "Economiza tempo criativo e garante consistência visual e textual em todas as peças.",
      icon: Image,
      color: "bg-purple-600",
      category: "Feed & Stories",
      features: ["Concept completo", "Copy + visual", "Hashtags estratégicas", "Múltiplos formatos"]
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
          <div className="flex flex-wrap gap-1
