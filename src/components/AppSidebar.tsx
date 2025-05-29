import { Home, MessageSquare, Search, BarChart3, FileCheck, Mail } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader, SidebarTrigger } from "@/components/ui/sidebar";
const menuItems = [{
  title: "Today Dashboard",
  url: "/",
  icon: Home
}, {
  title: "Processing Queue",
  url: "/processing",
  icon: MessageSquare
}, {
  title: "Knowledge Search",
  url: "/search",
  icon: Search
}, {
  title: "Analytics",
  url: "/analytics",
  icon: BarChart3
}, {
  title: "Trace & Trace",
  url: "/trace",
  icon: FileCheck
}];
export function AppSidebar() {
  const location = useLocation();
  return <Sidebar>
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center gap-2">
          <Mail className="h-6 w-6 text-blue-600" />
          <span className="font-semibold text-lg">Centrade AI</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map(item => <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={location.pathname === item.url}>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>;
}