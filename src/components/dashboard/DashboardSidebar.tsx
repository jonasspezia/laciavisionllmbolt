import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  BarChart3,
  ChevronDown,
  ChevronRight,
  ClipboardCheck,
  Home,
  PanelLeft,
  Settings,
  Sparkles,
  Warehouse
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { User } from "@supabase/supabase-js";
import { Database } from "@/integrations/supabase/types";
import { useState } from "react";
import { Button } from "@/components/ui/button";

type UserRole = Database["public"]["Enums"]["user_role"];

interface Link {
  id: string;
  title: string;
  url: string;
}

interface Submenu {
  id: string;
  title: string;
  links: Link[];
}

interface DashboardSidebarProps {
  profile: User | null;
}

export function DashboardSidebar({ profile }: DashboardSidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const sidebarContext = useSidebar();
  const [submenus, setSubmenus] = useState<Submenu[]>([]);
  const [isAdminExpanded, setIsAdminExpanded] = useState(false);
  const [currentEmbedUrl, setCurrentEmbedUrl] = useState<string>("");

  const getMenuItems = () => {
    return [
      {
        title: "Dashboard",
        icon: Home,
        url: "/dashboard",
      },
      {
        title: "Lacia",
        icon: Sparkles,
        url: "/dashboard/videos",
        highlight: true,
      },
      {
        title: "Análises",
        icon: BarChart3,
        url: "/dashboard/analytics",
      },
      {
        title: "Checklists",
        icon: ClipboardCheck,
        url: "/dashboard/checklists",
      },
      {
        title: "Configurações",
        icon: Settings,
        url: "/dashboard/settings",
      },
    ];
  };

  const items = getMenuItems();

  const handleNavigation = (url: string) => {
    console.log("Navigating to:", url);
    navigate(url);
  };

  const handleLinkClick = (url: string) => {
    setCurrentEmbedUrl(url);
    // If we're not already on the administrative page, navigate there
    if (location.pathname !== '/dashboard/administrative') {
      navigate('/dashboard/administrative');
    }
  };

  if (!sidebarContext) {
    console.log("Sidebar context not available");
    return null;
  }

  const { state, toggleSidebar } = sidebarContext;

  return (
    <>
      <Sidebar variant="sidebar" collapsible="offcanvas" className="bg-sidebar border-r border-gray-800">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <div className="flex items-center justify-between p-4">
                <img
                  src="https://i.postimg.cc/CKH9jbSX/logolaciaestaaaa.png"
                  alt="TeleDoc Journey Logo"
                  className="h-8"
                />
                <button
                  onClick={toggleSidebar}
                  className="ml-2 p-2 rounded hover:bg-white/5 transition-colors"
                >
                  <PanelLeft className={`h-4 w-4 transition-transform duration-200 ${state === 'collapsed' ? 'rotate-180' : ''}`} />
                </button>
              </div>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      onClick={() => handleNavigation(item.url)}
                      data-active={location.pathname === item.url}
                      className={`w-full flex items-center gap-2 px-4 py-2 text-sm 
                        ${location.pathname === item.url ? 'bg-white/10 text-white' : ''}
                        ${item.highlight 
                          ? 'text-purple-300 hover:text-purple-200 hover:bg-purple-500/10 font-medium' 
                          : 'text-gray-300 hover:text-white hover:bg-white/10'
                        } rounded-lg transition-colors cursor-pointer`}
                      tooltip={item.title}
                    >
                      <item.icon className={`h-5 w-5 ${item.highlight ? 'text-purple-300' : ''}`} />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}

                {/* Menu Administrativo com submenus */}
                <div className="space-y-1">
                  <SidebarMenuItem>
                    <Button
                      variant="ghost"
                      onClick={() => setIsAdminExpanded(!isAdminExpanded)}
                      className={`w-full flex items-center justify-between px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors`}
                    >
                      <div className="flex items-center gap-2">
                        <Warehouse className="h-5 w-5" />
                        <span>Administrativo</span>
                      </div>
                      {isAdminExpanded ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </Button>
                  </SidebarMenuItem>

                  {isAdminExpanded && (
                    <div className="pl-4 space-y-1">
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          onClick={() => handleNavigation('/dashboard/administrative')}
                          data-active={location.pathname === '/dashboard/administrative'}
                          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                          tooltip="Gerenciar Links"
                        >
                          <span>Gerenciar Links</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      
                      {submenus.map((submenu) => (
                        <div key={submenu.id} className="space-y-1">
                          <span className="px-4 py-1 text-xs font-medium text-gray-500 block">
                            {submenu.title}
                          </span>
                          {submenu.links.map((link) => (
                            <SidebarMenuItem key={link.id}>
                              <SidebarMenuButton
                                onClick={() => handleLinkClick(link.url)}
                                className="w-full flex items-center gap-2 px-4 py-1.5 text-sm text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                                tooltip={link.title}
                              >
                                <ChevronRight className="h-3 w-3" />
                                <span>{link.title}</span>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
      {state === 'collapsed' && (
        <button
          onClick={toggleSidebar}
          className="fixed left-4 top-4 z-50 p-2 rounded-lg bg-sidebar hover:bg-sidebar-accent transition-colors shadow-lg border border-gray-800"
        >
          <PanelLeft className="h-5 w-5 text-gray-300 rotate-180" />
        </button>
      )}
    </>
  );
}
