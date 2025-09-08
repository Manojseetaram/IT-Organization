"use client"

import { useState, useMemo, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Shield,
  Users,
  Settings,
  User,
  ChevronUp,
  Plus,
  MoreHorizontal,
  Folder,
  File,
  ChevronRight,
  Search,
  Home,
  BarChart3,
  UserPlus,
  Building,
  LogOut,
  Bell,
  HelpCircle,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Input } from "@/components/ui/input"
import { getUser, removeUser, getSuperAdmins } from "@/lib/auth"

const adminMenuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Super Admins",
    url: "/view-super-admins",
    icon: Shield,
    badge: "0", // Will be updated dynamically
  },
  {
    title: "Organizations",
    url: "#",
    icon: Building,
  },
  {
    title: "Analytics",
    url: "#",
    icon: BarChart3,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]

const quickActions = [
  {
    name: "Create Super Admin",
    url: "/create-super-admin",
    icon: UserPlus,
  },
  {
    name: "User Management",
    url: "#",
    icon: Users,
  },
  {
    name: "System Settings",
    url: "#",
    icon: Settings,
  },
]

const adminTools = [
  {
    name: "Audit Logs",
    url: "#",
    icon: File,
  },
  {
    name: "Backup Manager",
    url: "#",
    icon: Folder,
  },
  {
    name: "Security Reports",
    url: "#",
    icon: Shield,
  },
]

export function AppSidebar() {
  const [searchQuery, setSearchQuery] = useState("")
  const [user, setUser] = useState<any>(null)
  const [superAdminCount, setSuperAdminCount] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const currentUser = getUser()
    setUser(currentUser)

    const superAdmins = getSuperAdmins()
    setSuperAdminCount(superAdmins.length)

    // Update badge count
    adminMenuItems[1].badge = superAdmins.length.toString()
  }, [])

  const handleLogout = () => {
    removeUser()
    router.push("/login")
  }

  const filteredMenuItems = useMemo(() => {
    if (!searchQuery) return adminMenuItems
    return adminMenuItems.filter((item) => item.title.toLowerCase().includes(searchQuery.toLowerCase()))
  }, [searchQuery])

  const filteredQuickActions = useMemo(() => {
    if (!searchQuery) return quickActions
    return quickActions.filter((action) => action.name.toLowerCase().includes(searchQuery.toLowerCase()))
  }, [searchQuery])

  const filteredAdminTools = useMemo(() => {
    if (!searchQuery) return adminTools
    return adminTools.filter((tool) => tool.name.toLowerCase().includes(searchQuery.toLowerCase()))
  }, [searchQuery])

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
           
                     <Collapsible>
  <SidebarGroup>
    <SidebarGroupLabel asChild>
      <CollapsibleTrigger  asChild>
           <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <Shield className="size-4 " />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">Admin Panel</span>
                    <span className="truncate text-xs">Super Admin System</span>
                  </div>
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton> 
      </CollapsibleTrigger>
    </SidebarGroupLabel>
  </SidebarGroup>
</Collapsible>
              </DropdownMenuTrigger>
              {/* <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg "
                align="start"
                side="bottom"
                sideOffset={4}
              >
                <DropdownMenuItem>
                  <Shield className="mr-2 h-4 w-4" />
                  <span>Admin Panel</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Building className="mr-2 h-4 w-4" />
                  <span>Organization Hub</span>
                </DropdownMenuItem>
              </DropdownMenuContent> */}
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
{/* <CollapsibleTrigger>
        <div className="px-3 py-2 data-[state=collapsed]:hidden">
  <div className="relative">
     
    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
    <Input
      placeholder="Search admin panel..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="pl-8 h-9"
    />
  </div>
</div>
</CollapsibleTrigger> */}

          {/* <Collapsible className="group/collapsible">
                <SidebarGroup>
                  <SidebarGroupLabel asChild>
                    <CollapsibleTrigger>
                       <div className="px-3 py-2 data-[state=collapsed]:hidden">
                          <div className="relative">
     
                           <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                  <Input
                          placeholder="Search admin panel..."
                   value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                     className="pl-8 h-9"
                        />
                      </div>
                                  </div>
                   
                    </CollapsibleTrigger>
                  </SidebarGroupLabel>
                 
                </SidebarGroup>
              </Collapsible> */}
        <Collapsible>
  <SidebarGroup>
    <SidebarGroupLabel asChild>
      <CollapsibleTrigger>
        <div className="py-2 flex w-full  ">
          <div className="relative w-48"> {/* adjust width as needed */}
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search admin panel..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 h-9"
            />
          </div>
        </div>
      </CollapsibleTrigger>
    </SidebarGroupLabel>
  </SidebarGroup>
</Collapsible>

      </SidebarHeader>

      <SidebarContent>
        {searchQuery &&
        filteredMenuItems.length === 0 &&
        filteredQuickActions.length === 0 &&
        filteredAdminTools.length === 0 ? (
          <div className="px-3 py-4 text-sm text-muted-foreground text-center">
            No results found for "{searchQuery}"
          </div>
        ) : (
          <>
            {(!searchQuery || filteredMenuItems.length > 0) && (
              <SidebarGroup>
                <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
                <SidebarMenu>
                  {filteredMenuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <a href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                      {item.badge && Number.parseInt(item.badge) > 0 && (
                        <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
                      )}
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroup>
            )}

            {(!searchQuery || filteredQuickActions.length > 0) && (
              <SidebarGroup>
                <SidebarGroupLabel>Quick Actions</SidebarGroupLabel>
                <SidebarGroupAction title="Add New">
                  <Plus /> <span className="sr-only ">Add New</span>
                </SidebarGroupAction>
                <SidebarMenu>
                  {filteredQuickActions.map((item) => (
                    <SidebarMenuItem key={item.name}>
                      <SidebarMenuButton asChild>
                        <a href={item.url}>
                          <item.icon />
                          <span>{item.name}</span>
                        </a>
                      </SidebarMenuButton>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <SidebarMenuAction showOnHover>
                            <MoreHorizontal />
                            <span className="sr-only">More</span>
                          </SidebarMenuAction>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-48 rounded-lg" side="bottom" align="end">
                          <DropdownMenuItem>
                            <item.icon className="text-muted-foreground" />
                            <span>Open {item.name}</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Settings className="text-muted-foreground" />
                            <span>Configure</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroup>
            )}

            {!searchQuery && (
              <Collapsible defaultOpen className="group/collapsible">
                <SidebarGroup>
                  <SidebarGroupLabel asChild>
                    <CollapsibleTrigger>
                      System Status
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </CollapsibleTrigger>
                  </SidebarGroupLabel>
                  <CollapsibleContent>
                    <SidebarGroupContent>
                      <SidebarMenu>
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild>
                            <a href="#">
                              <Bell />
                              <span>Notifications</span>
                            </a>
                          </SidebarMenuButton>
                          <SidebarMenuBadge>3</SidebarMenuBadge>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild>
                            <a href="#">
                              <BarChart3 />
                              <span>System Health</span>
                            </a>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </CollapsibleContent>
                </SidebarGroup>
              </Collapsible>
            )}

            {(!searchQuery || filteredAdminTools.length > 0) && (
              <Collapsible defaultOpen className="group/collapsible">
                <SidebarGroup>
                  <SidebarGroupLabel asChild>
                    <CollapsibleTrigger>
                      Admin Tools
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </CollapsibleTrigger>
                  </SidebarGroupLabel>
                  <CollapsibleContent>
                    <SidebarGroupContent>
                      <SidebarMenu>
                        <Collapsible defaultOpen className="group/collapsible">
                          <SidebarMenuItem>
                            <CollapsibleTrigger asChild>
                              <SidebarMenuButton>
                                <Folder />
                                <span>Management</span>
                                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                              </SidebarMenuButton>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                              <SidebarMenuSub>
                                {filteredAdminTools.map((subItem) => (
                                  <SidebarMenuSubItem key={subItem.name}>
                                    <SidebarMenuSubButton asChild>
                                      <a href={subItem.url}>
                                        <subItem.icon />
                                        <span>{subItem.name}</span>
                                      </a>
                                    </SidebarMenuSubButton>
                                  </SidebarMenuSubItem>
                                ))}
                              </SidebarMenuSub>
                            </CollapsibleContent>
                          </SidebarMenuItem>
                        </Collapsible>
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </CollapsibleContent>
                </SidebarGroup>
              </Collapsible>
            )}

            {!searchQuery && (
              <Collapsible className="group/collapsible">
                <SidebarGroup>
                  <SidebarGroupLabel asChild>
                    <CollapsibleTrigger>
                      Help & Support
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </CollapsibleTrigger>
                  </SidebarGroupLabel>
                  <CollapsibleContent>
                    <SidebarGroupContent>
                      <SidebarMenu>
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild>
                            <a href="#">
                              <HelpCircle />
                              <span>Documentation</span>
                            </a>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild>
                            <a href="#">
                              <Users />
                              <span>Support</span>
                            </a>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </CollapsibleContent>
                </SidebarGroup>
              </Collapsible>
            )}
          </>
        )}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                {/* <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <User className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{user?.role === "admin" ? "Administrator" : "User"}</span>
                    <span className="truncate text-xs">{user?.email || "admin@example.com"}</span>
                  </div>
                  <ChevronUp className="ml-auto size-4" />
                </SidebarMenuButton> */}
                 <Collapsible>
  <SidebarGroup>
    <SidebarGroupLabel asChild>
      <CollapsibleTrigger>
        <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <User className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{user?.role === "admin" ? "Administrator" : "User"}</span>
                    <span className="truncate text-xs">{user?.email || "admin@example.com"}</span>
                  </div>
                  <ChevronUp className="ml-auto size-4" />
                </SidebarMenuButton> 
      </CollapsibleTrigger>
    </SidebarGroupLabel>
  </SidebarGroup>
</Collapsible>
              </DropdownMenuTrigger>
              {/* <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Account
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent> */}
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
