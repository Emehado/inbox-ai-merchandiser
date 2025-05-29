import { Home, MessageSquare, Search, BarChart3, FileCheck, Mail, Moon, Sun, User, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader, SidebarFooter, SidebarSeparator } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from "@/contexts/ThemeContext";
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
  const {
    theme,
    toggleTheme
  } = useTheme();
  return <Sidebar className="border-r border-border">
      <SidebarHeader className="border-b border-border p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg">
            <Mail className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg text-foreground">Centrade AI</span>
            <span className="text-xs text-muted-foreground">Smart Supply Chains</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Main Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map(item => <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={location.pathname === item.url} className="group w-full justify-start px-3 py-2.5 rounded-lg transition-all duration-200 hover:bg-accent data-[active=true]:bg-primary data-[active=true]:text-primary-foreground data-[active=true]:shadow-sm">
                    <Link to={item.url} className="flex items-center gap-3">
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="my-4" />

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Tools
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="px-3 py-2.5 rounded-lg">
                  <Link to="/exceptions" className="flex items-center gap-3">
                    <FileCheck className="h-4 w-4" />
                    <span className="font-medium">All Exceptions</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="px-3 py-2.5 rounded-lg">
                  <Link to="/chaseups" className="flex items-center gap-3">
                    <MessageSquare className="h-4 w-4" />
                    <span className="font-medium">Chase-ups</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border p-4">
        <div className="space-y-3">
          {/* Theme Toggle */}
          <Button variant="ghost" size="sm" onClick={toggleTheme} className="w-full justify-start gap-3 px-3 py-2.5 rounded-lg">
            {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            <span className="font-medium">
              {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
            </span>
          </Button>

          {/* User Profile */}
          <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/50">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
                CT
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                Centrade Team
              </p>
              <p className="text-xs text-muted-foreground truncate">
                admin@centrade.ai
              </p>
            </div>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>;
}