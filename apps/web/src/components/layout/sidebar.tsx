"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  LayoutDashboard,
  Users,
  FolderOpen,
  DollarSign,
  Brain,
  Kanban,
  Settings,
  LogOut,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Clientes",
    href: "/clientes",
    icon: Users,
  },
  {
    title: "Projetos",
    href: "/projetos",
    icon: FolderOpen,
  },
  {
    title: "Kanban",
    href: "/kanban",
    icon: Kanban,
  },
  {
    title: "Financeiro",
    href: "/financeiro",
    icon: DollarSign,
  },
  {
    title: "IA Central",
    href: "/ia",
    icon: Brain,
  },
  {
    title: "Configurações",
    href: "/configuracoes",
    icon: Settings,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const handleLogout = async () => {
    await signOut({
      callbackUrl: "/auth/signin",
      redirect: true
    });
  };

  return (
    <aside className="w-64 bg-white h-screen fixed left-0 top-0 border-r border-gray-200">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">AgênciaOS</h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`
                      flex items-center gap-3 px-3 py-2 rounded-lg transition-colors
                      ${
                        isActive
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-700 hover:bg-gray-100"
                      }
                    `}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-gray-300" />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">
                {session?.user?.name || "Usuário"}
              </p>
              <p className="text-xs text-gray-500">
                {session?.user?.email || "admin@agencia.com"}
              </p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2 mt-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sair</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
