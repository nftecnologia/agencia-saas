import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { 
  ArrowRight, 
  Brain, 
  BarChart3, 
  Users, 
  DollarSign, 
  Zap, 
  Shield, 
  Star,
  CheckCircle,
  Target,
  TrendingUp,
  Clock,
  Sparkles,
  PlayCircle
} from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold">AgenciaSaaS</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <a href="#funcionalidades" className="text-gray-600 hover:text-gray-900 transition-colors">Funcionalidades</a>
            <a href="#precos" className="text-gray-600 hover:text-gray-900 transition-colors">Preços</a>
            <a href="#depoimentos" className="text-gray-600 hover:text-gray-900 transition-colors">Depoimentos</a>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/auth/signin">
              <Button variant="ghost">Entrar</Button>
            </Link>
            <Link href="/auth/signin">
              <Button variant="gradient" size="sm">
                Começar Agora
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto max-w-4xl">
            <Badge className="mb-4 bg-blue-50 text-blue-700 border-blue-200">
              🚀 O SaaS mais completo para agências digitais
            </Badge>
            
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
              Gerencie sua
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> agência </span>
              com inteligência artificial
            </h1>
            
            <p className="mb-8 text-xl text-gray-600 lg:text-2xl">
              Dashboard completo, IA especializada, gestão financeira e muito mais. 
              Tudo em uma plataforma para agências que querem escalar.
            </p>
            
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href="/auth/signin">
                <Button size="xl" variant="gradient" className="w-full sm:w-auto">
                  <PlayCircle className="mr-2 h-5 w-5" />
                  Começar Teste Grátis
                </Button>
              </Link>
              <Button size="xl" variant="outline" className="w-full sm:w-auto">
                <PlayCircle className="mr-2 h-5 w-5" />
                Ver Demo
              </Button>
            </div>
            
            <p className="mt-4 text-sm text-gray-500">
              ✅ 14 dias grátis • ✅ Sem cartão de crédito • ✅ Suporte premium
            </p>
          </div>
        </div>
        
        {/* Background decorativo */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -right-32 h-80 w-80 rounded-full bg-blue-100 opacity-50 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-32 h-80 w-80 rounded-full bg-purple-100 opacity-50 blur-3xl"></div>
        </div>
      </section>

      {/* Funcionalidades */}
      <section id="funcionalidades" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
              Tudo que sua agência precisa
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Uma plataforma completa que centraliza gestão, automatiza processos e potencializa resultados
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card variant="elevated" hover>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-blue-600 text-white">
                    <Brain className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">Central de IA</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  33+ agentes especializados para criar campanhas, copies, estratégias e muito mais com IA avançada.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Wizard guiado por objetivos
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Agentes para Meta Ads, Instagram, YouTube
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Resultados profissionais instantâneos
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card variant="elevated" hover>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-green-600 text-white">
                    <BarChart3 className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">Dashboard Completo</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Visualize todos os KPIs importantes em tempo real. Relatórios automáticos e insights inteligentes.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Métricas em tempo real
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Relatórios automáticos
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Insights personalizados
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card variant="elevated" hover>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-purple-600 text-white">
                    <Users className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">Gestão de Clientes</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  CRM completo com histórico, projetos, comunicação e acompanhamento de resultados.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    CRM integrado
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Histórico completo
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Comunicação centralizada
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card variant="elevated" hover>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-orange-600 text-white">
                    <DollarSign className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">Financeiro</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Controle total das finanças com faturamento, despesas, fluxo de caixa e relatórios fiscais.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Faturamento automático
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Controle de despesas
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Fluxo de caixa em tempo real
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card variant="elevated" hover>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-red-600 text-white">
                    <Target className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">Kanban de Projetos</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Organize todos os projetos com sistema Kanban visual, prazos e acompanhamento de progresso.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Kanban visual
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Controle de prazos
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Progresso em tempo real
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card variant="elevated" hover>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-indigo-600 text-white">
                    <Zap className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">Automações</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Automatize processos repetitivos, relatórios, follow-ups e comunicações com clientes.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Relatórios automáticos
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Follow-ups programados
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Workflows customizados
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="precos" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
              Planos que crescem com sua agência
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Escolha o plano ideal para o tamanho da sua agência. Upgrade ou downgrade a qualquer momento.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card variant="outlined">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Starter</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">R$ 97</span>
                  <span className="text-gray-600">/mês</span>
                </div>
                <p className="text-gray-600 mt-2">Perfeito para começar</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    Até 5 clientes
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    10 agentes de IA
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    Dashboard básico
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    Gestão financeira
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    Suporte por email
                  </li>
                </ul>
                <Button className="w-full mt-6" variant="outline">
                  Começar Agora
                </Button>
              </CardContent>
            </Card>

            <Card variant="elevated" className="border-2 border-blue-500 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-blue-500 text-white">Mais Popular</Badge>
              </div>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Professional</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">R$ 197</span>
                  <span className="text-gray-600">/mês</span>
                </div>
                <p className="text-gray-600 mt-2">Para agências em crescimento</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    Até 20 clientes
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    Todos os 33 agentes de IA
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    Dashboard completo
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    Automações avançadas
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    Suporte prioritário
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    Relatórios personalizados
                  </li>
                </ul>
                <Button className="w-full mt-6" variant="gradient">
                  Começar Agora
                </Button>
              </CardContent>
            </Card>

            <Card variant="outlined">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Enterprise</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">R$ 397</span>
                  <span className="text-gray-600">/mês</span>
                </div>
                <p className="text-gray-600 mt-2">Para grandes agências</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    Clientes ilimitados
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    IA + Integrações API
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    Multi-usuários
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    White label
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    Suporte dedicado
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    Treinamento incluído
                  </li>
                </ul>
                <Button className="w-full mt-6" variant="outline">
                  Falar com Vendas
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section id="depoimentos" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
              Agências que já confiam em nós
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Veja o que nossos clientes falam sobre os resultados obtidos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card variant="elevated">
              <CardContent className="pt-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6">
                  "O AgenciaSaaS revolucionou nossa operação. A IA economiza 15 horas por semana na criação de campanhas."
                </p>
                <div className="flex items-center gap-3">
                  <Avatar size="default" fallback="RM" />
                  <div>
                    <div className="font-semibold">Rafael Martins</div>
                    <div className="text-sm text-gray-600">CEO, Digital Growth</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card variant="elevated">
              <CardContent className="pt-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6">
                  "Aumentamos nossa margem em 40% otimizando processos. O dashboard financeiro é perfeito."
                </p>
                <div className="flex items-center gap-3">
                  <Avatar size="default" fallback="AS" />
                  <div>
                    <div className="font-semibold">Ana Silva</div>
                    <div className="text-sm text-gray-600">Fundadora, Marketing Pro</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card variant="elevated">
              <CardContent className="pt-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6">
                  "Escalamos de 5 para 25 clientes mantendo a qualidade. A organização mudou nossa agência."
                </p>
                <div className="flex items-center gap-3">
                  <Avatar size="default" fallback="PC" />
                  <div>
                    <div className="font-semibold">Pedro Costa</div>
                    <div className="text-sm text-gray-600">Sócio, AgênciaX</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="text-3xl font-bold sm:text-4xl mb-4">
              Pronto para revolucionar sua agência?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Junte-se a centenas de agências que já otimizaram seus processos e aumentaram seus resultados
            </p>
            <Link href="/auth/signin">
              <Button size="xl" variant="secondary" className="mr-4">
                <Sparkles className="mr-2 h-5 w-5" />
                Começar Teste Grátis - 14 Dias
              </Button>
            </Link>
            <p className="text-sm opacity-75 mt-4">
              Sem compromisso • Cancele quando quiser • Suporte especializado
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
                  <Brain className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">AgenciaSaaS</span>
              </div>
              <p className="text-gray-400">
                A plataforma mais completa para agências digitais do Brasil.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Produto</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#funcionalidades" className="hover:text-white transition-colors">Funcionalidades</a></li>
                <li><a href="#precos" className="hover:text-white transition-colors">Preços</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrações</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Suporte</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentação</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Empresa</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Sobre</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Carreiras</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacidade</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 AgenciaSaaS. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
