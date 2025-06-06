"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Settings, 
  Building2, 
  Users, 
  Bell, 
  CreditCard, 
  Shield, 
  Palette,
  Save,
  Plus,
  Trash2,
  Edit3
} from "lucide-react"

const configSections = [
  {
    id: "agency",
    title: "Informações da Agência",
    description: "Dados gerais da sua agência",
    icon: Building2,
    color: "bg-blue-500"
  },
  {
    id: "team",
    title: "Equipe",
    description: "Gerenciar usuários e permissões",
    icon: Users,
    color: "bg-green-500"
  },
  {
    id: "notifications",
    title: "Notificações",
    description: "Preferências de comunicação",
    icon: Bell,
    color: "bg-yellow-500"
  },
  {
    id: "billing",
    title: "Faturamento",
    description: "Planos e pagamentos",
    icon: CreditCard,
    color: "bg-purple-500"
  },
  {
    id: "security",
    title: "Segurança",
    description: "Configurações de acesso",
    icon: Shield,
    color: "bg-red-500"
  },
  {
    id: "appearance",
    title: "Aparência",
    description: "Personalização da interface",
    icon: Palette,
    color: "bg-indigo-500"
  }
]

function AgencySettings() {
  const [agencyData, setAgencyData] = useState({
    name: "AgênciaOS",
    email: "contato@agenciaos.com",
    phone: "(11) 99999-9999",
    website: "https://agenciaos.com",
    address: "São Paulo, SP",
    cnpj: "12.345.678/0001-90"
  })

  const handleSave = () => {
    alert("Informações da agência salvas com sucesso!")
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="name">Nome da Agência</Label>
          <Input
            id="name"
            value={agencyData.name}
            onChange={(e) => setAgencyData({...agencyData, name: e.target.value})}
          />
        </div>
        <div>
          <Label htmlFor="email">E-mail Principal</Label>
          <Input
            id="email"
            type="email"
            value={agencyData.email}
            onChange={(e) => setAgencyData({...agencyData, email: e.target.value})}
          />
        </div>
        <div>
          <Label htmlFor="phone">Telefone</Label>
          <Input
            id="phone"
            value={agencyData.phone}
            onChange={(e) => setAgencyData({...agencyData, phone: e.target.value})}
          />
        </div>
        <div>
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            value={agencyData.website}
            onChange={(e) => setAgencyData({...agencyData, website: e.target.value})}
          />
        </div>
        <div>
          <Label htmlFor="address">Endereço</Label>
          <Input
            id="address"
            value={agencyData.address}
            onChange={(e) => setAgencyData({...agencyData, address: e.target.value})}
          />
        </div>
        <div>
          <Label htmlFor="cnpj">CNPJ</Label>
          <Input
            id="cnpj"
            value={agencyData.cnpj}
            onChange={(e) => setAgencyData({...agencyData, cnpj: e.target.value})}
          />
        </div>
      </div>
      <Button onClick={handleSave}>
        <Save className="h-4 w-4 mr-2" />
        Salvar Alterações
      </Button>
    </div>
  )
}

function TeamSettings() {
  const [users] = useState([
    {
      id: "1",
      name: "Admin User",
      email: "admin@agencia.com",
      role: "Administrador",
      status: "Ativo"
    },
    {
      id: "2", 
      name: "João Silva",
      email: "joao@agencia.com",
      role: "Designer",
      status: "Ativo"
    },
    {
      id: "3",
      name: "Maria Santos",
      email: "maria@agencia.com", 
      role: "Desenvolvedor",
      status: "Pendente"
    }
  ])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Membros da Equipe</h3>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Convidar Usuário
        </Button>
      </div>
      
      <div className="space-y-4">
        {users.map((user) => (
          <Card key={user.id}>
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium">
                    {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                  <div className="flex gap-2 mt-1">
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {user.role}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      user.status === 'Ativo' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {user.status}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Edit3 className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="text-red-600">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function NotificationSettings() {
  const [notifications, setNotifications] = useState({
    emailNewClient: true,
    emailProjectUpdate: true,
    emailPayment: true,
    pushNotifications: false,
    weeklyReport: true,
    marketingEmails: false
  })

  const handleToggle = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">Novo cliente cadastrado</h4>
            <p className="text-sm text-gray-500">Receber e-mail quando um novo cliente for adicionado</p>
          </div>
          <Button
            variant={notifications.emailNewClient ? "default" : "outline"}
            size="sm"
            onClick={() => handleToggle('emailNewClient')}
          >
            {notifications.emailNewClient ? "Ativo" : "Inativo"}
          </Button>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">Atualizações de projeto</h4>
            <p className="text-sm text-gray-500">Notificações sobre mudanças de status</p>
          </div>
          <Button
            variant={notifications.emailProjectUpdate ? "default" : "outline"}
            size="sm"
            onClick={() => handleToggle('emailProjectUpdate')}
          >
            {notifications.emailProjectUpdate ? "Ativo" : "Inativo"}
          </Button>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">Pagamentos recebidos</h4>
            <p className="text-sm text-gray-500">Confirmações de pagamento</p>
          </div>
          <Button
            variant={notifications.emailPayment ? "default" : "outline"}
            size="sm"
            onClick={() => handleToggle('emailPayment')}
          >
            {notifications.emailPayment ? "Ativo" : "Inativo"}
          </Button>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">Notificações push</h4>
            <p className="text-sm text-gray-500">Alertas em tempo real no navegador</p>
          </div>
          <Button
            variant={notifications.pushNotifications ? "default" : "outline"}
            size="sm"
            onClick={() => handleToggle('pushNotifications')}
          >
            {notifications.pushNotifications ? "Ativo" : "Inativo"}
          </Button>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">Relatório semanal</h4>
            <p className="text-sm text-gray-500">Resumo das atividades da semana</p>
          </div>
          <Button
            variant={notifications.weeklyReport ? "default" : "outline"}
            size="sm"
            onClick={() => handleToggle('weeklyReport')}
          >
            {notifications.weeklyReport ? "Ativo" : "Inativo"}
          </Button>
        </div>
      </div>
    </div>
  )
}

function BillingSettings() {
  return (
    <div className="space-y-6">
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-semibold text-blue-900">Plano Professional</h3>
              <p className="text-blue-700">Ideal para agências em crescimento</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-blue-900">R$ 99</p>
              <p className="text-sm text-blue-700">/mês</p>
            </div>
          </div>
          
          <div className="space-y-2 mb-4">
            <p className="text-sm text-blue-800">✓ Até 50 clientes</p>
            <p className="text-sm text-blue-800">✓ Projetos ilimitados</p>
            <p className="text-sm text-blue-800">✓ Central IA completa</p>
            <p className="text-sm text-blue-800">✓ Relatórios avançados</p>
            <p className="text-sm text-blue-800">✓ Suporte prioritário</p>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1">
              Alterar Plano
            </Button>
            <Button className="flex-1">
              Gerenciar Assinatura
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Pagamentos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b">
              <div>
                <p className="font-medium">Jan 2024</p>
                <p className="text-sm text-gray-500">Plano Professional</p>
              </div>
              <div className="text-right">
                <p className="font-medium">R$ 99,00</p>
                <p className="text-sm text-green-600">Pago</p>
              </div>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <div>
                <p className="font-medium">Dez 2023</p>
                <p className="text-sm text-gray-500">Plano Professional</p>
              </div>
              <div className="text-right">
                <p className="font-medium">R$ 99,00</p>
                <p className="text-sm text-green-600">Pago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function SecuritySettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Alterar Senha</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Senha Atual</Label>
            <Input type="password" />
          </div>
          <div>
            <Label>Nova Senha</Label>
            <Input type="password" />
          </div>
          <div>
            <Label>Confirmar Nova Senha</Label>
            <Input type="password" />
          </div>
          <Button>Atualizar Senha</Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Autenticação de Dois Fatores</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">2FA não configurado</p>
              <p className="text-sm text-gray-500">Adicione uma camada extra de segurança</p>
            </div>
            <Button>Configurar</Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Sessões Ativas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">Chrome no Windows</p>
              <p className="text-sm text-gray-500">Atual • São Paulo, SP</p>
            </div>
            <p className="text-sm text-green-600">Ativa</p>
          </div>
          <Button variant="outline" className="w-full">
            Encerrar Todas as Outras Sessões
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

function AppearanceSettings() {
  const [theme, setTheme] = useState("light")
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Tema</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div 
              className={`p-4 border rounded-lg cursor-pointer ${theme === 'light' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
              onClick={() => setTheme('light')}
            >
              <div className="w-full h-16 bg-white border rounded mb-2"></div>
              <p className="text-sm font-medium">Claro</p>
            </div>
            <div 
              className={`p-4 border rounded-lg cursor-pointer ${theme === 'dark' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
              onClick={() => setTheme('dark')}
            >
              <div className="w-full h-16 bg-gray-800 border rounded mb-2"></div>
              <p className="text-sm font-medium">Escuro</p>
            </div>
            <div 
              className={`p-4 border rounded-lg cursor-pointer ${theme === 'auto' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
              onClick={() => setTheme('auto')}
            >
              <div className="w-full h-16 bg-gradient-to-r from-white to-gray-800 border rounded mb-2"></div>
              <p className="text-sm font-medium">Automático</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Personalização</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Cor Principal</Label>
            <div className="flex gap-2 mt-2">
              {['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'].map(color => (
                <div 
                  key={color}
                  className="w-8 h-8 rounded-full cursor-pointer border-2 border-gray-200"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
          <div>
            <Label>Densidade da Interface</Label>
            <select className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md">
              <option>Compacta</option>
              <option>Normal</option>
              <option>Confortável</option>
            </select>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function ConfiguracoesPage() {
  const [activeSection, setActiveSection] = useState("agency")
  
  const renderContent = () => {
    switch (activeSection) {
      case "agency": return <AgencySettings />
      case "team": return <TeamSettings />
      case "notifications": return <NotificationSettings />
      case "billing": return <BillingSettings />
      case "security": return <SecuritySettings />
      case "appearance": return <AppearanceSettings />
      default: return <AgencySettings />
    }
  }
  
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Settings className="h-7 w-7 text-gray-600" />
            Configurações
          </h1>
          <p className="text-gray-600 mt-1">
            Gerencie as configurações da sua agência
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <Card className="lg:col-span-1">
            <CardContent className="p-4">
              <nav className="space-y-2">
                {configSections.map((section) => {
                  const IconComponent = section.icon
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeSection === section.id
                          ? "bg-blue-50 text-blue-600 border border-blue-200"
                          : "hover:bg-gray-50 text-gray-700"
                      }`}
                    >
                      <div className={`p-1 rounded ${section.color} text-white`}>
                        <IconComponent className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{section.title}</p>
                        <p className="text-xs text-gray-500">{section.description}</p>
                      </div>
                    </button>
                  )
                })}
              </nav>
            </CardContent>
          </Card>

          {/* Content */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>
                {configSections.find(s => s.id === activeSection)?.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {renderContent()}
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}
